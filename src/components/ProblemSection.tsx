import { motion } from "framer-motion";
import { PiWarningCircle, PiChartLineDown, PiUsers, PiClock } from "react-icons/pi";

const problems = [
  {
    icon: PiChartLineDown,
    text: "Tu equipo está ocupado, pero los números no crecen al ritmo que esperabas.",
  },
  {
    icon: PiUsers,
    text: "Cada nuevo cliente o proyecto parece requerir reinventar la rueda y quemar a tu gente.",
  },
  {
    icon: PiClock,
    text: "Sabes que hay ineficiencias, pero no tienes tiempo (ni claridad) para mapearlas.",
  },
  {
    icon: PiWarningCircle,
    text: "Has probado \"soluciones\" que prometían ser la bala de plata... y solo agregaron más complejidad.",
  },
];

const ProblemSection = () => {
  return (
    <section className="section-padding bg-[hsl(var(--background-light))]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[hsl(var(--text-dark))] mb-16 text-center">
            El Crecimiento No Debería Ser{" "}
            <span className="text-[hsl(var(--accent))]">Caótico</span>.
          </h2>

          <div className="grid gap-8 md:gap-10">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-6 p-6 rounded-lg border border-[hsl(var(--border-dark))] bg-white/50 hover:bg-white transition-colors duration-300"
              >
                <div className="flex-shrink-0">
                  <problem.icon className="w-8 h-8 text-[hsl(var(--accent))]" />
                </div>
                <p className="text-lg md:text-xl text-[hsl(var(--text-dark))] font-light leading-relaxed">
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
