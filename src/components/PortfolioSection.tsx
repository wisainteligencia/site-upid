import { TrendingUp, Users, Clock, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const stats = [
  { icon: TrendingUp, value: "+200%", label: "Crescimento em tráfego orgânico" },
  { icon: Users, value: "+35%", label: "Taxa de conversão com Agentes de IA" },
  { icon: Clock, value: "-15%", label: "Redução no ciclo de vendas com dados" },
];

const PortfolioSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="portfolio" className="py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Resultados que <span className="gradient-green-text">falam por si</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`glass-card rounded-xl p-8 text-center transition-all duration-700 hover:border-primary/30 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(i + 1) * 150}ms` }}
            >
              <div className="w-14 h-14 rounded-xl gradient-green flex items-center justify-center mx-auto mb-4">
                <s.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="text-4xl font-extrabold gradient-green-text mb-2">{s.value}</div>
              <p className="text-muted-foreground text-sm">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://portfolio.upid.tec.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 gradient-green text-primary-foreground font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity"
          >
            Ver Portfólio Completo <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
