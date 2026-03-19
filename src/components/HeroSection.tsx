import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block gradient-green text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase">
              Inteligência Digital
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
          >
            Transforme o caos comercial em uma{" "}
            <span className="gradient-green-text">máquina de receita previsível.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            Não vendemos apenas marketing. Aplicamos a ciência por trás da decisão de compra para gerir sua jornada de ponta a ponta.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="https://wa.me/5532984941759"
              className="gradient-green text-primary-foreground font-bold px-8 py-4 rounded-lg text-base inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity glow-green"
            >
              Agendar Diagnóstico Gratuito <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/5532984941759"
              className="border border-foreground/20 text-foreground font-semibold px-8 py-4 rounded-lg text-base inline-flex items-center justify-center gap-2 hover:bg-secondary/50 transition-colors"
            >
              <MessageCircle className="w-5 h-5" /> Falar com Especialista
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
