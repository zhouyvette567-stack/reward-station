import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    
    setLoading(true);
    setShowResult(false);
    
    const style = getRandomStyle();
    setCurrentStyle(style);
    
    try {
      const result = await getPraise(input, style.id);
      setPraise(result);
      setShowResult(true);
    } catch (error) {
      console.error('获取夸奖失败:', error);
      setPraise('哎呀，出了点小问题。不过你依然很棒！✨');
      setShowResult(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setInput('');
    setPraise('');
    setShowResult(false);
    setCurrentStyle(null);
  };

  return (
    <div className="card-warm p-6 relative overflow-hidden">
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <i className="fa-solid fa-comment-dots text-xl icon-gold"></i>
          <h3 className="text-lg font-medium text-[#5A4A3A]">AI 夸夸生成器</h3>
        </div>
        <p className="text-[#A69076] text-sm mb-4">万物皆可夸，每一件小事都值得被看见</p>
        
        {!showResult ? (
          <>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="今天做了什么小事？比如：按时起床、喝了一杯水..."
              maxLength={200}
              className="input-warm w-full resize-none mb-4"
              rows={3}
            />
            <button
              onClick={handleSubmit}
              disabled={!input.trim() || loading}
              className="btn-gold-gradient w-full py-3 rounded-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '正在生成夸奖...' : '✨ 获取专属夸奖'}
            </button>
          </>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {currentStyle && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5EDE4]"
                >
                  <span>{currentStyle.emoji}</span>
                  <span className="text-sm font-medium text-[#5A4A3A]">{currentStyle.name}</span>
                </motion.div>
              )}
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-5 bg-[#FFFBF7] rounded-xl border border-[#D4A574]/10"
              >
                <p className="text-[#5A4A3A] leading-relaxed text-base">
                  {praise}
                </p>
              </motion.div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-2 bg-[#F5EDE4] rounded-full text-[#5A4A3A] font-medium hover:bg-[#E8C9A0]/50 transition-colors"
                >
                  🎲 换一种风格
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 py-2 bg-[#F5EDE4] rounded-full text-[#5A4A3A] font-medium hover:bg-[#E8C9A0]/50 transition-colors"
                >
                  🔄 再来一次
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default PraiseGenerator;