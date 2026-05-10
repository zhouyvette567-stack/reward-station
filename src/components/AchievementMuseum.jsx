import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { achievements as initialAchievements } from '../data/content';

const AchievementMuseum = () => {
  const [achievements, setAchievements] = useState(initialAchievements);
  const [selectedBadge, setSelectedBadge] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('reward-station-achievements');
    if (saved) {
      try {
        const savedData = JSON.parse(saved);
        setAchievements(prev => prev.map(a => ({
          ...a,
          unlocked: savedData[a.id] || false
        })));
      } catch (e) {
        console.error('加载成就数据失败:', e);
      }
    }
  }, []);

  const saveAchievement = (id) => {
    const updated = achievements.map(a => 
      a.id === id ? { ...a, unlocked: true } : a
    );
    setAchievements(updated);
    
    const saveData = {};
    updated.forEach(a => {
      saveData[a.id] = a.unlocked;
    });
    localStorage.setItem('reward-station-achievements', JSON.stringify(saveData));
  };

  const unlockAchievement = (id) => {
    const achievement = achievements.find(a => a.id === id);
    if (achievement && !achievement.unlocked) {
      saveAchievement(id);
      setSelectedBadge(achievement);
    }
  };

  return (
    <div className="card-warm p-6 relative overflow-hidden">
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <i className="fa-solid fa-trophy text-2xl icon-gold"></i>
          <h3 className="text-lg font-medium text-[#5A4A3A]">成就博物馆</h3>
        </div>
        
        <p className="text-[#A69076] text-sm mb-4">
          点亮你的高光时刻
        </p>

        <div className="grid grid-cols-4 gap-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setSelectedBadge(achievement)}
              className={`
                relative aspect-square rounded-xl 
                flex items-center justify-center
                cursor-pointer transition-all
                ${achievement.unlocked 
                  ? 'bg-[#F5EDE4] shadow-md' 
                  : 'bg-[#F5EDE4]/50'
                }
              `}
            >
              <motion.span 
                className="text-2xl"
                animate={achievement.unlocked ? {
                  scale: [1, 1.1, 1]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  filter: achievement.unlocked ? 'none' : 'grayscale(100%) opacity(0.4)'
                }}
              >
                {achievement.emoji}
              </motion.span>
              
              {!achievement.unlocked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg">🔒</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-[#D4A574]/20">
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#A69076]">已解锁</span>
            <span className="font-medium text-[#5A4A3A]">
              {achievements.filter(a => a.unlocked).length} / {achievements.length}
            </span>
          </div>
          <div className="mt-2 h-2 bg-[#F5EDE4] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ 
                width: `${(achievements.filter(a => a.unlocked).length / achievements.length) * 100}%` 
              }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-[#E8C9A0] to-[#D4A574] rounded-full"
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBadge(null)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="card-warm p-6 max-w-sm w-full"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="text-5xl mb-4"
                >
                  {selectedBadge.unlocked ? selectedBadge.emoji : '🔒'}
                </motion.div>
                
                <h4 className="text-lg font-bold text-[#5A4A3A] mb-2">
                  {selectedBadge.name}
                </h4>
                
                <p className="text-[#5A4A3A]/70 mb-3">
                  {selectedBadge.description}
                </p>
                
                <p className="text-sm text-[#A69076]">
                  {selectedBadge.unlocked 
                    ? '🎉 已解锁' 
                    : `解锁条件：${selectedBadge.requirement}`
                  }
                </p>
              </div>
              
              <button
                onClick={() => setSelectedBadge(null)}
                className="mt-4 w-full py-2 bg-[#F5EDE4] rounded-full text-[#5A4A3A] font-medium hover:bg-[#E8C9A0]/50 transition-colors"
              >
                关闭
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AchievementMuseum;