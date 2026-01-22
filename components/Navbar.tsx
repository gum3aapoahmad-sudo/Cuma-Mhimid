
import React, { useState } from 'react';

interface Props {
  theme?: 'dark' | 'light';
  toggleTheme?: () => void;
  onOpenAddService?: () => void;
}

const Navbar: React.FC<Props> = ({ theme, toggleTheme, onOpenAddService }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#hero', label: 'الرئيسية' },
    { href: '#services', label: 'الخدمات' },
    { href: '#portfolio', label: 'الأعمال' },
    { href: '#video-gallery', label: 'فيديو' },
    { href: '#contact', label: 'اتصل بنا' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 ${theme === 'light' ? 'bg-white/90 shadow-sm' : 'bg-black/90'} backdrop-blur-md border-b ${theme === 'light' ? 'border-black/5' : 'border-white/10'} transition-all duration-500`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <span className="text-xl md:text-2xl font-black gold-text truncate">حلبي للخدمات</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex space-x-8 space-x-reverse">
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className={`hover:text-amber-500 transition-colors font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all ${theme === 'light' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-white/5 text-amber-400 hover:bg-white/10'}`}
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              )}
            </button>
            
            {/* Enhanced prominent Add Service Button */}
            <button
              onClick={onOpenAddService}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black px-5 md:px-6 py-2.5 rounded-full text-xs md:text-sm font-black transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.5)] border-2 border-amber-300 ring-2 ring-transparent hover:ring-amber-500/50"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              <span>أضف خدمتك</span>
            </button>

            <a 
              href="https://wa.me/905348292352" 
              className="bg-green-600 hover:bg-green-700 text-white px-3 md:px-5 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all transform hover:scale-105 shadow-lg whitespace-nowrap"
            >
              اطلب الآن
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-16 left-0 w-full transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} ${theme === 'light' ? 'bg-white shadow-xl' : 'bg-black/95 backdrop-blur-xl border-b border-white/10'}`}
      >
        <div className="px-4 py-6 space-y-4 flex flex-col items-center">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block w-full text-center py-3 rounded-xl font-bold transition-all ${theme === 'light' ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              onOpenAddService?.();
              setIsMobileMenuOpen(false);
            }}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2"
          >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
             أضف خدمتك
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
