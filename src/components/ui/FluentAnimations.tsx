import { motion } from "framer-motion";

// Animación de aparición con fade y slide
export const FadeInSlideUp = ({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  className = "" 
}: { 
  children: React.ReactNode; 
  delay?: number; 
  duration?: number; 
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// Animación de aparición con scale
export const ScaleIn = ({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  className = "" 
}: { 
  children: React.ReactNode; 
  delay?: number; 
  duration?: number; 
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// Animación de stagger para listas
export const StaggerContainer = ({ 
  children, 
  staggerDelay = 0.1, 
  className = "" 
}: { 
  children: React.ReactNode; 
  staggerDelay?: number; 
  className?: string;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ staggerChildren: staggerDelay }}
    className={className}
  >
    {children}
  </motion.div>
);

// Elemento individual para animación stagger
export const StaggerItem = ({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// Efecto de revelación de texto
export const TextReveal = ({ 
  text, 
  className = "" 
}: { 
  text: string; 
  className?: string;
}) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {text}
      </motion.div>
    </div>
  );
};

// Contenedor con efecto de iluminación al hover
export const GlowContainer = ({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => (
  <motion.div
    className={`relative overflow-hidden ${className}`}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
    {children}
  </motion.div>
);

// Contenedor con efecto de ripple en click
export const RippleContainer = ({ 
  children, 
  onClick, 
  className = "" 
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  className?: string;
}) => {
  return (
    <motion.div
      className={`relative overflow-hidden cursor-pointer ${className}`}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
};

// Animación de contador
export const Counter = ({ 
  from, 
  to, 
  duration = 2, 
  className = "" 
}: { 
  from: number; 
  to: number; 
  duration?: number; 
  className?: string;
}) => {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration }}
      >
        {to}
      </motion.span>
    </motion.span>
  );
};

// Animación de flotamiento para elementos decorativos
export const FloatingElement = ({ 
  children, 
  duration = 3, 
  delay = 0, 
  className = "" 
}: { 
  children: React.ReactNode; 
  duration?: number; 
  delay?: number; 
  className?: string;
}) => (
  <motion.div
    className={className}
    animate={{
      y: [0, -15, 0],
      rotate: [0, 5, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

// Efecto de pulso para elementos de atención
export const PulseElement = ({ 
  children, 
  intensity = 1.05, 
  className = "" 
}: { 
  children: React.ReactNode; 
  intensity?: number; 
  className?: string;
}) => (
  <motion.div
    className={className}
    animate={{
      scale: [1, intensity, 1],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

// Efecto de rotación continua
export const RotatingElement = ({ 
  children, 
  duration = 10, 
  className = "" 
}: { 
  children: React.ReactNode; 
  duration?: number; 
  className?: string;
}) => (
  <motion.div
    className={className}
    animate={{
      rotate: 360,
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    {children}
  </motion.div>
);