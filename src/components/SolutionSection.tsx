import { motion } from "framer-motion";
import { PiCompass, PiHammer, PiPackage } from "react-icons/pi";

const steps = [
  {
    number: "01",
    icon: PiCompass,
    title: "El Plano",
    description:
      "Auditamos tu operación actual sin juicios. Identificamos cuellos de botella, redundancias y oportunidades ocultas. Presentamos un mapa de ruta claro.",
  },
  {
    number: "02",
    icon: PiHammer,
    title: "La Construcción",
    description:
      "Diseñamos e implementamos procesos optimizados. Integramos las herramientas correctas (no las más caras). Capacitamos a tu equipo para que lo ejecute sin depender de nosotros.",
  },
  {
    number: "03",
    icon: PiPackage,
    title: "La Entrega",
    description:
      "Te entregamos un sistema que funciona. Dashboard de métricas clave. Documentación clara. Y la tranquilidad de saber que tu operación puede escalar sin que tú estés en cada detalle.",
  },
];

const SolutionSection = () => {
  return (
    <section className="section-padding bg-[hsl(var(--background-dark))]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[hsl(var(--text-primary))] mb-6 text-center">
            De la Visión a la Realidad:{" "}
            <span className="text-[hsl(var(--accent))]">
              Nuestra Arquitectura de Procesos
            </span>
          </h2>
          
          <p className="text-xl text-[hsl(var(--text-secondary))] mb-20 text-center max-w-3xl mx-auto font-light">
            Como los arquitectos diseñan edificios que perduran, diseñamos procesos que escalan.
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative group"
              >
                <div className="border border-white/10 p-8 rounded-lg hover:border-[hsl(var(--accent))]/50 transition-colors duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-7xl font-bold text-[hsl(var(--accent))]/20 font-serif">
                      {step.number}
                    </span>
                    <step.icon className="w-10 h-10 text-[hsl(var(--accent))]" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[hsl(var(--text-primary))] mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-[hsl(var(--text-secondary))] leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
