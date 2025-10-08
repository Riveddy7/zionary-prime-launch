import { motion } from "framer-motion";
import FluentIcon from "./ui/FluentIcon";
import { FadeInSlideUp, ScaleIn } from "./ui/FluentAnimations";

const steps = [
  {
    number: "01",
    icon: "compass" as const,
    title: "El Plano",
    description:
      "Auditamos tu operación actual sin juicios. Identificamos cuellos de botella, redundancias y oportunidades ocultas. Presentamos un mapa de ruta claro.",
  },
  {
    number: "02",
    icon: "hammer" as const,
    title: "La Construcción",
    description:
      "Diseñamos e implementamos procesos optimizados. Integramos las herramientas correctas (no las más caras). Capacitamos a tu equipo para que lo ejecute sin depender de nosotros.",
  },
  {
    number: "03",
    icon: "package" as const,
    title: "La Entrega",
    description:
      "Te entregamos un sistema que funciona. Dashboard de métricas clave. Documentación clara. Y la tranquilidad de saber que tu operación puede escalar sin que tú estés en cada detalle.",
  },
];

const SolutionSection = () => {
  return (
    <section className="section-padding bg-gray-910">
      <div className="fluent-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="fluent-section-title fluent-text-primary mb-6 text-center">
            De la Visión a la Realidad:{" "}
            <span className="text-[hsl(var(--fluent-primary))]">
              Nuestra Arquitectura de Procesos
            </span>
          </h2>
          
          <p className="fluent-body-large fluent-text-secondary mb-20 text-center max-w-3xl mx-auto">
            Como los arquitectos diseñan edificios que perduran, diseñamos procesos que escalan.
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <ScaleIn delay={index * 0.15} key={index} className="relative group">
                <div className="p-8 relative overflow-hidden group hover:border-[hsl(var(--fluent-primary))]/30 rounded-lg backdrop-blur-md bg-[hsl(var(--fluent-primary))]/20 border border-white/20">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[hsl(var(--fluent-primary))] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  
                  <div className="flex items-start justify-between mb-6">
                    <motion.span
                      className="text-6xl font-bold text-[hsl(var(--fluent-primary))]/20"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.number}
                    </motion.span>
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--fluent-primary-light))] to-[hsl(var(--fluent-primary))] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[hsl(var(--fluent-primary))]/20"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FluentIcon icon={step.icon} size={24} color="white" />
                    </motion.div>
                  </div>
                  
                  <motion.h3
                    className="fluent-card-title fluent-text-primary mb-4"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.title}
                  </motion.h3>
                  
                  <p className="fluent-body-text fluent-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </ScaleIn>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
