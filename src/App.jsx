import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PraiseGenerator from './components/PraiseGenerator';
import BlindBox from './components/BlindBox';
import EchoChamber from './components/EchoChamber';
import AchievementMuseum from './components/AchievementMuseum';
import { praiseStyles } from './data/content';

function App() {
  const [mainInput, setMainInput] = useState('');
  const [activeSection, setActiveSection] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentStyle, setCurrentStyle] = useState(null);

  useEffect(() => {
    setCurrentStyle(praiseStyles[Math.floor(Math.random() * praiseStyles.length)]);
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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-3xl">🎁</span>
            <h1 className="text-3xl font-bold gradient-text">今日嘉奖</h1>
            <span className="text-3xl">🔥</span>
          </div>
        </motion.header>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10">
          <div className="card-warm p-6">
            <p className="text-sm text-[#A89878] mb-3 text-center">纪录</p>
            <textarea value={mainInput} onChange={(e) => setMainInput(e.target.value)} placeholder="今天做了什么好事？" className="input-warm w-full resize-none mb-4" rows={2} />
            <button onClick={handleMainSubmit} disabled={!mainInput.trim()} className="btn-gold-gradient w-full py-3 rounded-full text-center disabled:opacity-50 disabled:cursor-not-allowed">领取</button>
            <p className="text-sm text-[#A89878] mt-4 text-center">只有你知道，什么才是你的幸福</p>
            <AnimatePresence>
              {showFeedback && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 text-center">
                  <span className="inline-block px-4 py-2 bg-[#F5E6C8] rounded-full text-[#5A4A2A]">🎉 太棒了！你的记录已被珍藏</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => toggleSection('praise')} className="card-warm w-full p-5 text-left">
              <div className="flex items-center gap-3 mb-2"><span className="text-2xl">💬</span><h3 className="font-medium text-[#5A4A2A]">AI 夸夸生成器</h3></div>
              <p className="text-sm text-[#A89878]">{currentStyle?.name || '优雅书生风'}</p>
            </motion.button>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => toggleSection('blindbox')} className="card-warm w-full p-5 text-left">
              <div className="flex items-center gap-3 mb-2"><span className="text-2xl">🎁</span><h3 className="font-medium text-[#5A4A2A]">心情盲盒</h3></div>
              <p className="text-sm text-[#A89878]">随机生活小任务</p>
            </motion.button>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => toggleSection('achievement')} className="card-warm w-full p-5 text-left">
              <div className="flex items-center gap-3 mb-2"><span className="text-2xl">🏆</span><h3 className="font-medium text-[#5A4A2A]">成就博物馆</h3></div>
              <p className="text-sm text-[#A89878]">点亮你的高光时刻</p>
            </motion.button>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {activeSection === 'praise' && <motion.div key="praise" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-6"><PraiseGenerator /></motion.div>}
          {activeSection === 'blindbox' && <motion.div key="blindbox" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-6"><BlindBox /></motion.div>}
          {activeSection === 'achievement' && <motion.div key="achievement" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-6"><AchievementMuseum /></motion.div>}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-10"><EchoChamber /></motion.div>

        <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex justify-between items-center text-sm text-[#A89878] py-4">
          <p>© 2026 今日嘉奖 Yvette</p>
          <p>关于 · 分享</p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;