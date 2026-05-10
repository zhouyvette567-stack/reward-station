import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassInput from './components/GlassInput';
import GlassButton from './components/GlassButton';
import PraiseGenerator from './components/PraiseGenerator';
import BlindBox from './components/BlindBox';
import EchoChamber from './components/EchoChamber';
import AchievementMuseum from './components/AchievementMuseum';
import { getRandomEncouragement } from './data/content';

function App() {
  const [mainInput, setMainInput] = useState('');
  const [encouragement, setEncouragement] = useState('');
  const [activeSection, setActiveSection] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    setEncouragement(getRandomEncouragement());
  }, []);

  const handleMainSubmit = () => {
    if (!mainInput.trim()) return;
    setShowFeedback(true);
    setActiveSection('praise');
    setTimeout(() => { setShowFeedback(false); }, 3000);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ x: [0, 20, 0], y: [0, -20, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="absolute top-20 left-10 w-64 h-64 bg-peach-200/30 rounded-full blur-3xl" />
        <motion.div animate={{ x: [0, -30, 0], y: [0, 30, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-20 right-10 w-80 h-80 bg-lavender-200/30 rounded-full blur-3xl" />
        <motion.div animate={{ x: [0, 15, 0], y: [0, 15, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-mint-200/20 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-4xl mx-auto">
        <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <motion.h1 initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.4 }} className="text-4xl sm:text-5xl font-bold mb-3">
            <span className="gradient-text">奖励站</span>
            <span className="ml-2 text-3xl">✨</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gray-500 text-lg">每一件小事，都值得被看见</motion.p>
        </motion.header>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <div className="bg-white/40 backdrop-blur-lg rounded-3xl p-6 shadow-[0_8px_32px_rgba(255,255,255,0.37)] border border-white/30">
            <motion.p key={encouragement} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-600 mb-4 text-lg">{encouragement}</motion.p>
            <div className="flex gap-3">
              <GlassInput value={mainInput} onChange={(e) => setMainInput(e.target.value)} placeholder="今天做了什么好事？记录一下吧..." className="flex-1" onKeyPress={(e) => e.key === 'Enter' && handleMainSubmit()} />
              <GlassButton onClick={handleMainSubmit} disabled={!mainInput.trim()} variant="primary">记录 ✨</GlassButton>
            </div>
            <AnimatePresence>
              {showFeedback && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 text-center">
                  <span className="inline-block px-4 py-2 bg-mint-200/50 rounded-full text-gray-700">🎉 太棒了！你的记录已被珍藏</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {['praise', 'blindbox', 'achievement'].map((section, i) => {
            const config = {
              praise: { emoji: '✨', title: 'AI 夸夸生成器', desc: '万物皆可夸', activeColor: 'from-peach-200/60 to-lavender-200/60' },
              blindbox: { emoji: '🎁', title: '正向盲盒', desc: '每日随机奖励', activeColor: 'from-mint-200/60 to-sky-200/60' },
              achievement: { emoji: '🏆', title: '成就博物馆', desc: '视觉化正反馈', activeColor: 'from-yellow-200/60 to-amber-200/60' },
            }[section];
            return (
              <motion.div key={section} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => toggleSection(section)} className={`w-full p-5 rounded-3xl transition-all ${activeSection === section ? `bg-gradient-to-br ${config.activeColor} shadow-lg` : 'bg-white/30 hover:bg-white/40'} backdrop-blur-lg border border-white/30`}>
                  <div className="text-center">
                    <span className="text-4xl block mb-2">{config.emoji}</span>
                    <h3 className="font-medium text-gray-700">{config.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{config.desc}</p>
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          {activeSection === 'praise' && <motion.div key="praise" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-6"><PraiseGenerator /></motion.div>}
          {activeSection === 'blindbox' && <motion.div key="blindbox" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-6"><BlindBox /></motion.div>}
          {activeSection === 'achievement' && <motion.div key="achievement" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-6"><AchievementMuseum /></motion.div>}
        </AnimatePresence>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-8"><EchoChamber /></motion.div>
        <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center text-gray-400 text-sm py-4">
          <p>用温柔的眼光看待每一个小进步 💕</p>
          <p className="mt-1">奖励站 · 让生活更有仪式感</p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
