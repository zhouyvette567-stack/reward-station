import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', hover = true, delay = 0, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={hover ? { y: -5, scale: 1.02, transition: { duration: 0.3 } } : {}}
      onClick={onClick}
      className={`bg-white/40 backdrop-blur-lg border border-white/30 shadow-[0_8px_32px_rgba(255,255,255,0.37)] rounded-3xl p-6 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;