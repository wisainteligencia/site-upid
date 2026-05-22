const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Função para buscar notícias do RD Station
async function fetchRDStationNews() {
  try {
    console.log('Buscando notícias do RD Station...');
    
    // Fazer scraping do site da RD Station
    const response = await axios.get('https://www.rdstation.com/blog/noticias/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const newsItems = [];

    // Procurar por artigos na página usando diferentes seletores
    const selectors = [
      '.post-item',
      'article',
      '.blog-post',
      '.post',
      '.entry',
      '.content-item'
    ];

    for (const selector of selectors) {
      $(selector).each((index, element) => {
        if (newsItems.length >= 10) return false; // Limitar a 10 itens
        
        const $element = $(element);
        
        // Tentar extrair título
        const title = $element.find('h2, h3, .title, .post-title, .entry-title').first().text().trim() ||
                      $element.find('a[title]').first().attr('title') ||
                      $element.find('a').first().text().trim();

        // Tentar extrair link
        const link = $element.find('a').first().attr('href');

        // Tentar extrair data
        const dateText = $element.find('.date, .post-date, .published, time, .entry-date').first().text().trim() ||
                        $element.find('time').first().attr('datetime');

        // Tentar extrair descrição
        const description = $element.find('.excerpt, .post-excerpt, .description, .entry-summary, p').first().text().trim() ||
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
      
      if (newsItems.length > 0) break; // Se encontrou itens, para de procurar
    }

    // Se não encontrar itens via scraping, criar dados de exemplo
    if (newsItems.length === 0) {
      console.log('Não foram encontradas notícias via scraping, criando dados de exemplo...');
      
      // Dados de exemplo para demonstração
      const sampleNews = [
        {
          title: "Marketing Digital: Tendências para 2024",
          link: "https://www.rdstation.com/blog/marketing-digital/tendencias-2024/",
          pubDate: new Date().toISOString(),
          description: "Descubra as principais tendências de marketing digital que vão dominar o mercado em 2024.",
          author: "RD Station"
        },
        {
          title: "Como Aumentar suas Vendas com CRM",
          link: "https://www.rdstation.com/blog/vendas/crm-aumentar-vendas/",
          pubDate: new Date(Date.now() - 86400000).toISOString(),
          description: "Aprenda a utilizar um sistema CRM para potencializar suas vendas e melhorar o relacionamento com clientes.",
          author: "RD Station"
        },
        {
          title: "Email Marketing: Guia Completo",
          link: "https://www.rdstation.com/blog/email-marketing/guia-completo/",
          pubDate: new Date(Date.now() - 172800000).toISOString(),
          description: "Guia completo sobre como criar campanhas de email marketing eficazes que convertem.",
          author: "RD Station"
        }
      ];
      
      return sampleNews;
    }

    console.log(`Encontradas ${newsItems.length} notícias`);
    return newsItems;
  } catch (error) {
    console.error('Erro ao buscar notícias:', error.message);
    
    // Retornar dados de exemplo em caso de erro
    return [
      {
        title: "RD Station: Plataforma de Marketing e Vendas",
        link: "https://www.rdstation.com/",
        pubDate: new Date().toISOString(),
        description: "Conheça a plataforma completa de marketing e vendas da RD Station.",
        author: "RD Station"
      }
    ];
  }
}

// Função para gerar RSS feed
function generateRSSFeed(items) {
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
    <atom:link href="http://localhost:3001/api/rss" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;
}

// RSS Feed endpoint
app.get('/api/rss', async (req, res) => {
  try {
    console.log('Gerando RSS feed...');
    const newsItems = await fetchRDStationNews();
    const rssFeed = generateRSSFeed(newsItems);
    
    res.set('Content-Type', 'application/rss+xml');
    res.send(rssFeed);
  } catch (error) {
    console.error('Erro ao gerar RSS feed:', error);
    res.status(500).send('Erro ao gerar RSS feed');
  }
});

// JSON endpoint para as notícias
app.get('/api/news', async (req, res) => {
  try {
    console.log('Buscando notícias JSON...');
    const newsItems = await fetchRDStationNews();
    res.json(newsItems);
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    res.status(500).json({ error: 'Erro ao buscar notícias' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`RSS Server running on port ${PORT}`);
  console.log(`RSS Feed: http://localhost:${PORT}/api/rss`);
  console.log(`News JSON: http://localhost:${PORT}/api/news`);
  console.log(`Health Check: http://localhost:${PORT}/api/health`);
});
