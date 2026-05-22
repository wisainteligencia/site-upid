import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, RefreshCw, Calendar, User } from 'lucide-react';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  author?: string;
}

const RDNewsFeedSimple = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      
      console.log('Buscando notícias do servidor RSS...');
      
      // Tentar buscar do nosso servidor RSS primeiro
      try {
        const response = await fetch('http://localhost:3001/api/news');
        console.log('Status da resposta:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Dados recebidos:', data);
          setNews(data);
          return;
        }
      } catch (fetchError) {
        console.log('Erro ao buscar do servidor RSS, usando dados mockados:', fetchError);
      }
      
      // Fallback para dados mockados
      console.log('Usando dados mockados');
      setNews(mockNews);
      
    } catch (err) {
      console.error('Erro ao buscar notícias:', err);
      setError('Não foi possível carregar as notícias. Tente novamente mais tarde.');
      // Usar dados mockados mesmo em caso de erro
      setNews(mockNews);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-6 w-6 animate-spin" />
            <span>Carregando notícias...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error && news.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={fetchNews} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Notícias RD Station</h1>
        <p className="text-muted-foreground">
          Últimas notícias e atualizações do blog da RD Station
        </p>
        <div className="mt-4 flex items-center gap-4">
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
      </div>

      {news.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Nenhuma notícia encontrada.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="line-clamp-2 text-lg">
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {item.title}
                  </a>
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {item.author && (
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {item.author}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(item.pubDate)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3 mb-4">
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
      )}
    </div>
  );
};

export default RDNewsFeedSimple;
