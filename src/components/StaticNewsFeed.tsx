import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar, User } from 'lucide-react';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  author?: string;
}

// Dados estáticos do RD Station
const staticNews: NewsItem[] = [
  {
    title: "Marketing Digital: As 10 Tendências que Vão Dominar 2024",
    link: "https://www.rdstation.com/blog/marketing-digital/tendencias-2024/",
    pubDate: "2024-04-10T10:00:00Z",
    description: "Descubra as principais tendências de marketing digital que vão moldar o mercado este ano, desde IA até marketing de influência.",
    author: "RD Station"
  },
  {
    title: "CRM: Como Potencializar suas Vendas em 40%",
    link: "https://www.rdstation.com/blog/vendas/crm-aumentar-vendas/",
    pubDate: "2024-04-09T15:30:00Z",
    description: "Aprenda a implementar um sistema CRM eficaz que pode aumentar suas vendas em até 40% e melhorar o relacionamento com clientes.",
    author: "RD Station"
  },
  {
    title: "Email Marketing: Guia Completo para Iniciantes",
    link: "https://www.rdstation.com/blog/email-marketing/guia-completo/",
    pubDate: "2024-04-08T09:15:00Z",
    description: "Guia passo a passo sobre como criar campanhas de email marketing que convertem, desde a lista até a análise de resultados.",
    author: "RD Station"
  },
  {
    title: "Landing Pages que Convertem: 7 Elementos Essenciais",
    link: "https://www.rdstation.com/blog/landing-page/conversao/",
    pubDate: "2024-04-07T14:20:00Z",
    description: "Conheça os 7 elementos fundamentais que toda landing page de alta conversão precisa ter para capturar leads efetivamente.",
    author: "RD Station"
  },
  {
    title: "Métricas de Marketing: KPIs que Realmente Importam",
    link: "https://www.rdstation.com/blog/metricas/kpis-essenciais/",
    pubDate: "2024-04-06T11:45:00Z",
    description: "Entenda quais métricas de marketing você deve acompanhar para tomar decisões estratégicas baseadas em dados.",
    author: "RD Station"
  },
  {
    title: "Automação de Marketing: Guia Prático",
    link: "https://www.rdstation.com/blog/automacao-de-marketing/guia/",
    pubDate: "2024-04-05T16:00:00Z",
    description: "Como implementar automação de marketing para economizar tempo e personalizar a comunicação com seus clientes.",
    author: "RD Station"
  }
];

const StaticNewsFeed = () => {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Notícias RD Station</h1>
        <p className="text-muted-foreground mb-4">
          Últimas notícias e atualizações do blog da RD Station
        </p>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="sm">
            <a href="https://www.rdstation.com/blog/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Blog Completo
            </a>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {staticNews.map((item, index) => (
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
    </div>
  );
};

export default StaticNewsFeed;
