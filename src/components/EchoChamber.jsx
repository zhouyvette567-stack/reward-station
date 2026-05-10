import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';
import GlassInput from './GlassInput';
import GlassButton from './GlassButton';
import { echoRoles } from '../data/content';
import { getEcho } from '../utils/aiService';

const EchoChamber = () => {
  const [input, setInput] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleRoleSelect = (role) => { setSelectedRole(role); setShowResult(false); setResponse(''); };
  const handleSubmit = async () => {
    if (!input.trim() || !selectedRole) return;
    setLoading(true);
    try { const result = await getEcho(input, selectedRole.id); setResponse(result); setShowResult(true); }
    catch { setResponse('让我想想...稍后再试吧 💭'); setShowResult(true); }
    finally { setLoading(false); }
  };
  const handleReset = () => { setInput(''); setResponse(''); setShowResult(false); };

  return (
    <GlassCard className="relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-lavender-200/30 to-peach-200/30 rounded-full blur-2xl" />
      <div className="relative">
        <div className="flex items-center gap-3 mb-4"><span className="text-3xl">🦉</span><h3 className="text-xl font-medium text-gray-700">树洞回声</h3></div>
        <p className="text-gray-500 text-sm mb-4">AI 换位思考，从不同视角重新解读你的故事</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {echoRoles.map((role) => (
            <motion.button key={role.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleRoleSelect(role)} className={`p-3 rounded-xl border transition-all ${selectedRole?.id === role.id ? `bg-gradient-to-r ${role.color} border-white/40 shadow-md` : 'bg-white/20 border-white/20 hover:bg-white/30'}`}>
              <div className="flex items-center gap-2"><span className="text-xl">{role.emoji}</span><div className="text-left"><p className="text-sm font-medium text-gray-700">{role.name}</p><p className="text-xs text-gray-400">{role.description}</p></div></div>
            </motion.button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {!showResult ? (<motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <GlassInput value={input} onChange={(e) => setInput(e.target.value)} placeholder="分享你的想法或困扰，让不同角色来回应你..." multiline maxLength={300} className="mb-4" />
            <GlassButton onClick={handleSubmit} disabled={!input.trim() || !selectedRole} loading={loading} variant="primary" className="w-full">{loading ? '正在聆听...' : `🔮 请${selectedRole?.name || '...'}回应`}</GlassButton>
          </motion.div>) : (<motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
            <div className={`p-5 rounded-2xl border border-white/20 bg-gradient-to-r ${selectedRole?.color}`}>
              <div className="flex items-center gap-2 mb-3"><span className="text-2xl">{selectedRole?.emoji}</span><span className="font-medium text-gray-700">{selectedRole?.name}</span></div>
              <p className="text-gray-700 leading-relaxed">{response}</p>
            </div>
            <div className="flex gap-3"><GlassButton onClick={handleSubmit} variant="default" size="sm" className="flex-1">🔄 再听一次</GlassButton><GlassButton onClick={handleReset} variant="success" size="sm" className="flex-1">✨ 换个话题</GlassButton></div>
          </motion.div>)}
        </AnimatePresence>
      </div>
    </GlassCard>
  );
};
export default EchoChamber;