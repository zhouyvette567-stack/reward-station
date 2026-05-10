import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { echoRoles } from '../data/content';
import { getEcho } from '../utils/aiService';

const EchoChamber = () => {
  const [input, setInput] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowResult(false);
    setResponse('');
  };

  const handleSubmit = async () => {
    if (!input.trim() || !selectedRole) return;
    
    setLoading(true);
    
    try {
      const result = await getEcho(input, selectedRole.id);
      setResponse(result);
      setShowResult(true);
    } catch (error) {
      console.error('获取回复失败:', error);
      setResponse('让我想想...稍后再试吧 💭');
      setShowResult(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setInput('');
    setResponse('');
    setShowResult(false);
  };

  return (
    <div className="card-warm p-6 relative overflow-hidden">
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <i className="fa-solid fa-comments text-2xl icon-gold"></i>
          <h3 className="text-lg font-medium text-[#5A4A3A]">树洞回声</h3>
        </div>
        
        <p className="text-[#A69076] text-sm mb-4">
          AI 换位思考，从不同视角重新解读你的故事
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {echoRoles.map((role) => (
            <motion.button
              key={role.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRoleSelect(role)}
              className={`p-3 rounded-xl border transition-all ${
                selectedRole?.id === role.id
                  ? 'bg-[#F5EDE4] border-[#D4A574]/40 shadow-md'
                  : 'bg-[#FFFBF7] border-[#D4A574]/20 hover:bg-[#F5EDE4]/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{role.emoji}</span>
                <div className="text-left">
                  <p className="text-sm font-medium text-[#5A4A3A]">{role.name}</p>
                  <p className="text-xs text-[#A69076]">{role.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="分享你的想法或困扰，让不同角色来回应你..."
                className="input-warm w-full resize-none mb-4"
                rows={3}
                maxLength={300}
              />
              
              <button
                onClick={handleSubmit}
                disabled={!input.trim() || !selectedRole}
                className="btn-gold-gradient w-full py-3 rounded-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '正在聆听...' : `🔮 请${selectedRole?.name || '...'}回应`}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="p-5 rounded-xl border border-[#D4A574]/20 bg-[#FFFBF7]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{selectedRole?.emoji}</span>
                  <span className="font-medium text-[#5A4A3A]">{selectedRole?.name}</span>
                </div>
                <p className="text-[#5A4A3A] leading-relaxed">
                  {response}
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-2 bg-[#F5EDE4] rounded-full text-[#5A4A3A] font-medium hover:bg-[#E8C9A0]/50 transition-colors"
                >
                  🔄 再听一次
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 py-2 bg-[#F5EDE4] rounded-full text-[#5A4A3A] font-medium hover:bg-[#E8C9A0]/50 transition-colors"
                >
                  ✨ 换个话题
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EchoChamber;