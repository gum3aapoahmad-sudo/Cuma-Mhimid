
import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_ITEMS } from '../constants';
import { PortfolioItem } from '../types';
import { editImageWithAI } from '../services/gemini';

interface Props {
  theme?: 'dark' | 'light';
}

const FILTERS = [
  { id: 'all', label: 'الكل' },
  { id: 'web', label: 'ويب وتطبيقات' },
  { id: 'design', label: 'تصميم وفنون' },
  { id: 'media', label: 'ميديا وتسويق' },
];

interface TiltCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  theme?: 'dark' | 'light';
}

// --- High-End Tilt Card Component (Optimized for Performance) ---
const TiltCard: React.FC<TiltCardProps> = ({ 
  children, 
  onClick, 
  className,
  theme 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Physics Logic: Calculate rotation based on mouse position
    const rotateX = ((y - centerY) / centerY) * -10; 
    const rotateY = ((x - centerX) / centerX) * 10;

    // Direct DOM manipulation for performance
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    // Glare Logic
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;
    
    glowRef.current.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.4), transparent 60%)`;
    glowRef.current.style.opacity = '1';
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !glowRef.current) return;
    // Reset to flat state
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    glowRef.current.style.opacity = '0';
  };

  return (
    <div
      ref={cardRef}
      className={`${className} relative transition-transform duration-200 ease-out will-change-transform`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <div 
        ref={glowRef}
        className="absolute inset-0 z-20 pointer-events-none rounded-[2.5rem] transition-opacity duration-300 mix-blend-overlay opacity-0"
      />
      
      <div style={{ transform: 'translateZ(20px)' }} className="h-full flex flex-col relative z-10">
        {children}
      </div>
    </div>
  );
};

const Portfolio: React.FC<Props> = ({ theme }) => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editPrompt, setEditPrompt] = useState("");
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [activeFilter, setActiveFilter] = useState('all');

  const shareProject = (platform: string, item: PortfolioItem) => {
    const url = window.location.href;
    const text = `شاهد هذا العمل الفاخر من حلبي للخدمات: ${item.title}`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(`${text} ${url}`);
        alert('تم نسخ الرابط بنجاح! ✅');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
      setActiveImage(selectedItem.image);
      setEditedImage(null);
      setIsEditing(false);
      setEditPrompt("");
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedItem]);

  useEffect(() => {
    setVisibleCount(4);
  }, [activeFilter]);

  const handleAiEdit = async () => {
    if (!editPrompt || isGenerating || !activeImage) return;
    setIsGenerating(true);
    try {
      const response = await fetch(activeImage);
      const blob = await response.blob();
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        const result = await editImageWithAI(base64Data, blob.type, editPrompt);
        if (result) {
          setEditedImage(result);
        } else {
          alert("عذراً، لم نتمكن من تعديل الصورة حالياً.");
        }
        setIsGenerating(false);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Edit error:", error);
      setIsGenerating(false);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, filteredItems.length));
  };

  const filteredItems = PORTFOLIO_ITEMS.filter(item => {
    if (activeFilter === 'all') return true;
    const cat = item.category;
    if (activeFilter === 'web') return cat.includes('ويب') || cat.includes('تطبيقات') || cat.includes('برمجة');
    if (activeFilter === 'design') return cat.includes('تصميم') || cat.includes('هوية') || cat.includes('فاشن');
    if (activeFilter === 'media') return cat.includes('تسويق') || cat.includes('ميديا') || cat.includes('فيديو') || cat.includes('مونتاج') || cat.includes('سوشيال');
    return false;
  });

  const displayedItems = filteredItems.slice(0, visibleCount);

  return (
    <section id="portfolio" className={`py-32 px-4 scroll-mt-24 ${theme === 'light' ? 'bg-gray-100' : 'bg-[#050505]'} relative transition-colors duration-500 overflow-hidden`}>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-black mb-6 gold-text">معرض الأعمال</h2>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-lg`}>
              نقدم لكم نخبة من أعمالنا التي تجمع بين الفخامة والاحترافية. كل مشروع هو قصة نجاح صيغت بدقة متناهية.
            </p>
          </div>
          <div className="flex gap-4">
             <div className="bg-amber-500/10 border border-amber-500/20 px-6 py-3 rounded-xl text-amber-500 font-bold backdrop-blur-sm uppercase tracking-wider">
               Elite Portfolio ✓
             </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-2xl font-bold transition-all text-sm md:text-base ${
                activeFilter === filter.id 
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 scale-105' 
                  : `${theme === 'light' ? 'bg-white text-gray-500 hover:text-black border-gray-200' : 'bg-white/5 text-gray-400 hover:text-white border-white/5'} border hover:bg-white/10`
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 min-h-[400px]">
          {displayedItems.length > 0 ? (
            displayedItems.map((item) => (
              <TiltCard
                key={item.id} 
                theme={theme}
                className={`group cursor-pointer rounded-[2.5rem] border ${theme === 'light' ? 'bg-white/60 border-white/40 shadow-xl' : 'bg-white/5 border-white/10 shadow-2xl'} backdrop-blur-2xl`}
                onClick={() => setSelectedItem(item)}
              >
                <div className="aspect-[3/4] overflow-hidden rounded-[2rem] m-2 relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-all duration-500"></div>
                  
                  <div className="absolute top-4 right-4 translate-x-10 group-hover:translate-x-0 transition-transform duration-300 delay-75 ease-out">
                     <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-amber-500 hover:text-black transition-colors">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
                     </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]"></span>
                    <span className="text-amber-500 text-[10px] font-black uppercase tracking-widest">{item.category}</span>
                  </div>
                  <h3 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-2 leading-tight`}>{item.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {item.description || 'عمل احترافي يجسد رؤية العميل بأعلى معايير الجودة.'}
                  </p>
                  
                  <div className="flex items-center justify-between mt-4 border-t border-white/10 pt-4 opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className={`text-xs font-bold ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>مشاهدة التفاصيل</span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-colors">
                      <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center text-center py-20 text-gray-500">
              <div className="text-4xl mb-4 opacity-50">🔍</div>
              <p>لا توجد مشاريع في هذا التصنيف حالياً.</p>
            </div>
          )}
        </div>

        {visibleCount < filteredItems.length && (
          <div className="mt-12 flex justify-center">
            <button 
              onClick={handleLoadMore}
              className={`px-8 py-4 rounded-2xl font-bold border-2 transition-all flex items-center gap-3 group ${theme === 'light' ? 'border-neutral-200 hover:border-amber-500 text-neutral-800 hover:text-amber-500 bg-white' : 'border-white/10 hover:border-amber-500 text-white hover:text-amber-500 bg-white/5'}`}
            >
              <span>عرض المزيد من الأعمال</span>
              <svg className="w-5 h-5 transform group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
        )}

        <div className="mt-20 text-center">
          <p className={`${theme === 'light' ? 'text-gray-500' : 'text-gray-500'} mb-6 italic`}>هل تبحث عن التميز؟ نحن نصنع الفارق.</p>
          <a 
            href="https://wa.me/905348292352" 
            className={`inline-flex items-center gap-2 text-xl font-bold ${theme === 'light' ? 'text-neutral-900' : 'text-white'} hover:text-amber-500 transition-colors`}
          >
            <span>ابدأ مشروعك الفاخر الآن</span>
            <span className="text-2xl">🔥</span>
          </a>
        </div>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/95 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
            onClick={() => setSelectedItem(null)}
          ></div>
          
          <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto glass-card rounded-[3rem] shadow-[0_0_100px_rgba(251,191,36,0.1)] border border-white/10 animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 bg-[#0a0a0a]">
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 left-6 z-10 w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white transition-all hover:rotate-90 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12 space-y-6">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 bg-neutral-900 aspect-[3/4] group">
                  <img 
                    src={editedImage || activeImage || selectedItem.image} 
                    alt={selectedItem.title} 
                    className={`w-full h-full object-cover transition-opacity duration-500 ${isGenerating ? 'opacity-30' : 'opacity-100'}`} 
                  />
                  {isGenerating && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                      <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p className="text-amber-500 font-black animate-pulse">جاري إعادة التخيل بالذكاء الاصطناعي...</p>
                    </div>
                  )}
                  {editedImage && (
                    <button 
                      onClick={() => setEditedImage(null)}
                      className="absolute bottom-4 left-4 bg-black/60 hover:bg-amber-500 hover:text-black px-4 py-2 rounded-xl text-xs font-bold border border-white/10 transition-all"
                    >
                      عرض الأصل
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div 
                    onClick={() => { setActiveImage(selectedItem.image); setEditedImage(null); }}
                    className={`rounded-xl overflow-hidden aspect-square cursor-pointer border-2 transition-all ${activeImage === selectedItem.image ? 'border-amber-500 scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={selectedItem.image} alt="Original" className="w-full h-full object-cover" />
                  </div>
                  {selectedItem.moreImages?.map((img, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => { setActiveImage(img); setEditedImage(null); }}
                      className={`rounded-xl overflow-hidden aspect-square cursor-pointer border-2 transition-all ${activeImage === img ? 'border-amber-500 scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-8">
                  <span className="text-amber-500 text-sm font-black uppercase tracking-[0.2em] mb-4 block">{selectedItem.category}</span>
                  <h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-white">{selectedItem.title}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
                    {selectedItem.description || 'هذا العمل هو نتاج ساعات من التخطيط والتنفيذ الدقيق. نسعى دائماً لتقديم ما يفوق التوقعات، ودمج الفن بالتكنولوجيا لخلق تجربة بصرية لا تنسى.'}
                  </p>
                  <p className="text-gray-500 text-sm italic border-r-2 border-amber-500 pr-4">
                    "الجودة ليست فعلاً، بل هي عادة." - حلبي للخدمات
                  </p>
                </div>

                <div className="space-y-6">
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="w-full py-5 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-black border border-amber-500/20 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 shadow-xl group"
                    >
                      <span className="text-2xl group-hover:rotate-12 transition-transform">✨</span>
                      <span>تعديل هذه الصورة بالذكاء الاصطناعي</span>
                    </button>
                  ) : (
                    <div className="space-y-4 animate-in slide-in-from-top-4 duration-500">
                      <div className="relative">
                        <textarea 
                          placeholder="مثلاً: اجعل الألوان دافئة أكثر، أضف طيور في السماء، حول الجو إلى ليلي..."
                          value={editPrompt}
                          onChange={(e) => setEditPrompt(e.target.value)}
                          className="w-full bg-neutral-900 border border-white/10 rounded-2xl px-6 py-4 focus:border-amber-500 outline-none transition-all text-white font-bold h-32 resize-none"
                        ></textarea>
                        <div className="absolute bottom-4 left-4 text-[10px] text-gray-600 font-black uppercase tracking-widest">
                          Gemini 2.5 Flash Engine
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button 
                          onClick={handleAiEdit}
                          disabled={!editPrompt || isGenerating}
                          className="flex-grow py-4 bg-amber-500 hover:bg-amber-600 text-black rounded-2xl font-black transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
                        >
                          تعديل الآن
                        </button>
                        <button 
                          onClick={() => setIsEditing(false)}
                          className="px-6 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all border border-white/10"
                        >
                          إلغاء
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="pt-8 border-t border-white/5">
                    <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest flex items-center gap-2">
                       <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                       مشاركة الإبداع
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      <button onClick={() => shareProject('facebook', selectedItem)} className="flex-grow sm:flex-none flex items-center justify-center gap-3 px-6 py-4 bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border border-[#1877F2]/20 rounded-2xl font-bold transition-all"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg></button>
                      <button onClick={() => shareProject('twitter', selectedItem)} className="flex-grow sm:flex-none flex items-center justify-center gap-3 px-6 py-4 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2] text-[#1DA1F2] hover:text-white border border-[#1DA1F2]/20 rounded-2xl font-bold transition-all"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></button>
                      <button onClick={() => shareProject('copy', selectedItem)} className="flex-grow sm:flex-none flex items-center justify-center gap-3 px-6 py-4 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-black border border-amber-500/20 rounded-2xl font-bold transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 00-2 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg></button>
                    </div>
                  </div>

                  <div className="pt-8">
                    <a 
                      href={`https://wa.me/905348292352?text=أريد طلب عمل مشابه لـ: ${selectedItem.title}`}
                      className="w-full py-5 bg-white text-black text-center rounded-2xl font-black text-xl hover:bg-amber-500 transition-colors flex items-center justify-center gap-3 shadow-2xl"
                    >
                      <span>اطلب عمل مخصص الآن</span>
                      <span>✨</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
