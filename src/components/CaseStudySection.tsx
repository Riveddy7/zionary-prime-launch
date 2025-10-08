import { motion } from "framer-motion";

const CaseStudySection = () => {
  return (
    <section id="case-study" className="section-padding bg-[hsl(var(--background-light))]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[hsl(var(--text-dark))] mb-6 text-center">
            El Plano en Acción:{" "}
            <span className="text-[hsl(var(--accent))]">
              La Transformación de ITN
            </span>
          </h2>

          <p className="text-xl text-[hsl(var(--text-dark))]/70 mb-12 text-center max-w-3xl mx-auto font-light">
            Cómo rediseñamos la operación completa de una empresa de logística,
            reduciendo tiempos de proceso en 60% y escalando sin contratar más
            personal.
          </p>

          <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl border border-[hsl(var(--border-dark))]">
            {/* Placeholder for video - Replace with actual video embed */}
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--background-dark))] to-[hsl(var(--background-dark))]/80 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[hsl(var(--accent))]/20 flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[16px] border-l-[hsl(var(--accent))] border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                </div>
                <p className="text-[hsl(var(--text-secondary))] text-lg">
                  Video Caso de Estudio ITN
                </p>
                <p className="text-[hsl(var(--text-secondary))]/60 text-sm mt-2">
                  (Embed de YouTube/Vimeo aquí)
                </p>
              </div>
            </div>
            
            {/* Uncomment and replace with actual video URL when available
            <iframe
              className="w-full h-full"
              src="YOUR_VIDEO_URL"
              title="Caso de Estudio ITN"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            */}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6 rounded-lg border border-[hsl(var(--border-dark))] bg-white/50">
              <div className="text-4xl font-bold text-[hsl(var(--accent))] mb-2">60%</div>
              <p className="text-[hsl(var(--text-dark))]/70">Reducción en tiempos de proceso</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-[hsl(var(--border-dark))] bg-white/50">
              <div className="text-4xl font-bold text-[hsl(var(--accent))] mb-2">0</div>
              <p className="text-[hsl(var(--text-dark))]/70">Nuevas contrataciones necesarias</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-[hsl(var(--border-dark))] bg-white/50">
              <div className="text-4xl font-bold text-[hsl(var(--accent))] mb-2">3x</div>
              <p className="text-[hsl(var(--text-dark))]/70">Capacidad operativa escalada</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudySection;
