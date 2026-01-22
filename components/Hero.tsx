
import React from 'react';

interface Props {
  theme?: 'dark' | 'light';
}

const Hero: React.FC<Props> = ({ theme }) => {
  return (
    <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden transition-colors duration-500 group bg-black">
      
      {/* 1. Static Video Background (No Autoplay) */}
      <div className="absolute inset-0 z-0">
        <video
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-105"
          style={{ filter: 'brightness(0.6) contrast(1.1) saturation(1.1)' }}
        >
          <source src="https://cdn.pixabay.com/video/2020/04/17/36465-412214476_large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/10 mix-blend-multiply"></div>
      </div>

      {/* Syrian Independence Flag Overlay - Static */}
      <div className="absolute inset-0 z-10 flex flex-col opacity-20 pointer-events-none mix-blend-overlay">
        <div className="h-1/3 w-full bg-[#007A3D]"></div>
        <div className="h-1/3 w-full bg-white flex items-center justify-center gap-16 md:gap-32">
            <span className="text-[#CE1126] text-4xl md:text-7xl">★</span>
            <span className="text-[#CE1126] text-4xl md:text-7xl">★</span>
            <span className="text-[#CE1126] text-4xl md:text-7xl">★</span>
        </div>
        <div className="h-1/3 w-full bg-black"></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] via-transparent to-black/40 z-20"></div>

      {/* 2. Text Content - No Entrance Animations */}
      <div className="max-w-7xl mx-auto text-center relative z-30 px-4 mt-16 md:mt-20">
        
        <div className="inline-flex items-center gap-3 px-4 md:px-6 py-2 mb-6 md:mb-8 rounded-full bg-black/40 border border-white/10 text-white text-[10px] md:text-sm font-black tracking-[0.2em] md:tracking-[0.3em] uppercase backdrop-blur-md shadow-xl">
          <span className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_#f59e0b]"></span>
          Damascus & Aleppo • العراقة
        </div>
        
        <h1 className="text-6xl md:text-9xl lg:text-[11rem] font-black mb-6 leading-[1.1] md:leading-[0.9] tracking-tighter">
          <span className="gold-text gold-glow block drop-shadow-[0_0_50px_rgba(251,191,36,0.3)]">تاريخ</span>
          <span className="text-white block mt-2 md:mt-4 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">يتجدد</span>
        </h1>
        
        <div className="drop-shadow-lg px-2">
          <p className="text-lg md:text-2xl text-gray-100 mb-2 leading-relaxed max-w-4xl mx-auto font-light">
             بإدارة <span className="text-amber-500 font-black text-xl md:text-3xl mx-1 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-amber-500/50">جمعة محيميد</span>
          </p>
          <p className="text-base md:text-xl text-gray-300 font-light tracking-wide">
            من عبق القصور الدمشقية إلى شموخ القلعة الحلبية، نصنع لك مستقبلاً رقمياً يليق بك.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 mt-10 pointer-events-auto w-full max-w-md sm:max-w-none mx-auto">
          <a 
            href="#services" 
            className="group relative w-full sm:w-auto px-8 md:px-14 py-4 md:py-6 bg-amber-500 hover:bg-amber-600 text-black font-black rounded-2xl text-lg md:text-xl transition-all shadow-[0_0_40px_rgba(245,158,11,0.3)] hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4 border border-amber-400/20"
          >
            <span className="relative z-10">تصفح الخدمات (19+)</span>
            <svg className="w-6 h-6 md:w-7 md:h-7 transform rotate-180 group-hover:translate-x-[-6px] transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </a>
          
          <a 
            href="https://wa.me/905348292352"
            target="_blank"
            className="group w-full sm:w-auto px-8 md:px-12 py-4 md:py-6 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-2xl text-lg md:text-xl font-black transition-all backdrop-blur-md flex items-center justify-center gap-4 hover:-translate-y-1 active:scale-95 hover:border-amber-500/50"
          >
            <span>تواصل معنا</span>
            <span className="text-amber-500 group-hover:scale-125 transition-transform">✨</span>
          </a>
        </div>
      </div>

      <style>{`
        .vertical-lr {
          writing-mode: vertical-lr;
        }
      `}</style>
    </section>
  );
};

export default Hero;
