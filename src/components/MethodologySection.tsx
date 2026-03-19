import { Lightbulb, Heart, Search, ShoppingCart, Megaphone } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    icon: Lightbulb,
    tag: "Eu sei",
    title: "Descoberta",
    text: "Identificamos quem tem a dor, antes mesmo de conhecerem sua marca.",
  },
  {
    icon: Heart,
    tag: "Eu gosto",
    title: "Atração",
    text: "Capturamos a atenção com inteligência de dados e conteúdo de valor.",
  },
  {
    icon: Search,
    tag: "Quero saber mais",
    title: "Consideração",
    text: "Nutrição automatizada e pré-venda (SDR) para validar leads reais.",
  },
  {
    icon: ShoppingCart,
    tag: "Vou comprar",
    title: "Ação",
    text: "Conversão humanizada, treinamento de closers e quebra de objeções.",
  },
  {
    icon: Megaphone,
    tag: "Eu recomendo",
    title: "Apologia",
    text: "Pós-venda estratégico para transformar clientes em promotores e gerar recompra.",
  },
];

const MethodologySection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="metodologia" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Nossa Metodologia:{" "}
            <span className="gradient-green-text">A Jornada de 5 Etapas</span>
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-accent/40 to-transparent" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`flex gap-6 items-start transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${(i + 1) * 150}ms` }}
              >
                {/* Step number */}
                <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-full gradient-green items-center justify-center relative z-10">
                  <step.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                <div className="glass-card rounded-xl p-6 flex-1 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold gradient-green text-primary-foreground px-3 py-1 rounded-full">
                      Etapa {i + 1}
                    </span>
                    <span className="text-xs text-muted-foreground italic">"{step.tag}"</span>
                  </div>
                  <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
