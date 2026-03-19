import { Rocket, Bot, Settings, Palette } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const services = [
  {
    icon: Rocket,
    title: "Growth Marketing & Performance",
    text: "Escala acelerada com foco em ROI.",
  },
  {
    icon: Bot,
    title: "Agentes Virtuais com IA",
    text: "Atendimento e vendas 24/7 com inteligência artificial personalizada.",
  },
  {
    icon: Settings,
    title: "Automação & CRM",
    text: "Implementação do ecossistema que trabalha por você.",
  },
  {
    icon: Palette,
    title: "Branding Estratégico",
    text: "Posicionamento que gera autoridade imediata.",
  },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="servicos" className="py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Serviços de <span className="gradient-green-text">Alta Performance</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className={`glass-card rounded-xl p-8 group hover:border-primary/30 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(i + 1) * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl gradient-green flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <s.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-base font-bold mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
