import { TrendingDown, AlertTriangle, EyeOff } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const painPoints = [
  { icon: TrendingDown, title: "Receita imprevisível", text: "Oscilações mensais que impedem planejamento." },
  { icon: AlertTriangle, title: "Leads ≠ Vendas", text: "Quantidade sem qualificação não gera resultado." },
  { icon: EyeOff, title: "Pontos cegos", text: "Decisões por intuição escondem perdas diárias." },
];

const ProblemSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Por que suas vendas <span className="gradient-green-text">oscilam?</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            A "Montanha-Russa" comercial acontece quando não há método. Leads não são vendas, e depender apenas de intuição gera pontos cegos onde você perde dinheiro todos os dias.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((item, i) => (
            <div
              key={i}
              className={`glass-card rounded-xl p-8 text-center transition-all duration-700 hover:border-primary/30 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(i + 1) * 150}ms` }}
            >
              <div className="w-14 h-14 rounded-xl gradient-green flex items-center justify-center mx-auto mb-5">
                <item.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
