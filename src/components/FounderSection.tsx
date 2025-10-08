import { motion } from "framer-motion";
import founderImage from "@/assets/founder-portrait.jpg";

const FounderSection = () => {
  return (
    <section className="section-padding bg-[hsl(var(--background-light))]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-lg overflow-hidden border border-[hsl(var(--border-dark))] shadow-2xl">
                <img
                  src={founderImage}
                  alt="Fundador de Zionary"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              
              {/* Decorative accent */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[hsl(var(--accent))]/10 rounded-lg -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[hsl(var(--text-dark))] mb-4">
                El <span className="text-[hsl(var(--accent))]">Arquitecto</span>
              </h2>

              <div className="space-y-4 text-[hsl(var(--text-dark))]/70 leading-relaxed font-light">
                <p className="text-lg">
                  No soy un gurú de la productividad ni un vendedor de software.
                  Soy un arquitecto de sistemas.
                </p>

                <p>
                  He pasado más de una década diseñando, construyendo y
                  optimizando las operaciones de empresas en crecimiento. Desde
                  startups tecnológicas hasta empresas familiares tradicionales.
                  Desde equipos de 5 hasta equipos de 500.
                </p>

                <p>
                  Mi enfoque es simple: Entender tu negocio como si fuera mío.
                  Diseñar procesos tan robustos como un puente, y tan elegantes
                  como una obra de arquitectura moderna. Y entregarte un sistema
                  que funcione sin que tengas que estar en cada detalle.
                </p>

                <p className="italic">
                  Porque el caos no es señal de crecimiento. Es señal de que
                  necesitas un mejor plano.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-[hsl(var(--border-dark))]">
                <p className="text-[hsl(var(--accent))] font-serif text-xl italic">
                  — El Fundador
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSection;
