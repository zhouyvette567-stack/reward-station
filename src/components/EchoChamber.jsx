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
      <div className="relative">
        <div className="flex items-center gap-3 mb-4"><span className="text-2xl">🦉</span><h3 className="text-lg font-medium text-[#5A4A2A]">树洞回声</h3></div>
        <p className="text-[#A89878] text-sm mb-4">AI 换位思考，从不同视角重新解读你的故事</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {echoRoles.map((role) => (
            <motion.button key={role.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleRoleSelect(role)} className={`p-3 rounded-xl border transition-all ${selectedRole?.id === role.id ? 'bg-[#F5E6C8] border-[#E8C872]/40 shadow-md' : 'bg-[#FDF8F0] border-[#E8C872]/20 hover:bg-[#F5E6C8]/50'}`}>
              <div className="flex items-center gap-2"><span className="text-lg">{role.emoji}</span><div className="text-left"><p className="text-sm font-medium text-[#5A4A2A]">{role.name}</p><p className="text-xs text-[#A89878]">{role.description}</p></div></div>
            </motion.button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {!showResult ? (<motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <GlassInput value={input} onChange={(e) => setInput(e.target.value)} placeholder="分享你的想法或困扰，让不同角色来回应你..." multiline maxLength={300} className="mb-4" />
            <GlassButton onClick={handleSubmit} disabled={!input.trim() || !selectedRole} loading={loading} variant="primary" className="w-full">{loading ? '正在聆听...' : `🔮 请${selectedRole?.name || '...'}回应`}</GlassButton>
          </motion.div>) : (<motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
            <div className="p-5 rounded-xl border border-[#E8C872]/20 bg-[#FDF8F0]"><div className="flex items-center gap-2 mb-3"><span className="text-xl">{selectedRole?.emoji}</span><span className="font-medium text-[#5A4A2A]">{selectedRole?.name}</span></div><p className="text-[#5A4A2A] leading-relaxed">{response}</p></div>
            <div className="flex gap-3"><GlassButton onClick={handleSubmit} variant="default" size="sm" className="flex-1">🔄 再听一次</GlassButton><GlassButton onClick={handleReset} variant="success" size="sm" className="flex-1">✨ 换个话题</GlassButton></div>
          </motion.div>)}
        </AnimatePresence>
      </div>
    </GlassCard>
  );
};

export default EchoChamber;