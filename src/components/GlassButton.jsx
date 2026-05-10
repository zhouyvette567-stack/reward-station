import { motion } from 'framer-motion';

const GlassButton = ({ children, onClick, className = '', variant = 'default', size = 'md', disabled = false, loading = false, icon = null }) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    default: 'bg-white/50 backdrop-blur-sm border border-white/40 text-gray-700 hover:bg-white/60 hover:shadow-lg',
    primary: 'bg-gradient-to-r from-peach-200 to-lavender-200 backdrop-blur-sm border border-white/40 text-gray-700 hover:from-peach-300 hover:to-lavender-300 hover:shadow-lg',
    success: 'bg-gradient-to-r from-mint-200 to-sky-200 backdrop-blur-sm border border-white/40 text-gray-700 hover:from-mint-300 hover:to-sky-300 hover:shadow-lg'
  };
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg' };
  return (
    <motion.button whileHover={!disabled ? { scale: 1.05 } : {}} whileTap={!disabled ? { scale: 0.95 } : {}} onClick={onClick} disabled={disabled || loading} className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}>
      {loading ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full" /> : <>{icon && <span className="text-lg">{icon}</span>}{children}</>}
    </motion.button>
  );
};

export default GlassButton;