
import React, { useState, useRef, useEffect } from 'react';

interface Props {
  theme?: 'dark' | 'light';
}

const BeforeAfter: React.FC<Props> = ({ theme }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e as React.MouseEvent).clientX || (e as MouseEvent).clientX) - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent | TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e as React.TouchEvent).touches[0].clientX || (e as TouchEvent).touches[0].clientX) - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-amber-500 text-xs font-black uppercase tracking-[0.3em] mb-4 block">The Fitting Room</span>
        <h2 className={`text-4xl md:text-6xl font-black mb-6 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
          غرفة القياس <span className="gold-text">الرقمية</span>
        </h2>
        <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-xl max-w-2xl mx-auto`}>
          شاهد كيف نحول "الخام" إلى "تحفة فنية". حرك المؤشر لترى لمسة حلبي السحرية.
        </p>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full aspect-video md:aspect-[21/9] rounded-[2rem] overflow-hidden cursor-ew-resize select-none shadow-2xl border border-white/10 group"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Right Side / Background) - The "Edited" Version */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?auto=format&fit=crop&q=80&w=2000" 
            alt="After" 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-8 right-8 bg-amber-500 text-black px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest z-10 shadow-lg">
            بعد (Haute Couture)
          </div>
        </div>

        {/* Before Image (Left Side / Clipped) - The "Raw" Version */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%`, borderRight: '2px solid #f59e0b' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?auto=format&fit=crop&q=80&w=2000" 
            alt="Before" 
            className="w-full h-full object-cover max-w-none grayscale brightness-75 blur-[1px]" 
            style={{ width: containerRef.current?.offsetWidth || '100%' }} // Keep aspect ratio correct by forcing width
          />
          <div className="absolute top-8 left-8 bg-black/60 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-white/10 backdrop-blur-md">
            قبل (Raw Material)
          </div>
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.5)] z-20 flex items-center justify-center"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-xl transform transition-transform group-hover:scale-110">
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7h8M8 17h8M5 12h14"></path></svg>
          </div>
        </div>
        
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-6 py-2 rounded-full text-white text-xs font-bold border border-white/10 pointer-events-none">
           اسحب لرؤية الفرق
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
