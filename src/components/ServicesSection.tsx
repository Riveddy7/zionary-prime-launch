import { motion } from "framer-motion";
import { PiFileText, PiGear, PiChartLine } from "react-icons/pi";

const services = [
  {
    icon: PiFileText,
    title: "El Plano",
    description:
      "Diagnóstico operativo completo. Mapeo de procesos actuales. Identificación de ineficiencias y quick wins.",
    price: "Diagnóstico inicial gratuito",
  },
  {
    icon: PiGear,
    title: "La Construcción",
    description:
      "Diseño de procesos optimizados. Implementación de automatizaciones. Integración de sistemas. Capacitación de equipos.",
    price: "Inversión personalizada",
  },
  {
    icon: PiChartLine,
    title: "La Operación Continua",
    description:
      "Optimización continua. Monitoreo de KPIs. Ajustes basados en datos. Soporte técnico prioritario.",
    price: "Retainer mensual",
  },
];

const ServicesSection = () => {
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
            Diseña tu{" "}
            <span className="text-[hsl(var(--accent))]">Transformación</span>
          </h2>

          <p className="text-xl text-[hsl(var(--text-secondary))] mb-16 text-center max-w-3xl mx-auto font-light">
            Elige el nivel de soporte que tu empresa necesita en este momento.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="p-8 rounded-lg border border-white/10 hover:border-[hsl(var(--accent))]/50 transition-all duration-300 group"
              >
                <service.icon className="w-12 h-12 text-[hsl(var(--accent))] mb-6 group-hover:scale-110 transition-transform duration-300" />
                
                <h3 className="text-2xl font-bold text-[hsl(var(--text-primary))] mb-4">
                  {service.title}
                </h3>
                
                <p className="text-[hsl(var(--text-secondary))] mb-6 leading-relaxed font-light min-h-[120px]">
                  {service.description}
                </p>
                
                <div className="pt-4 border-t border-white/10">
                  <p className="text-[hsl(var(--accent))] font-medium">
                    {service.price}
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

export default ServicesSection;
