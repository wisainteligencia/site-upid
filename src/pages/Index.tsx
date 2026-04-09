import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import MethodologySection from "@/components/MethodologySection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import FooterCTA from "@/components/FooterCTA";
import HubWisa from "@/components/HubWisa";

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
      <FooterCTA />
    </div>
  );
};

export default Index;
