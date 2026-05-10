import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';
import GlassButton from './GlassButton';
import { getRandomTask } from '../data/content';

const BlindBox = ({ onTaskComplete }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [showTask, setShowTask] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleOpenBox = () => {
    setIsOpening(true); setShowTask(false);
    setTimeout(() => { setCurrentTask(getRandomTask()); setShowTask(true); setIsOpening(false); }, 1500);
  };
  const handleComplete = () => { setCompleted(true); if (onTaskComplete) onTaskComplete(currentTask); };
  const handleReset = () => { setCurrentTask(null); setShowTask(false); setCompleted(false); };

  return (
    <GlassCard className="relative overflow-hidden">
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-mint-200/30 to-sky-200/30 rounded-full blur-2xl" />
      <div className="relative">
        <div className="flex items-center gap-3 mb-4"><span className="text-3xl">🎁</span><h3 className="text-xl font-medium text-gray-700">正向盲盒</h3></div>
        <p className="text-gray-500 text-sm mb-4">每日随机奖励，给生活一点小惊喜</p>
        {!showTask ? (<div className="flex flex-col items-center py-6">
          <motion.div animate={isOpening ? { rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.1, 1, 1.1, 1] } : { y: [0, -5, 0] }} transition={isOpening ? { duration: 1.5 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }} className="text-7xl mb-6">{isOpening ? '🎊' : '🎁'}</motion.div>
          <GlassButton onClick={handleOpenBox} disabled={isOpening} variant="primary" className="w-full">{isOpening ? '正在抽取...' : '🎲 开启今日盲盒'}</GlassButton>
        </div>) : (<AnimatePresence><motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className={`p-5 rounded-2xl border border-white/20 ${completed ? 'bg-gradient-to-r from-mint-200/50 to-sky-200/50' : 'bg-white/30'}`}>
            <div className="flex items-center gap-4"><motion.span className="text-4xl" animate={completed ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.5 }}>{completed ? '✅' : currentTask?.emoji}</motion.span><div><p className={`text-lg font-medium ${completed ? 'text-gray-600' : 'text-gray-700'}`}>{currentTask?.task}</p><span className="text-xs text-gray-400 mt-1 inline-block px-2 py-0.5 bg-white/30 rounded-full">{currentTask?.category}</span></div></div>
          </motion.div>
          {!completed ? (<div className="flex gap-3"><GlassButton onClick={handleComplete} variant="success" className="flex-1">✨ 我完成了！</GlassButton><GlassButton onClick={handleReset} variant="default" size="sm">🔄 重抽</GlassButton></div>) : (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center"><p className="text-gray-600 mb-3">太棒了！你完成了一个小任务 🎉</p><GlassButton onClick={handleReset} variant="primary" className="w-full">🎁 再抽一个</GlassButton></motion.div>)}
        </motion.div></AnimatePresence>)}
      </div>
    </GlassCard>
  );
};
export default BlindBox;