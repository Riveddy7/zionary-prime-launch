import { motion } from "framer-motion";
import FluentIcon from "./ui/FluentIcon";

const problems = [
  {
    icon: "chartDown" as const,
    text: "Tu equipo está ocupado, pero los números no crecen al ritmo que esperabas.",
  },
  {
    icon: "people" as const,
    text: "Cada nuevo cliente o proyecto parece requerir reinventar la rueda y quemar a tu gente.",
  },
  {
    icon: "clock" as const,
    text: "Sabes que hay ineficiencias, pero no tienes tiempo (ni claridad) para mapearlas.",
  },
  {
    icon: "warning" as const,
    text: "Has probado \"soluciones\" que prometían ser la bala de plata... y solo agregaron más complejidad.",
  },
];

const ProblemSection = () => {
  return (
    <section id="problem" className="section-padding fluent-bg-surface">
      <div className="fluent-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="fluent-section-title fluent-text-primary mb-16 text-center">
            <span className="text-[#99FF00]">¡Felicidades</span>, tu empresa creció! Pero esto no tiene que ser{" "}
            <span className="text-[#99FF00]">Caótico</span>.
          </h2>

          <div className="grid gap-8 md:gap-10">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 flex items-start gap-6 group bg-gray border-2 border-white/20 hover:border-white rounded-lg"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[rgba(153, 255, 0, 0.1)] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-[rgba(153, 255, 0, 0.2)]">
                    <FluentIcon icon={problem.icon} size={24} color="#99FF00" />
                  </div>
                </div>
                <p className="fluent-body-large fluent-text-primary leading-relaxed">
                  {problem.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
