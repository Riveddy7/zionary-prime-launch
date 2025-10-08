import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { PiArrowRight } from "react-icons/pi";

interface HeroSectionProps {
  onContactClick: () => void;
}

const HeroSection = ({ onContactClick }: HeroSectionProps) => {
  const scrollToCaseStudy = () => {
    const caseStudySection = document.getElementById("case-study");
    caseStudySection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[hsl(var(--background-dark))] relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--accent))]/5 via-transparent to-transparent" />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[hsl(var(--text-primary))] mb-8 leading-tight">
            Tu Empresa del Futuro Necesita un{" "}
            <span className="text-[hsl(var(--accent))]">Proceso Mejor</span>.
            <br />
            Construyámoslo Hoy.
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-[hsl(var(--text-secondary))] mb-12 max-w-3xl mx-auto font-light leading-relaxed"
          >
            No vendemos software. Diseñamos la arquitectura operativa que escala
            tu negocio sin caos. Diagnóstico gratuito. Implementación precisa.
            Resultados medibles.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button variant="hero" size="xl" onClick={onContactClick}>
              Iniciar el Diseño
            </Button>
            
            <button
              onClick={scrollToCaseStudy}
              className="group flex items-center gap-2 text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] transition-colors duration-300 text-lg"
            >
              Ver nuestra metodología en acción
              <PiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
