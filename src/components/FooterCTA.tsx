import { ArrowRight, MapPin } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import logo from "@/assets/logo-upid.png";

const FooterCTA = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <footer id="contato" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`glass-card rounded-2xl p-10 sm:p-16 text-center max-w-3xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Vamos auditar sua <span className="gradient-green-text">jornada?</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
            Identifique gargalos invisíveis e descubra oportunidades imediatas de receita em uma sessão estratégica de 15 minutos.
          </p>
          <a
            href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ10baEhf2nfYpW2ekiKDw0qe5z_NCfTWJVTiWxzGMgfiazjT929J3HWw0iTm09Qo7cWhZJbFSTT"
            className="inline-flex items-center gap-2 gradient-green text-primary-foreground font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity glow-green text-base"
          >
            Agendar Diagnóstico Gratuito <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Bottom info */}
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <img src={logo} alt="UP iD" className="h-10 opacity-70" />
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            <MapPin className="w-4 h-4" /> São João del Rei/MG — Atendimento Nacional
          </p>
          <p className="text-muted-foreground/50 text-xs">
            © {new Date().getFullYear()} UP iD – Inteligência Digital. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterCTA;
