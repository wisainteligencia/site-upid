import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, RefreshCw } from 'lucide-react';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  author?: string;
}

const NewsTest = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dados mockados para teste
  const mockNews: NewsItem[] = [
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

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('=== Iniciando busca de notícias ===');
      
      // Primeiro, tentar buscar do servidor RSS
      try {
        console.log('Tentando buscar de http://localhost:3001/api/news...');
        const response = await fetch('http://localhost:3001/api/news');
        console.log('Status da resposta:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Dados recebidos do servidor:', data);
          setNews(data);
          return;
        } else {
          console.log('Resposta não OK, status:', response.status);
        }
      } catch (fetchError) {
        console.log('Erro ao buscar do servidor RSS:', fetchError);
      }
      
      // Se falhar, usar dados mockados
      console.log('Usando dados mockados');
      setNews(mockNews);
      
    } catch (err) {
      console.error('Erro geral:', err);
      setError('Erro ao carregar notícias');
      setNews(mockNews); // Sempre mostrar algo
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Componente montado, iniciando busca...');
    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  };

  console.log('Estado atual:', { loading, error, newsLength: news.length });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Carregando notícias...</h2>
          <p className="text-muted-foreground">Buscando as últimas atualizações</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Notícias RD Station</h1>
        <p className="text-muted-foreground mb-4">
          Últimas notícias e atualizações do blog da RD Station
        </p>
        <div className="flex items-center gap-4">
          <Button onClick={fetchNews} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href="http://localhost:3001/api/rss" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              RSS Feed
            </a>
          </Button>
        </div>
        
        {error && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">{error}</p>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {item.title}
                </a>
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                {item.author} - {formatDate(item.pubDate)}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {item.description}
              </CardDescription>
              <Button asChild variant="outline" size="sm" className="w-full">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ler mais
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {news.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Nenhuma notícia encontrada.</p>
        </div>
      )}
    </div>
  );
};

export default NewsTest;
