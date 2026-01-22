
import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { chatWithGenie } from '../services/gemini';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export interface SmartAIChatRef {
  openChat: (context?: string) => void;
}

const SHAM_CASH_ID = "5700883ba54c1ab80c6b78530e9a3646";

const SmartAIChat = forwardRef<SmartAIChatRef, {}>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'أهلاً بك في حلبي للخدمات. أنا مساعدك الذكي، كيف يمكنني خدمتك اليوم؟ ✨' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Paywall States
  const [usageCount, setUsageCount] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const FREE_LIMIT = 2; // Increased slightly for better UX with context

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    openChat: (context?: string) => {
      setIsOpen(true);
      if (context) {
        setMessages(prev => [...prev, { role: 'ai', text: `💡 ${context}` }]);
      }
    }
  }));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Check Paywall
    if (usageCount >= FREE_LIMIT && !isPremium) {
       setMessages(prev => [...prev, { role: 'ai', text: '🔒 عذراً، لقد استنفذت رصيد الأسئلة المجانية.\n\nللاستمرار في استخدام "الذكاء الاصطناعي الفائق"، يرجى الاشتراك.' }]);
       return;
    }

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: m.text
    }));

    const response = await chatWithGenie(history, userMsg);
    
    setMessages(prev => [...prev, { role: 'ai', text: response || 'عذراً، حدث خطأ.' }]);
    setIsLoading(false);
    
    setUsageCount(prev => prev + 1);
  };

  const handleUnlock = () => {
    setIsPremium(true);
    setMessages(prev => [...prev, { role: 'ai', text: 'تم تفعيل الاشتراك بنجاح! 💎\nشكراً لثقتكم بحلبي للخدمات. يمكنك الآن سؤالي عن أي شيء بلا حدود.' }]);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 md:bottom-32 md:right-10 z-[80] group"
      >
        <div className="relative">
           <div className="absolute inset-0 bg-blue-500 blur-xl opacity-40 group-hover:opacity-60"></div>
           <div className={`relative w-14 h-14 bg-[#0a0a0a] border border-blue-500/30 rounded-full flex items-center justify-center shadow-2xl transition-transform transform group-hover:scale-110`}>
             <span className="text-2xl">🤖</span>
           </div>
           {!isOpen && (
             <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">1</div>
           )}
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-6 md:bottom-36 md:right-10 z-[90] w-[350px] md:w-[400px] h-[500px] bg-[#0f0f0f] border border-amber-500/20 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 font-sans">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center text-xl backdrop-blur-sm">🧠</div>
              <div>
                <h3 className="text-white font-black text-sm">المستشار الذكي</h3>
                <p className="text-black/60 text-[10px] font-bold flex items-center gap-1">
                   <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                   متصل الآن
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-black/50 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/40 scrollbar-thin scrollbar-thumb-amber-500/20">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user' 
                    ? 'bg-amber-500 text-black rounded-tr-none font-bold' 
                    : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Paywall Overlay */}
          {usageCount >= FREE_LIMIT && !isPremium && (
            <div className="absolute inset-0 top-[70px] bg-black/90 backdrop-blur-md z-10 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center text-4xl mb-4 border border-amber-500/50 shadow-[0_0_30px_#f59e0b]">
                🔒
              </div>
              <h3 className="text-white font-black text-xl mb-2">تفعيل الاشتراك الذكي</h3>
              <p className="text-gray-400 text-sm mb-6">
                لقد استنفذت فرصتك المجانية. <br/>
                لفتح المحادثة غير المحدودة مع الذكاء الاصطناعي، يرجى دفع <span className="text-amber-500 font-bold">2 دولار</span> (ما يعادلها) عبر شام كاش.
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 w-full mb-6">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">معرف شام كاش</p>
                <div className="text-amber-500 font-mono text-xs break-all select-all font-bold">
                  {SHAM_CASH_ID}
                </div>
              </div>

              <button 
                onClick={handleUnlock}
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95 mb-3"
              >
                لقد قمت بالدفع (تفعيل فوري)
              </button>
              <p className="text-[10px] text-gray-600">سيتم التحقق من العملية تلقائياً</p>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-[#0f0f0f] border-t border-white/5">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={usageCount >= FREE_LIMIT && !isPremium}
                placeholder={usageCount >= FREE_LIMIT && !isPremium ? "الخدمة مغلقة" : "اكتب سؤالك هنا..."}
                className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-amber-500 outline-none disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={(usageCount >= FREE_LIMIT && !isPremium) || !input.trim() || isLoading}
                className="w-12 h-12 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:bg-gray-700 text-black rounded-xl flex items-center justify-center transition-all"
              >
                <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              </button>
            </div>
          </div>

        </div>
      )}
    </>
  );
});

export default SmartAIChat;
