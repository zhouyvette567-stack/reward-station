import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';
import { achievements as initialAchievements } from '../data/content';

const AchievementMuseum = () => {
  const [achievements, setAchievements] = useState(initialAchievements);
  const [selectedBadge, setSelectedBadge] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('reward-station-achievements');
    if (saved) { try { const d = JSON.parse(saved); setAchievements(prev => prev.map(a => ({ ...a, unlocked: d[a.id] || false }))); } catch(e) {} }
  }, []);

  return (
    <GlassCard className="relative overflow-hidden">
      <div className="relative">
        <div className="flex items-center gap-3 mb-4"><span className="text-2xl">🏆</span><h3 className="text-lg font-medium text-[#5A4A2A]">成就博物馆</h3></div>
        <p className="text-[#A89878] text-sm mb-4">点亮你的高光时刻</p>
        <div className="grid grid-cols-4 gap-3">
          {achievements.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.1 }} onClick={() => setSelectedBadge(a)} className={`relative aspect-square rounded-xl flex items-center justify-center cursor-pointer transition-all ${a.unlocked ? 'bg-[#F5E6C8] shadow-md' : 'bg-[#F5E8D0]/50'}`}>
              <motion.span className="text-2xl" animate={a.unlocked ? { scale: [1, 1.1, 1] } : {}} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} style={{ filter: a.unlocked ? 'none' : 'grayscale(100%) opacity(0.4)' }}>{a.emoji}</motion.span>
              {!a.unlocked && <div className="absolute inset-0 flex items-center justify-center"><span className="text-lg">🔒</span></div>}
            </motion.div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-[#E8C872]/20">
          <div className="flex justify-between items-center text-sm"><span className="text-[#A89878]">已解锁</span><span className="font-medium text-[#5A4A2A]">{achievements.filter(a => a.unlocked).length} / {achievements.length}</span></div>
          <div className="mt-2 h-2 bg-[#F5E8D0] rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${(achievements.filter(a => a.unlocked).length / achievements.length) * 100}%` }} transition={{ duration: 0.5 }} className="h-full bg-gradient-to-r from-[#E8C872] to-[#D4A853] rounded-full" /></div>
        </div>
      </div>
      <AnimatePresence>
        {selectedBadge && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedBadge(null)} className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 20 }} onClick={(e) => e.stopPropagation()} className="card-warm p-6 max-w-sm w-full">
            <div className="text-center"><motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="text-5xl mb-4">{selectedBadge.unlocked ? selectedBadge.emoji : '🔒'}</motion.div><h4 className="text-lg font-bold text-[#5A4A2A] mb-2">{selectedBadge.name}</h4><p className="text-[#5A4A2A]/70 mb-3">{selectedBadge.description}</p><p className="text-sm text-[#A89878]">{selectedBadge.unlocked ? '🎉 已解锁' : `解锁条件：${selectedBadge.requirement}`}</p></div>
            <button onClick={() => setSelectedBadge(null)} className="mt-4 w-full py-2 bg-[#F5E6C8] rounded-full text-[#5A4A2A] font-medium hover:bg-[#E8C872]/50 transition-colors">关闭</button>
          </motion.div>
        </motion.div>)}
      </AnimatePresence>
    </GlassCard>
  );
};

export default AchievementMuseum;