import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Loader2, 
  Laptop, 
  ExternalLink,
  RotateCcw,
  ShieldCheck,
  Check
} from 'lucide-react';
import { UltrabookProduct, ChatMessage } from '../types';

interface FloatingAIChatProps {
  products: UltrabookProduct[];
  isOpen: boolean;
  onToggle: () => void;
  onSelectProduct: (product: UltrabookProduct) => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    role: 'assistant',
    content: `Halo! 👋 Saya **Minority Tech AI Consultant** (Official Assistant @minoritytech di Instagram).

Saya siap membantu Anda memilih ultrabook bisnis bekas Grade A+ yang paling cocok (ThinkPad, Surface, MacBook, Dell XPS), membedah hasil sertifikat 28-Point QC Lab, hingga info pengiriman packing kayu & garansi 1 tahun kami.

Ada spesifikasi atau budget tertentu yang ingin Anda tanyakan?`,
    timestamp: 'Baru saja',
  },
];

const SUGGESTED_QUESTIONS = [
  'Bantu pilih ThinkPad vs MacBook untuk programmer',
  'Laptop budget 9-10 jutaan paling awet & batre tahan lama?',
  'Bagaimana sistem garansi 1 tahun & 30 hari tukar unit?',
  'Jelaskan kondisi Grade A+ di Minority Tech',
];

export const FloatingAIChat: React.FC<FloatingAIChatProps> = ({
  products,
  isOpen,
  onToggle,
  onSelectProduct,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: text,
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi AI');
      }

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Maaf, terjadi kendala saat memproses jawaban.',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        recommendedProductIds: data.recommendedProductIds || [],
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        role: 'assistant',
        content: `Maaf atas kendala teknis jaringan. Namun Anda dapat langsung mengecek koleksi unggulan kami seperti **ThinkPad X1 Carbon Gen 9** (Rp 11.450.000) atau **ThinkPad T14s Gen 2 AMD** (Rp 9.850.000) yang semuanya bergaransi 1 tahun penuh di Minority Tech.`,
        timestamp: 'Baru saja',
        recommendedProductIds: ['thinkpad-x1-carbon-gen9', 'thinkpad-t14s-gen2-amd'],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const getProduct = (id: string) => {
    return products.find(p => p.id === id);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <>
      {/* Floating Action Trigger Button (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40">
        {!isOpen && (
          <button
            onClick={onToggle}
            className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-2xl shadow-cyan-950/80 hover:shadow-cyan-500/40 border border-cyan-400/40 transition-all duration-300 hover:scale-105 cyber-glow-cyan"
            aria-label="Buka Chat AI Consultant"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span className="hidden sm:inline font-mono">Tanya AI Consultant</span>
            <span className="sm:hidden font-mono">AI Chat</span>
          </button>
        )}
      </div>

      {/* Chat Window Drawer / Floating Box */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[95vw] sm:w-[440px] h-[580px] max-h-[85vh] rounded-2xl bg-[#090d16] border border-cyan-500/40 shadow-2xl shadow-cyan-950/80 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200 cyber-glow-cyan">
          {/* Header */}
          <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                <Bot className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                  MINORITY AI CONSULTANT
                  <span className="text-[9px] bg-cyan-950 text-cyan-300 px-1 rounded border border-cyan-700/50">
                    Live
                  </span>
                </h4>
                <p className="text-[10px] text-slate-400">
                  Hardware Specialist • 28-QC Expert
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                title="Reset Chat"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onToggle}
                className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                title="Tutup Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-700/60 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3" />
                  </div>
                )}

                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                  msg.role === 'user'
                    ? 'bg-cyan-600 text-white rounded-br-none shadow-md shadow-cyan-950'
                    : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-bl-none shadow-sm'
                }`}>
                  <div className="leading-relaxed whitespace-pre-line font-sans">
                    {msg.content}
                  </div>

                  {/* If message has embedded product recommendations */}
                  {msg.recommendedProductIds && msg.recommendedProductIds.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800 space-y-2">
                      <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                        Rekomendasi Terkait:
                      </div>
                      {msg.recommendedProductIds.map((pid) => {
                        const prod = getProduct(pid);
                        if (!prod) return null;

                        return (
                          <div
                            key={pid}
                            className="p-2 rounded-xl bg-black/60 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <img src={prod.heroImage} alt="" className="w-9 h-9 rounded-lg object-cover shrink-0" />
                              <div className="truncate">
                                <div className="text-[11px] font-bold text-white truncate">{prod.title}</div>
                                <div className="text-[10px] text-cyan-400 font-mono font-semibold">
                                  Rp {prod.price.toLocaleString('id-ID')} • Batre {prod.batteryHealth}%
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                onSelectProduct(prod);
                              }}
                              className="px-2 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-bold shrink-0 transition-colors"
                            >
                              Detail
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className={`text-[9px] mt-1 text-right ${
                    msg.role === 'user' ? 'text-cyan-200/80' : 'text-slate-500'
                  }`}>
                    {msg.timestamp}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                    <User className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 items-center text-xs text-slate-400">
                <div className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-700/60 flex items-center justify-center text-cyan-400">
                  <Loader2 className="w-3 h-3 animate-spin" />
                </div>
                <div className="bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-slate-400 ml-1">AI sedang menganalisis katalog...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 bg-slate-950 border-t border-slate-850 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(q)}
                disabled={loading}
                className="text-[10px] px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-800 whitespace-nowrap transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-slate-900/90 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Tanyakan spesifikasi laptop, rekomendasi..."
                className="flex-1 py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                disabled={loading || !inputValue.trim()}
                className="p-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
