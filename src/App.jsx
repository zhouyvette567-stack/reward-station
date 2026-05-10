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
  const [currentTime, setCurrentTime] = useState('');

  // 初始化随机风格和时间
  useEffect(() => {
    setCurrentStyle(praiseStyles[Math.floor(Math.random() * praiseStyles.length)]);
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

  const handleMainSubmit = () => {
    if (!mainInput.trim()) return;
    setShowFeedback(true);
    setActiveSection('praise');
    setTimeout(() => {
      setShowFeedback(false);
    }, 3000);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* 顶部区域 */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-10"
        >
          {/* 左上角：图标 + 标题 */}
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-gift text-xl icon-gold"></i>
            <i className="fa-solid fa-fire text-lg icon-gold"></i>
            <h1 className="text-xl font-semibold gradient-text ml-1">今日嘉奖</h1>
          </div>
          {/* 右上角：时间 */}
          <span className="text-sm text-[#8B7355]">{currentTime}</span>
        </motion.header>

        {/* 核心输入区 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="card-warm p-6">
            {/* 纪录标签 */}
            <p className="text-sm text-[#A69076] mb-3">纪录</p>
            
            {/* 输入框 */}
            <textarea
              value={mainInput}
              onChange={(e) => setMainInput(e.target.value)}
              placeholder=""
              className="input-warm w-full resize-none mb-4"
              rows={2}
            />

            {/* 领取按钮 */}
            <button
              onClick={handleMainSubmit}
              disabled={!mainInput.trim()}
              className="btn-gold-gradient w-full py-3 rounded-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              领取
            </button>

            {/* Slogan */}
            <p className="text-sm text-[#8B7355] mt-4 text-center">
              即使只是一小步，也值得庆贺
            </p>

            {/* 反馈提示 */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 text-center"
                >
                  <span className="inline-block px-4 py-2 bg-[#F5EDE4] rounded-full text-[#5A4A3A]">
                    🎉 太棒了！你的记录已被珍藏
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* 功能卡片区域 - 三栏布局 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {/* AI 夸夸生成器 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleSection('praise')}
              className="card-warm w-full p-5 text-left relative"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-[#5A4A3A] mb-1">AI 夸夸生成器</h3>
                  <p className="text-sm text-[#A69076]">优雅书生风</p>
                </div>
                <i className="fa-solid fa-comment-dots text-2xl icon-gold"></i>
              </div>
              <div className="mt-3">
                <span className="tag-btn">优雅书生风</span>
              </div>
            </motion.button>
          </motion.div>

          {/* 心情盲盒 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleSection('blindbox')}
              className="card-warm w-full p-5 text-left"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-[#5A4A3A] mb-1">心情盲盒</h3>
                  <p className="text-sm text-[#A69076]">随机生活小任务</p>
                </div>
                <i className="fa-solid fa-box-open text-2xl icon-gold"></i>
              </div>
            </motion.button>
          </motion.div>

          {/* 成就博物馆 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleSection('achievement')}
              className="card-warm w-full p-5 text-left"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-[#5A4A3A] mb-1">成就博物馆</h3>
                  <p className="text-sm text-[#A69076]">点亮你的高光时刻</p>
                </div>
                <i className="fa-solid fa-trophy text-2xl icon-gold"></i>
              </div>
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
              className="mb-6"
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
              className="mb-6"
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
              className="mb-6"
            >
              <AchievementMuseum />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 树洞回声 - 独立展示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-10"
        >
          <EchoChamber />
        </motion.div>

        {/* 页脚 */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-between items-center text-sm text-[#A69076] py-4"
        >
          <p>© 2026 今日嘉奖</p>
          <p>关于 · 分享</p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;