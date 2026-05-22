import axios from 'axios';
import * as cheerio from 'cheerio';
import Parser from 'rss-parser';

const parser = new Parser();

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  author?: string;
}

export async function fetchRDStationNews(): Promise<NewsItem[]> {
  try {
    // Fazer scraping do site da RD Station
    const response = await axios.get('https://www.rdstation.com/blog/noticias/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const newsItems: NewsItem[] = [];

    // Procurar por artigos na página
    $('.post-item, article, .blog-post, .post').each((index, element) => {
      const $element = $(element);
      
      // Tentar extrair título
      const title = $element.find('h2, h3, .title, .post-title').first().text().trim() ||
                    $element.find('a[title]').first().attr('title') ||
                    $element.find('a').first().text().trim();

      // Tentar extrair link
      const link = $element.find('a').first().attr('href');

      // Tentar extrair data
      const dateText = $element.find('.date, .post-date, .published, time').first().text().trim() ||
                      $element.find('time').first().attr('datetime');

      // Tentar extrair descrição
      const description = $element.find('.excerpt, .post-excerpt, .description, p').first().text().trim() ||
                         $element.find('p').first().text().trim();

      if (title && link) {
        newsItems.push({
          title,
          link: link.startsWith('http') ? link : `https://www.rdstation.com${link}`,
          pubDate: dateText || new Date().toISOString(),
          description: description.substring(0, 200) + (description.length > 200 ? '...' : ''),
          author: 'RD Station'
        });
      }
    });

    // Se não encontrar itens via scraping, tentar RSS feed
    if (newsItems.length === 0) {
      try {
        const feed = await parser.parseURL('https://www.rdstation.com/blog/feed/');
        return feed.items.map(item => ({
          title: item.title || '',
          link: item.link || '',
          pubDate: item.pubDate || new Date().toISOString(),
          description: item.contentSnippet || item.content || '',
          author: item.creator || 'RD Station'
        }));
      } catch (rssError) {
        console.error('Erro ao carregar RSS feed:', rssError);
      }
    }

    return newsItems.slice(0, 10); // Limitar a 10 itens
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    return [];
  }
}

export function generateRSSFeed(items: NewsItem[]): string {
  const rssItems = items.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link><![CDATA[${item.link}]]></link>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${new Date(item.pubDate).toUTCString()}</pubDate>
      <author><![CDATA[${item.author || 'RD Station'}]]></author>
      <guid><![CDATA[${item.link}]]></guid>
    </item>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>RD Station Notícias</title>
    <link>https://www.rdstation.com/blog/noticias/</link>
    <description>Notícias e atualizações do blog RD Station</description>
    <language>pt-br</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://seusite.com/api/rss" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;
}
