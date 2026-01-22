
import React, { useState } from 'react';

interface Props {
  theme?: 'dark' | 'light';
}

const Footer: React.FC<Props> = ({ theme }) => {
  const [copied, setCopied] = useState(false);
  const shamCashId = "5700883ba54c1ab80c6b78530e9a3646";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shamCashId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className={`${theme === 'light' ? 'bg-gray-900' : 'bg-neutral-900'} pt-20 pb-10 px-4 border-t border-white/5 transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <h4 className="text-2xl font-black gold-text mb-6">حلبي للخدمات</h4>
            <p className="text-gray-400 leading-relaxed">
              نحن نقدم حلولاً رقمية مبتكرة تجمع بين الخبرة المحلية والجودة العالمية. التزامنا هو تقديم الأفضل دائماً تحت إشراف المبدع جمعة محيميد.
            </p>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">الدفع المعتمد</h4>
            <div className="bg-neutral-800 p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 blur-2xl group-hover:bg-amber-500/10 transition-all"></div>
              
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl">💳</span>
                <span className="text-xl font-black text-white">شام كاش - Sham Cash</span>
              </div>
              
              <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest mb-2">رقم الحساب للدفع المباشر:</p>
              
              <div 
                onClick={copyToClipboard}
                className="bg-black/60 p-4 rounded-2xl border border-white/10 font-mono text-[10px] break-all mb-4 text-center cursor-pointer hover:border-amber-500/50 transition-all relative group/copy text-white"
              >
                {shamCashId}
                <div className="absolute inset-0 flex items-center justify-center bg-amber-500 text-black font-black opacity-0 group-hover/copy:opacity-100 transition-opacity rounded-2xl">
                  {copied ? 'تم النسخ بنجاح! ✓' : 'اضغط لنسخ الحساب'}
                </div>
              </div>
              
              <p className="text-xs text-gray-500 leading-relaxed">
                نعتمد خدمة "شام كاش" لتسهيل التعاملات المالية الموثوقة والآمنة لعملائنا داخل سوريا.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 text-white">معلومات التواصل</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <span className="font-bold">+905348292352 (جمعة)</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <span className="font-bold">Gum3aapoahmad@gmail.com</span>
              </li>
              <li className="flex gap-4 mt-8">
                <a href="https://instagram.com/j_x_003" target="_blank" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white transition-all transform hover:-translate-y-1 shadow-xl text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://tiktok.com/@halabi_4_4" target="_blank" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-black hover:text-white border border-transparent hover:border-white/20 transition-all transform hover:-translate-y-1 shadow-xl text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.53.68V5.4c.2.46.71.81 1.21.9 1.49.26 2.85-.3 3.41-1.55.47-.97.31-2.04-.31-2.91C16.2.82 15.12.35 13.9.31c-.13-.01-.26 0-.41.01-.13.01-.26.04-.41.06-.11.02-.23.05-.34.09l-.21.05V.68zM22.42 6.02v4.71c-1.39-.24-2.58-.8-3.43-1.69-.85-.89-1.39-2.03-1.61-3.34h-.01c-.13-.81-.13-1.64 0-2.45h4.72c.21.81.21 1.64 0 2.45v.32zm-9.89 0v11.38c0 3.19-2.59 5.77-5.77 5.77S1 20.59 1 17.4s2.59-5.77 5.77-5.77c.48 0 .94.06 1.38.17v4.8c-.4-.11-.83-.17-1.27-.17-2.14 0-3.88 1.74-3.88 3.88s1.74 3.88 3.88 3.88 3.88-1.74 3.88-3.88v-4.8h.01V6.02h4.71z"/></svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} حلبي للخدمات. جميع الحقوق محفوظة لجمعة محيميد.</p>
          <p className="mt-2 text-xs text-amber-500/50">بني بأحدث تقنيات الذكاء الاصطناعي - دمشق/حلب</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
