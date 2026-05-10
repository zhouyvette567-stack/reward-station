import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PraiseGenerator from './components/PraiseGenerator';
import BlindBox from './components/BlindBox';
import EchoChamber from './components/EchoChamber';
import AchievementMuseum from './components/AchievementMuseum';
import { praiseStyles } from './data/content';

function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const updateTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    setCurrentTime(`${displayHours}:${minutes} ${ampm}`);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="page-container">
      {/* 顶部区域 - 标题 + 时间 */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-6"
      >
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-gift text-xl icon-gold"></i>
          <i className="fa-solid fa-fire text-lg icon-gold"></i>
          <h1 className="text-2xl font-semibold gradient-text ml-1">今日嘉奖</h1>
        </div>
        <span className="text-sm text-[#8B7355]">{currentTime}</span>
      </motion.header>

      {/* Slogan */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center text-[#8B7355] mb-10 text-base leading-relaxed"
      >
        即使只是一小步，也值得庆贺
      </motion.p>

      {/* 功能卡片区域 - 三栏布局 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {/* AI 夸夸生成器 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="w-full"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleSection('praise')}
            className="card-warm w-full p-5 text-center"
          >
            <i className="fa-solid fa-comment-dots text-2xl icon-gold mb-3 block"></i>
            <h3 className="font-semibold text-[#5A4A3A] mb-1 text-base">AI 夸夸生成器</h3>
            <p className="text-sm text-[#A69076] leading-relaxed">优雅书生风</p>
          </motion.button>
        </motion.div>

        {/* 心情盲盒 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="w-full"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleSection('blindbox')}
            className="card-warm w-full p-5 text-center"
          >
            <i className="fa-solid fa-box-open text-2xl icon-gold mb-3 block"></i>
            <h3 className="font-semibold text-[#5A4A3A] mb-1 text-base">心情盲盒</h3>
            <p className="text-sm text-[#A69076] leading-relaxed">随机生活小任务</p>
          </motion.button>
        </motion.div>

        {/* 成就博物馆 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="w-full"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleSection('achievement')}
            className="card-warm w-full p-5 text-center"
          >
            <i className="fa-solid fa-trophy text-2xl icon-gold mb-3 block"></i>
            <h3 className="font-semibold text-[#5A4A3A] mb-1 text-base">成就博物馆</h3>
            <p className="text-sm text-[#A69076] leading-relaxed">点亮你的高光时刻</p>
          </motion.button>
        </motion.div>
      </div>

      {/* 展开的功能区域 */}
      <AnimatePresence mode="wait">
        {activeSection === 'praise' && (
          <motion.div
            key="praise"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <PraiseGenerator />
          </motion.div>
        )}

        {activeSection === 'blindbox' && (
          <motion.div
            key="blindbox"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <BlindBox />
          </motion.div>
        )}

        {activeSection === 'achievement' && (
          <motion.div
            key="achievement"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <AchievementMuseum />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 树洞回声 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="mb-8"
      >
        <EchoChamber />
      </motion.div>

      {/* 页脚 */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="footer-center text-sm text-[#A69076] pt-10 pb-4"
      >
        <p>© 2026 今日嘉奖</p>
        <p>关于 · 分享</p>
      </motion.footer>
    </div>
  );
}

export default App;