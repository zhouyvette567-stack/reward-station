import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';
import GlassInput from './GlassInput';
import GlassButton from './GlassButton';
import { getRandomStyle } from '../data/content';
import { getPraise } from '../utils/aiService';

const PraiseGenerator = () => {
  const [input, setInput] = useState('');
  const [currentStyle, setCurrentStyle] = useState(null);
  const [praise, setPraise] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true); setShowResult(false);
    const style = getRandomStyle(); setCurrentStyle(style);
    try { const result = await getPraise(input, style.id); setPraise(result); setShowResult(true); }
    catch { setPraise('哎呀，出了点小问题。不过你依然很棒！✨'); setShowResult(true); }
    finally { setLoading(false); }
  };

  const handleReset = () => { setInput(''); setPraise(''); setShowResult(false); setCurrentStyle(null); };

  return (
    <GlassCard className="relative overflow-hidden">
      <div className="relative">
        <div className="flex items-center gap-3 mb-4"><span className="text-2xl">💬</span><h3 className="text-lg font-medium text-[#5A4A2A]">AI 夸夸生成器</h3></div>
        <p className="text-[#A89878] text-sm mb-4">万物皆可夸，每一件小事都值得被看见</p>
        {!showResult ? (<>
          <GlassInput value={input} onChange={(e) => setInput(e.target.value)} placeholder="今天做了什么小事？比如：按时起床、喝了一杯水..." multiline maxLength={200} className="mb-4" />
          <GlassButton onClick={handleSubmit} disabled={!input.trim()} loading={loading} variant="primary" className="w-full">{loading ? '正在生成夸奖...' : '✨ 获取专属夸奖'}</GlassButton>
        </>) : (<AnimatePresence>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
            {currentStyle && <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5E6C8]"><span>{currentStyle.emoji}</span><span className="text-sm font-medium text-[#5A4A2A]">{currentStyle.name}</span></motion.div>}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="p-5 bg-[#FDF8F0] rounded-xl border border-[#E8C872]/20"><p className="text-[#5A4A2A] leading-relaxed text-base">{praise}</p></motion.div>
            <div className="flex gap-3"><GlassButton onClick={handleSubmit} variant="default" size="sm" className="flex-1">🎲 换一种风格</GlassButton><GlassButton onClick={handleReset} variant="success" size="sm" className="flex-1">🔄 再来一次</GlassButton></div>
          </motion.div>
        </AnimatePresence>)}
      </div>
    </GlassCard>
  );
};

export default PraiseGenerator;