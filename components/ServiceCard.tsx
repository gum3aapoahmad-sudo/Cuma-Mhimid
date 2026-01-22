
import React, { useRef, useState } from 'react';
import { Service } from '../types';

interface Props {
  service: Service;
  theme?: 'dark' | 'light';
  onViewReviews?: (service: Service) => void;
  onConsultAI?: (service: Service) => void;
}

const ServiceCard: React.FC<Props> = ({ service, theme, onViewReviews, onConsultAI }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [opacity, setOpacity] = useState(0);

  const averageRating = service.reviews && service.reviews.length > 0
    ? (service.reviews.reduce((acc, curr) => acc + curr.rating, 0) / service.reviews.length).toFixed(1)
    : 'New';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (max 10 degrees)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    // Calculate glow position
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;

    setRotation({ x: rotateX, y: rotateY });
    setGlowPos({ x: glowX, y: glowY });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setOpacity(0);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onViewReviews?.(service)}
      // Optimization: Added will-change-transform for smoother 3D effect
      className={`group relative flex flex-col h-full rounded-[2.5rem] p-8 md:p-10 transition-all duration-200 ease-out border cursor-pointer will-change-transform ${theme === 'light' ? 'bg-white/60 border-white/40 shadow-xl' : 'bg-white/5 border-white/10 shadow-2xl'} backdrop-blur-2xl`}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Dynamic Glare Effect */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none rounded-[2.5rem] transition-opacity duration-300 mix-blend-overlay"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.3), transparent 60%)`,
          opacity: opacity
        }}
      />

      {/* Static Decorative Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl -z-10 group-hover:bg-amber-500/20 transition-colors rounded-full transform translate-x-10 -translate-y-10"></div>
      
      {/* Content Container (Pushed forward in Z-space) */}
      <div style={{ transform: 'translateZ(20px)' }} className="flex flex-col h-full relative z-10">
        
        <div className="text-6xl mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 origin-right drop-shadow-lg">
          {service.icon}
        </div>
        
        <div className="flex justify-between items-start mb-6">
          <h3 className={`text-2xl font-black ${theme === 'light' ? 'text-neutral-900' : 'text-white'} group-hover:text-amber-500 transition-colors`}>
            {service.title}
          </h3>
          {service.badge && (
            <span className="bg-amber-500/20 text-amber-600 text-[10px] font-black px-3 py-1 rounded-full border border-amber-500/30 uppercase tracking-tighter backdrop-blur-sm">
              {service.badge}
            </span>
          )}
        </div>

        {/* Rating Section */}
        <div className="flex items-center gap-2 mb-6 group/rating w-fit">
          <div className="flex text-amber-500 filter drop-shadow-sm">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          </div>
          <span className={`text-sm font-bold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} group-hover/rating:text-amber-500 transition-colors`}>
            {averageRating} 
            <span className="text-xs font-normal text-gray-500 mx-1">({service.reviews?.length || 0} تقييم)</span>
          </span>
        </div>
        
        <p className={`${theme === 'light' ? 'text-gray-700 font-medium' : 'text-gray-400'} mb-10 flex-grow leading-relaxed text-lg`}>
          {service.description}
        </p>
        
        <div className={`mt-auto pt-8 border-t ${theme === 'light' ? 'border-black/5' : 'border-white/5'} flex justify-between items-center`}>
          <div>
            <span className={`block text-xs font-bold uppercase mb-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>يبدأ من</span>
            <span className="text-3xl font-black text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.3)] transition-transform duration-300 group-hover:scale-110 inline-block origin-right">
              {service.price}
            </span>
          </div>
          <div className="flex gap-2">
             {/* New AI Consult Button */}
             <button
              className={`w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-indigo-500/40 hover:scale-105 backdrop-blur-sm relative overflow-hidden`}
              title="استشارة الذكاء الاصطناعي حول هذه الخدمة"
              onClick={(e) => {
                e.stopPropagation();
                onConsultAI?.(service);
              }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
            </button>

            <button
              className={`w-14 h-14 ${theme === 'light' ? 'bg-white/50 text-neutral-900 border-white/50' : 'bg-white/5 text-white border-white/10'} border hover:bg-amber-500 hover:text-black rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg group-hover:shadow-amber-500/20 backdrop-blur-sm`}
              title="مشاهدة التفاصيل والتقييمات"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
            </button>
            <a 
              href={`https://wa.me/905348292352?text=أريد طلب خدمة: ${service.title}`}
              className={`w-14 h-14 ${theme === 'light' ? 'bg-white/50 text-neutral-900 border-white/50' : 'bg-white/5 text-white border-white/10'} border hover:bg-amber-500 hover:text-black rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg group-hover:shadow-amber-500/20 backdrop-blur-sm`}
              title="طلب عبر واتساب"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
