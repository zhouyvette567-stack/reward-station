import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', hover = true, delay = 0, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={hover ? { y: -3, transition: { duration: 0.3 } } : {}}
      onClick={onClick}
      className={`card-warm p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;