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
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-yellow-200/30 to-amber-200/30 rounded-full blur-2xl" />
      <div className="relative">
        <div className="flex items-center gap-3 mb-4"><span className="text-3xl">🏆</span><h3 className="text-xl font-medium text-gray-700">成就博物馆</h3></div>
        <p className="text-gray-500 text-sm mb-4">每一个小进步，都值得被铭记</p>
        <div className="grid grid-cols-4 gap-3">
          {achievements.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.1 }} onClick={() => setSelectedBadge(a)} className={`relative aspect-square rounded-2xl flex items-center justify-center cursor-pointer transition-all ${a.unlocked ? `bg-gradient-to-br ${a.color} shadow-md` : 'bg-gray-200/50'}`}>
              <motion.span className="text-2xl" animate={a.unlocked ? { scale: [1, 1.1, 1] } : {}} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} style={{ filter: a.unlocked ? 'none' : 'grayscale(100%) opacity(0.4)' }}>{a.emoji}</motion.span>
              {!a.unlocked && <div className="absolute inset-0 flex items-center justify-center"><span className="text-lg">🔒</span></div>}
            </motion.div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex justify-between items-center text-sm"><span className="text-gray-500">已解锁</span><span className="font-medium text-gray-700">{achievements.filter(a => a.unlocked).length} / {achievements.length}</span></div>
          <div className="mt-2 h-2 bg-white/30 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${(achievements.filter(a => a.unlocked).length / achievements.length) * 100}%` }} transition={{ duration: 0.5 }} className="h-full bg-gradient-to-r from-peach-300 to-lavender-300 rounded-full" /></div>
        </div>
      </div>
      <AnimatePresence>
        {selectedBadge && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedBadge(null)} className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 20 }} onClick={(e) => e.stopPropagation()} className={`p-6 rounded-3xl max-w-sm w-full bg-gradient-to-br ${selectedBadge.color} shadow-2xl`}>
            <div className="text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="text-6xl mb-4">{selectedBadge.unlocked ? selectedBadge.emoji : '🔒'}</motion.div>
              <h4 className="text-xl font-bold text-gray-700 mb-2">{selectedBadge.name}</h4>
              <p className="text-gray-600 mb-3">{selectedBadge.description}</p>
              <p className="text-sm text-gray-500">{selectedBadge.unlocked ? '🎉 已解锁' : `解锁条件：${selectedBadge.requirement}`}</p>
            </div>
            <button onClick={() => setSelectedBadge(null)} className="mt-4 w-full py-2 bg-white/50 rounded-full text-gray-700 font-medium hover:bg-white/60 transition-colors">关闭</button>
          </motion.div>
        </motion.div>)}
      </AnimatePresence>
    </GlassCard>
  );
};
export default AchievementMuseum;