import { motion } from 'framer-motion';

const GlassButton = ({ children, onClick, className = '', variant = 'default', size = 'md', disabled = false, loading = false, icon = null }) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    default: 'bg-[#FFFCF7] border border-[#E8C872]/30 text-[#5A4A2A] hover:bg-[#F5E6C8] hover:shadow-md',
    primary: 'btn-gold-gradient border-none',
    success: 'bg-gradient-to-r from-[#E8D4B0] to-[#D4B896] border-none text-[#5A4A2A] hover:shadow-md'
  };
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg' };
  return (
    <motion.button whileHover={!disabled ? { scale: 1.02 } : {}} whileTap={!disabled ? { scale: 0.98 } : {}} onClick={onClick} disabled={disabled || loading} className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}>
      {loading ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-[#5A4A2A] border-t-transparent rounded-full" /> : <>{icon && <span className="text-lg">{icon}</span>}{children}</>}
    </motion.button>
  );
};

export default GlassButton;