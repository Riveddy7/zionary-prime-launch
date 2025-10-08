import { motion, AnimatePresence } from "framer-motion";
import { PiX } from "react-icons/pi";
import { Button } from "./ui/button";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl"
            >
              <div className="glass rounded-lg p-8 md:p-12 shadow-2xl">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 text-[hsl(var(--text-primary))]/60 hover:text-[hsl(var(--text-primary))] transition-colors"
                >
                  <PiX className="w-6 h-6" />
                </button>

                {/* Content */}
                <div className="mb-8">
                  <h3 className="text-3xl md:text-4xl font-bold text-[hsl(var(--text-primary))] mb-4">
                    Iniciemos el Diseño de tu{" "}
                    <span className="text-[hsl(var(--accent))]">Futuro</span>
                  </h3>
                  <p className="text-[hsl(var(--text-secondary))] text-lg font-light">
                    Comparte tus datos y te contactaremos en menos de 24 horas
                    para agendar tu diagnóstico gratuito.
                  </p>
                </div>

                {/* HubSpot Form Placeholder */}
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-[hsl(var(--text-primary))] mb-2 font-medium"
                    >
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/20 text-[hsl(var(--text-primary))] placeholder:text-[hsl(var(--text-secondary))]/50 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))] transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[hsl(var(--text-primary))] mb-2 font-medium"
                    >
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/20 text-[hsl(var(--text-primary))] placeholder:text-[hsl(var(--text-secondary))]/50 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))] transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <Button variant="hero" size="lg" className="w-full">
                    Solicitar Diagnóstico Gratuito
                  </Button>

                  <p className="text-center text-[hsl(var(--text-secondary))]/60 text-sm">
                    Al enviar este formulario, aceptas que contactemos contigo
                    para agendar tu diagnóstico.
                  </p>
                </div>

                {/* Note about HubSpot integration */}
                <div className="mt-6 p-4 rounded-md bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/20">
                  <p className="text-[hsl(var(--text-primary))]/70 text-sm">
                    💡 <strong>Nota de implementación:</strong> Reemplaza este
                    formulario con el embed code de HubSpot Forms para
                    integración completa con tu CRM.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
