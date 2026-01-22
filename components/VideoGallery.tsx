
import React, { useState, useEffect, useRef } from 'react';
import { VIDEO_ITEMS } from '../constants';
import { VideoItem } from '../types';

interface Props {
  theme?: 'dark' | 'light';
}

const VideoGallery: React.FC<Props> = ({ theme }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [quality, setQuality] = useState<'720p' | '1080p'>('1080p');
  const [isAmbientOn, setIsAmbientOn] = useState(true);
  
  // Refs to manage multiple videos safely
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const mainVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
      setHasError(false);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedVideo]);

  const handleLoadedMetadata = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleMouseEnter = (itemId: number) => {
    const video = videoRefs.current[itemId];
    if (video) {
      video.play().catch(error => {
        // Autoplay prevented or aborted, safe to ignore for hover preview
        console.debug("Hover play prevented:", error);
      });
    }
  };

  const handleMouseLeave = (itemId: number) => {
    const video = videoRefs.current[itemId];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const switchQuality = (newQuality: '720p' | '1080p') => {
    if (newQuality === quality) return;
    setIsLoading(true);
    const currentTime = mainVideoRef.current?.currentTime || 0;
    setQuality(newQuality);
    
    // Simulate quality switch delay
    setTimeout(() => {
      if (mainVideoRef.current) {
        mainVideoRef.current.currentTime = currentTime;
        mainVideoRef.current.play().catch(() => {});
      }
      setIsLoading(false);
    }, 400);
  };

  return (
    <section id="video-gallery" className={`py-20 md:py-40 px-4 scroll-mt-24 ${theme === 'light' ? 'bg-gray-50' : 'bg-[#050505]'} relative overflow-hidden transition-colors duration-500`}>
      {/* Cinematic Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-700/5 blur-[120px] rounded-full -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
          <div className="max-w-3xl text-right md:text-right">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-amber-500"></div>
              <span className="text-amber-500 font-black text-xs md:text-sm uppercase tracking-[0.4em] block">COMMERCIAL MASTERPIECES</span>
            </div>
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 gold-text leading-tight md:leading-[0.9]">
              إعلاناتك التجارية<br/>بمعايير عالمية
            </h2>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-lg md:text-2xl font-light leading-relaxed`}>
              حوّل منتجك إلى قصة ملهمة تجذب العملاء. ننتج إعلانات تجارية سينمائية تضاعف مبيعاتك وترسخ علامتك التجارية في الأذهان.
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end gap-3">
            <div className={`flex items-center gap-6 ${theme === 'light' ? 'bg-white/80 border-black/5' : 'bg-white/5 border-white/10'} border px-8 py-4 rounded-[2rem] backdrop-blur-2xl shadow-2xl`}>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-amber-500 font-black uppercase tracking-widest mb-1">PRO ADVERTISING</span>
                <span className={`text-sm font-bold ${theme === 'light' ? 'text-black' : 'text-white'}`}>HIGH CONVERSION RATES</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-black">
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21 7L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.59L21 7Z"/></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-8 [perspective:2000px]">
          {VIDEO_ITEMS.map((item) => (
            <div 
              key={item.id}
              className={`group relative ${theme === 'light' ? 'bg-white border-black/5' : 'bg-neutral-900 border-white/5'} rounded-[2rem] md:rounded-[3rem] overflow-hidden border cursor-pointer shadow-3xl transition-all duration-1000 hover:border-amber-500/60 hover:-translate-y-6 hover:rotate-x-2 active:scale-95 hover:shadow-[0_40px_100px_rgba(251,191,36,0.2)]`}
              onClick={() => setSelectedVideo(item)}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={() => handleMouseLeave(item.id)}
            >
              <div className="aspect-[4/3] md:aspect-video relative overflow-hidden bg-black">
                {/* Fallback Image */}
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-125 opacity-70 group-hover:opacity-0 absolute inset-0 z-10"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/10 to-transparent -translate-x-full group-hover:animate-[shine_2s_ease-in-out_infinite] pointer-events-none z-20"></div>
                
                {/* Video Element for Preview */}
                <video 
                  ref={(el) => { videoRefs.current[item.id] = el }}
                  src={item.videoUrl}
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                />
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-amber-500 rounded-full flex items-center justify-center text-black shadow-[0_0_50px_#f59e0b] transform scale-50 group-hover:scale-100 group-hover:rotate-[360deg] transition-all duration-[800ms] cubic-bezier(0.34, 1.56, 0.64, 1) opacity-0 group-hover:opacity-100 relative">
                    <div className="absolute inset-0 bg-amber-500 rounded-full animate-ping opacity-30"></div>
                    <svg className="w-8 h-8 md:w-10 md:h-10 translate-x-1 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-30">
                   <div className="bg-black/60 backdrop-blur-xl px-4 py-2 md:px-5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest border border-white/20 text-amber-500 shadow-2xl group-hover:border-amber-500/50 transition-colors">
                    {item.category}
                  </div>
                </div>
                
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center z-30">
                   <div className="bg-black/60 backdrop-blur-xl px-3 py-2 md:px-4 rounded-xl border border-white/10 text-[10px] md:text-xs font-black text-gray-200 flex items-center gap-2 shadow-2xl group-hover:text-amber-400 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                      {item.views}
                   </div>
                   <div className="bg-amber-500 text-black px-3 py-1.5 rounded-xl text-xs font-black shadow-2xl ring-4 ring-black/50">
                    {item.duration}
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 relative">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/10 group-hover:to-transparent transition-all duration-1000 pointer-events-none"></div>
                <h3 className={`text-xl md:text-2xl font-black ${theme === 'light' ? 'text-black' : 'text-white'} group-hover:text-amber-400 group-hover:-translate-y-2 transition-all duration-700 leading-tight`}>{item.title}</h3>
                
                {item.id === 0 ? (
                  <div className="mt-4 inline-block bg-amber-500/10 text-amber-500 px-3 py-1 rounded-lg text-xs font-bold border border-amber-500/20 animate-pulse">
                    🔥 فيديو مميز
                  </div>
                ) : (
                  <div className="mt-6 flex items-center gap-3 text-gray-500 text-sm font-black">
                     <span className="group-hover:text-amber-500 transition-colors uppercase tracking-widest">شاهد الإعلان</span>
                     <svg className="w-5 h-5 transform rotate-180 group-hover:translate-x-[-8px] group-hover:text-amber-500 transition-all duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                )}
              </div>

              <div className="absolute bottom-0 left-0 w-full h-[4px] bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-center shadow-[0_0_25px_#f59e0b]"></div>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-0 md:p-10">
          <div 
            className="absolute inset-0 bg-black/98 md:backdrop-blur-[100px] transition-opacity animate-in fade-in duration-700"
            onClick={() => setSelectedVideo(null)}
          ></div>
          
          <div className="relative w-full h-full md:h-auto md:max-w-7xl md:aspect-video md:rounded-[4rem] overflow-hidden bg-black shadow-[0_0_200px_-50px_rgba(251,191,36,0.5)] animate-in md:zoom-in-95 duration-700 border-0 md:border md:border-white/10 group/modal">
            
            {/* Ambient Glow Effect */}
            {isAmbientOn && !isLoading && !hasError && (
              <div className="absolute -inset-20 bg-amber-500/10 blur-[150px] opacity-40 animate-pulse pointer-events-none -z-10"></div>
            )}

            <div className="absolute top-6 left-4 right-4 md:top-10 md:left-10 md:right-10 z-50 flex items-center justify-between">
                <button 
                  onClick={() => setSelectedVideo(null)}
                  className="w-12 h-12 md:w-16 md:h-16 bg-black/50 hover:bg-amber-500 hover:text-black border border-white/20 rounded-full flex items-center justify-center text-white transition-all active:scale-90 backdrop-blur-3xl shadow-2xl"
                >
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                <div className="flex gap-2 md:gap-4 bg-black/50 backdrop-blur-3xl p-2 rounded-3xl border border-white/10 shadow-2xl">
                  <button 
                    onClick={() => setIsAmbientOn(!isAmbientOn)}
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-2xl flex items-center justify-center transition-all ${isAmbientOn ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white bg-white/5'}`}
                    title="الوضع السينمائي"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-12c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/></svg>
                  </button>
                  <div className="w-[1px] h-8 md:h-10 bg-white/10"></div>
                  <button 
                    onClick={() => switchQuality('1080p')}
                    className={`px-3 md:px-6 py-1 md:py-2 rounded-2xl text-xs md:text-sm font-black transition-all ${quality === '1080p' ? 'bg-amber-500 text-black shadow-xl shadow-amber-500/20' : 'text-gray-400 hover:text-white bg-white/5'}`}
                  >
                    1080p
                  </button>
                  <button 
                    onClick={() => switchQuality('720p')}
                    className={`px-3 md:px-6 py-1 md:py-2 rounded-2xl text-xs md:text-sm font-black transition-all ${quality === '720p' ? 'bg-amber-500 text-black shadow-xl shadow-amber-500/20' : 'text-gray-400 hover:text-white bg-white/5'}`}
                  >
                    720p
                  </button>
                </div>
            </div>

            {isLoading && !hasError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/90 backdrop-blur-3xl">
                <div className="relative mb-10">
                  <div className="w-24 h-24 md:w-32 md:h-32 border-8 border-amber-500/10 rounded-full"></div>
                  <div className="absolute top-0 w-24 h-24 md:w-32 md:h-32 border-8 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-amber-500 font-black text-xl md:text-3xl tracking-[0.2em] animate-pulse uppercase text-center px-4">
                  جاري تحضير العرض بدقة {quality}...
                </p>
                <div className="mt-8 text-gray-600 font-bold text-xs tracking-widest uppercase">Halabi Cinematic Engine</div>
              </div>
            )}

            {hasError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/90 backdrop-blur-3xl">
                <p className="text-red-500 font-bold text-xl mb-4">عذراً، تعذر تحميل الفيديو.</p>
                <button 
                  onClick={() => {
                    setIsLoading(true);
                    setHasError(false);
                    if(mainVideoRef.current) mainVideoRef.current.load();
                  }}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white"
                >
                  إعادة المحاولة
                </button>
              </div>
            )}

            <video 
              ref={mainVideoRef}
              autoPlay 
              playsInline
              controls 
              preload="auto"
              onLoadedMetadata={handleLoadedMetadata}
              onError={handleVideoError}
              className={`w-full h-full object-contain transition-all duration-1000 ${isLoading ? 'opacity-0 scale-90 blur-3xl' : 'opacity-100 scale-100 blur-0'}`}
              src={selectedVideo.videoUrl}
            ></video>

            {!isLoading && !hasError && (
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16 bg-gradient-to-t from-black via-black/90 to-transparent opacity-100 md:opacity-0 group-hover/modal:opacity-100 transition-all duration-700 pointer-events-none">
                 <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12">
                   <div className="pointer-events-auto text-right md:text-right">
                      <div className="flex items-center gap-4 md:gap-6 mb-2 md:mb-4">
                        <span className="text-amber-500 text-[10px] md:text-lg font-black uppercase tracking-[0.3em] block">{selectedVideo.category}</span>
                        <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-gray-600 rounded-full"></div>
                        <span className="text-gray-400 text-[10px] md:text-lg font-bold flex items-center gap-2 md:gap-3">
                           <svg className="w-3 h-3 md:w-5 md:h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.523 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>
                           {selectedVideo.views} مشاهدة
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-7xl font-black text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] leading-tight">{selectedVideo.title}</h3>
                   </div>
                   <div className="pointer-events-auto flex gap-4">
                    <a 
                      href={`https://wa.me/905348292352?text=أعجبني هذا الإعلان (${selectedVideo.title}) وأريد طلب فيديو مشابه لعملي`}
                      className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-black px-6 md:px-16 py-4 md:py-8 rounded-[2rem] md:rounded-[2.5rem] font-black text-lg md:text-3xl transition-all shadow-3xl flex items-center justify-center gap-4 md:gap-6 active:scale-95 group/btn-modal"
                    >
                      <span className="whitespace-nowrap">اصنع إعلانك الآن</span>
                      <svg className="w-6 h-6 md:w-8 md:h-8 transform group-hover/btn-modal:translate-x-[-8px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </a>
                   </div>
                 </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes shine {
          0% { transform: translateX(-150%) skewX(-25deg); opacity: 0; }
          30% { opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateX(250%) skewX(-25deg); opacity: 0; }
        }
        .rotate-x-2:hover {
          transform: translateY(-20px) rotateX(6deg);
        }
      `}</style>
    </section>
  );
};

export default VideoGallery;
