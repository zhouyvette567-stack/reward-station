import { motion } from 'framer-motion';

const GlassInput = ({ value, onChange, placeholder = '', className = '', multiline = false, maxLength = 200, ...props }) => {
  const inputClasses = 'w-full bg-white/30 backdrop-blur-sm border border-white/30 rounded-2xl px-5 py-4 text-gray-700 placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-cream-400/50 focus:border-transparent focus:bg-white/40 transition-all duration-300 resize-none ' + className;
  if (multiline) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="relative">
        <textarea value={value} onChange={onChange} placeholder={placeholder} maxLength={maxLength} className={inputClasses} rows={3} {...props} />
        <div className="absolute bottom-3 right-4 text-xs text-gray-400">{value.length}/{maxLength}</div>
      </motion.div>
    );
  }
  return <motion.input initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} type="text" value={value} onChange={onChange} placeholder={placeholder} className={inputClasses} {...props} />;
};

export default GlassInput;