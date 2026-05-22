import express from 'express';
import cors from 'cors';
import { fetchRDStationNews, generateRSSFeed } from './api/rss-feed';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// RSS Feed endpoint
app.get('/api/rss', async (req, res) => {
  try {
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
    const newsItems = await fetchRDStationNews();
    res.json(newsItems);
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    res.status(500).json({ error: 'Erro ao buscar notícias' });
  }
});

app.listen(PORT, () => {
  console.log(`RSS Server running on port ${PORT}`);
  console.log(`RSS Feed: http://localhost:${PORT}/api/rss`);
  console.log(`News JSON: http://localhost:${PORT}/api/news`);
});
