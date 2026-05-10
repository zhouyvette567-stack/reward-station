import { motion } from 'framer-motion';

const GlassInput = ({ value, onChange, placeholder = '', className = '', multiline = false, maxLength = 200, ...props }) => {
  const inputClasses = 'input-warm w-full resize-none ' + className;
  if (multiline) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="relative">
        <textarea value={value} onChange={onChange} placeholder={placeholder} maxLength={maxLength} className={inputClasses} rows={3} {...props} />
        <div className="absolute bottom-3 right-4 text-xs text-[#A89878]">{value.length}/{maxLength}</div>
      </motion.div>
    );
  }
  return <motion.input initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} type="text" value={value} onChange={onChange} placeholder={placeholder} className={inputClasses} {...props} />;
};

export default GlassInput;