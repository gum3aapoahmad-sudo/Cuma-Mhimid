
import React, { useState } from 'react';

interface Props {
  theme?: 'dark' | 'light';
}

const VIPConcierge: React.FC<Props> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[80] group"
      >
        <div className="relative">
           <div className="absolute inset-0 bg-amber-500 blur-xl opacity-40 group-hover:opacity-60 animate-pulse"></div>
           <div className={`relative px-6 py-4 bg-[#0a0a0a] border border-amber-500/30 rounded-2xl flex items-center gap-3 shadow-2xl transition-transform transform group-hover:-translate-y-1 group-hover:scale-105`}>
             <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-black shadow-lg">
               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
             </div>
             <div className="text-right hidden md:block">
               <span className="block text-[10px] text-amber-500 font-black uppercase tracking-widest">VIP Concierge</span>
               <span className="block text-white font-bold text-sm">مستشارك الخاص</span>
             </div>
           </div>
        </div>
      </button>

      {/* Elegant Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-end md:justify-center p-4 md:p-0">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="relative w-full max-w-sm md:fixed md:bottom-28 md:right-10 bg-[#111] border border-amber-500/20 rounded-[2rem] shadow-[0_0_50px_-10px_rgba(251,191,36,0.3)] p-8 overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
            {/* Background Texture */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[50px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center text-black mb-6 shadow-lg shadow-amber-500/20">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
              </div>

              <h3 className="text-2xl font-black text-white mb-2">خدمة النخبة</h3>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                هل ترغب في تفصيل حل رقمي لعلامتك التجارية؟ نحن هنا لنقدم لك تجربة "Haute Couture" فريدة.
              </p>

              <div className="space-y-3">
                <a 
                  href="https://wa.me/905348292352?text=أهلاً، أرغب في حجز استشارة VIP لمشروعي."
                  className="block w-full py-4 bg-amber-500 hover:bg-amber-600 text-black font-black rounded-xl transition-all shadow-lg shadow-amber-500/20"
                >
                  تحدث مع جمعة مباشرة
                </a>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-4 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white font-bold rounded-xl transition-all"
                >
                  ربما لاحقاً
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VIPConcierge;
