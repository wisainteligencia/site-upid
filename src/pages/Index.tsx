import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import MethodologySection from "@/components/MethodologySection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import FooterCTA from "@/components/FooterCTA";
import HubWisa from "@/components/HubWisa";
import { Button } from "@/components/ui/button";
import { Newspaper } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ProblemSection />
      <MethodologySection />
      <ServicesSection />
      <PortfolioSection />
      <HubWisa />
      
      {/* Seção de Notícias */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Notícias de Marketing</h2>
            <p className="text-muted-foreground mb-6">
              Acompanhe as últimas notícias e tendências do mercado
            </p>
            <Button asChild className="gradient-green text-primary-foreground">
              <a href="/noticias">
                <Newspaper className="w-4 h-4 mr-2" />
                Ver Notícias
              </a>
            </Button>
          </div>
        </div>
      </section>
      
      <FooterCTA />
    </div>
  );
};

export default Index;
