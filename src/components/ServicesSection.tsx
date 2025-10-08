import { motion } from "framer-motion";
import FluentIcon from "./ui/FluentIcon";
import { FadeInSlideUp, ScaleIn } from "./ui/FluentAnimations";

const services = [
  {
    icon: "fileText" as const,
    title: "El Plano",
    description:
      "Diagnóstico operativo completo. Mapeo de procesos actuales. Identificación de ineficiencias y quick wins.",
    price: "Diagnóstico inicial gratuito",
  },
  {
    icon: "gear" as const,
    title: "La Construcción",
    description:
      "Diseño de procesos optimizados. Implementación de automatizaciones. Integración de sistemas. Capacitación de equipos.",
    price: "Inversión personalizada",
  },
  {
    icon: "growth" as const,
    title: "La Operación Continua",
    description:
      "Optimización continua. Monitoreo de KPIs. Ajustes basados en datos. Soporte técnico prioritario.",
    price: "Retainer mensual",
  },
];

const ServicesSection = () => {
  return (
    <section className="section-padding bg-black/100">
      <div className="fluent-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="fluent-section-title fluent-text-primary mb-6 text-center">
            Diseña tu{" "}
            <span className="text-[hsl(var(--fluent-primary))]">Transformación</span>
          </h2>

          <p className="fluent-body-large fluent-text-secondary mb-16 text-center max-w-3xl mx-auto">
            Elige el nivel de soporte que tu empresa necesita en este momento.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScaleIn delay={index * 0.15} key={index} className="p-8 relative overflow-hidden group hover:border-[hsl(var(--fluent-primary))]/30 rounded-lg backdrop-blur-md bg-[hsl(var(--fluent-primary))]/25 border border-white/20">
                <motion.div
                  className="w-14 h-14 bg-gradient-to-br from-[hsl(var(--fluent-primary-light))] to-[hsl(var(--fluent-primary))] rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-[hsl(var(--fluent-primary))]/20"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <FluentIcon icon={service.icon} size={30} color="white" />
                </motion.div>
                
                <motion.h3
                  className="fluent-card-title fluent-text-primary mb-4"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {service.title}
                </motion.h3>
                
                <p className="fluent-body-text fluent-text-secondary mb-6 leading-relaxed min-h-[120px]">
                  {service.description}
                </p>
                
                <motion.div
                  className="pt-4 border-t border-[hsl(var(--fluent-border-default))]"
                  whileHover={{ borderColor: "hsl(var(--fluent-primary))" }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-[hsl(var(--fluent-primary))] font-semibold">
                    {service.price}
                  </p>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
