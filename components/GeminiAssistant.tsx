import React, { useState, useEffect } from 'react';
import { generateMarketingIdea, generateAdImage, generateSpeech, getMarketTrends } from '../services/gemini';
import { SERVICES } from '../constants';
import { AdSuggestion, AdPlatform, AdTone } from '../types';

const PROCESSING_STEPS = [
  "تحليل اتجاهات السوق السوري...",
  "دراسة المنافسين والجمهور المستهدف...",
  "صياغة المحتوى الإبداعي...",
  "تحسين عبارات الحث على اتخاذ إجراء...",
  "تجهيز التقرير النهائي..."
];

interface Props {
  theme?: 'dark' | 'light';
}

const GeminiAssistant: React.FC<Props> = ({ theme }) => {
  const [loadingText, setLoadingText] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [loadingTrends, setLoadingTrends] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  const [businessName, setBusinessName] = useState("");
  const [selectedService, setSelectedService] = useState(SERVICES[0].title);
  const [platform, setPlatform] = useState<AdPlatform>('Story');
  const [tone, setTone] = useState<AdTone>('Luxurious');
  
  const [suggestion, setSuggestion] = useState<AdSuggestion | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [trends, setTrends] = useState<{ text: string, sources: string[] } | null>(null);

  useEffect(() => {
    let interval: any;
    if (loadingText) {
      interval = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % PROCESSING_STEPS.length);
      }, 1500);
    } else {
      setCurrentStep(0);
    }
    return () => clearInterval(interval);
  }, [loadingText]);

  const handleGenerateText = async () => {
    if (loadingText) return;
    setLoadingText(true);
    setGeneratedImageUrl(null);
    setSuggestion(null);
    try {
      const result = await generateMarketingIdea(
        selectedService, 
        businessName || "عميلنا المميز", 
        platform, 
        tone
      );
      setSuggestion(result);
    } catch (error) {
      console.error("Error generating text:", error);
    } finally {
      setLoadingText(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!suggestion || loadingImage) return;
    setLoadingImage(true);
    try {
      const imageUrl = await generateAdImage(selectedService, suggestion.headline, tone);
      setGeneratedImageUrl(imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoadingImage(false);
    }
  };

  const handlePlayAudio = async () => {
    if (!suggestion || loadingAudio) return;
    setLoadingAudio(true);
    try {
      const textToSpeak = `${suggestion.headline}. ${suggestion.body}`;
      const base64Audio = await generateSpeech(textToSpeak);
      
      if (base64Audio) {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const binaryString = atob(base64Audio);
        const len = binaryString.length;
        // Ensure even byte length for Int16Array
        const bytes = new Uint8Array(len % 2 === 0 ? len : len + 1);
        for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);

        const dataInt16 = new Int16Array(bytes.buffer);
        const buffer = audioCtx.createBuffer(1, dataInt16.length, 24000);
        const channelData = buffer.getChannelData(0);
        for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;

        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.start();
      }
    } catch (error) {
      console.error("Error generating audio:", error);
    } finally {
      setLoadingAudio(false);
    }
  };

  const handleGetTrends = async () => {
    if (loadingTrends) return;
    setLoadingTrends(true);
    setTrends(null);
    try {
      // Extract category roughly from service name or just use service name
      const trendData = await getMarketTrends(selectedService);
      // @ts-ignore
      setTrends(trendData);
    } catch (error) {
      console.error("Trends error", error);
    } finally {
      setLoadingTrends(false);
    }
  };

  return (
    <div className={`${theme === 'light' ? 'bg-gray-50 border-black/5' : 'bg-[#0a0a0a] border-white/5'} rounded-[3rem] p-6 md:p-12 border max-w-6xl mx-auto my-20 shadow-3xl relative overflow-hidden group transition-colors duration-500`}>
      {/* Dynamic Background Glow */}
      <div className={`absolute -top-24 -right-24 w-96 h-96 blur-[120px] -z-10 transition-colors duration-1000 ${loadingText ? 'bg-amber-500/20' : 'bg-amber-500/5'}`}></div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
        <div className="flex items-center gap-6">
          <div className="bg-gradient-to-br from-amber-400 to-amber-700 w-20 h-20 rounded-3xl flex items-center justify-center text-black shadow-[0_10px_30px_-5px_rgba(251,191,36,0.5)]">
             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.183.244l-.28.19a2 2 0 00-.538 2.14l.89 2.111a2 2 0 001.59 1.232l2.631.328a2 2 0 001.258-.32l1.32-.82a2 2 0 011.586-.32l2.13.354a2 2 0 001.763-.448l1.77-1.475a2 2 0 00.542-2.14l-.89-2.111z"></path>
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 10a3 3 0 11-6 0 3 3 0 016 0z"></path>
             </svg>
          </div>
          <div className="text-right">
            <h3 className="text-4xl font-black gold-text">مختبر المحتوى الإبداعي</h3>
            <p className="text-gray-500 mt-2 text-lg">دع الذكاء الاصطناعي يخطط لحملتك القادمة</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
           <span className="bg-amber-500/10 text-amber-500 text-xs font-black px-5 py-2 rounded-full border border-amber-500/20 uppercase tracking-[0.2em]">ULTRA-PRO ENGINE v2</span>
           <span className="text-[10px] text-gray-600 mt-2 font-bold tracking-widest">GEMINI 3 PRO ACTIVATED</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Input Column 1: Business Info */}
        <div className="space-y-6">
          <label className="block">
            <span className="text-gray-400 text-sm font-bold block mb-3 mr-2">اسم المشروع / الشركة</span>
            <input 
              type="text" 
              placeholder="مثلاً: حلبي للأزياء"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className={`w-full ${theme === 'light' ? 'bg-white border-black/10 text-black' : 'bg-neutral-900/50 border-white/10 text-white'} border rounded-2xl px-6 py-4 focus:border-amber-500 outline-none transition-all placeholder:text-gray-500 font-bold`}
            />
          </label>
          <label className="block">
            <span className="text-gray-400 text-sm font-bold block mb-3 mr-2">نوع الخدمة</span>
            <select 
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className={`w-full ${theme === 'light' ? 'bg-white border-black/10 text-black' : 'bg-neutral-900 border-white/10 text-white'} border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-amber-500 outline-none appearance-none cursor-pointer font-bold`}
            >
              {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
            </select>
          </label>
          
          <button
             onClick={handleGetTrends}
             disabled={loadingTrends}
             className="w-full py-3 bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 border border-blue-500/30 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
          >
            {loadingTrends ? <span className="animate-spin">⌛</span> : <span>🌍</span>}
            تحليل اتجاهات السوق (Google Search)
          </button>
          
          {trends && (
            <div className={`p-4 rounded-xl border text-sm ${theme === 'light' ? 'bg-blue-50 border-blue-100 text-gray-700' : 'bg-blue-900/20 border-blue-500/20 text-gray-300'}`}>
               <p className="whitespace-pre-wrap mb-3 font-medium">{trends.text}</p>
               {trends.sources.length > 0 && (
                 <div className="border-t border-blue-500/20 pt-2 mt-2">
                   <p className="text-xs text-blue-400 mb-1 font-bold">المصادر:</p>
                   <ul className="list-disc list-inside text-xs truncate">
                     {trends.sources.map((src, idx) => (
                       <li key={idx}><a href={src} target="_blank" rel="noreferrer" className="hover:underline">{src}</a></li>
                     ))}
                   </ul>
                 </div>
               )}
            </div>
          )}
        </div>

        {/* Input Column 2: Strategy */}
        <div className="space-y-6">
          <div>
            <span className="text-gray-400 text-sm font-bold block mb-3 mr-2">المنصة المستهدفة</span>
            <div className="grid grid-cols-3 gap-3">
              {(['Story', 'Post', 'TikTok'] as AdPlatform[]).map(p => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`py-3 rounded-xl border font-bold transition-all text-sm ${platform === p ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/20' : `${theme === 'light' ? 'bg-white border-black/10 text-gray-600' : 'bg-neutral-900 border-white/5 text-gray-400'} hover:border-amber-500/50`}`}
                >
                  {p === 'Story' ? 'ستوري' : p === 'Post' ? 'بوست' : 'تيك توك'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-gray-400 text-sm font-bold block mb-3 mr-2">نبرة الخطاب</span>
            <div className="grid grid-cols-3 gap-3">
              {(['Luxurious', 'Youthful', 'Professional'] as AdTone[]).map(t => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`py-3 rounded-xl border font-bold transition-all text-sm ${tone === t ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/20' : `${theme === 'light' ? 'bg-white border-black/10 text-gray-600' : 'bg-neutral-900 border-white/5 text-gray-400'} hover:border-amber-500/50`}`}
                >
                  {t === 'Luxurious' ? 'فخم' : t === 'Youthful' ? 'شبابي' : 'رسمي'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Column */}
        <div className="flex flex-col justify-end">
          <button
            onClick={handleGenerateText}
            disabled={loadingText || loadingImage}
            className="w-full h-[72px] bg-amber-500 hover:bg-amber-600 text-black font-black rounded-2xl disabled:opacity-50 transition-all shadow-2xl shadow-amber-500/30 active:scale-95 flex items-center justify-center gap-4 text-xl group/btn"
          >
            {loadingText ? (
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                <span>جاري المعالجة...</span>
              </div>
            ) : (
              <>
                <span className="text-2xl transition-transform group-hover/btn:rotate-12">⚡</span>
                <span>توليد الخطة الإعلانية</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generation Process Visualizer */}
      {loadingText && (
        <div className="mb-12 animate-in fade-in duration-500">
           <div className="bg-black/50 border border-white/5 rounded-2xl p-6 font-mono text-xs">
              <div className="flex items-center gap-4 text-amber-500 mb-2">
                 <span className="animate-pulse">●</span>
                 <span className="uppercase tracking-widest font-black">AI Terminal Log</span>
              </div>
              <p className="text-gray-500">{">"} {PROCESSING_STEPS[currentStep]}</p>
              <div className="w-full bg-white/5 h-1 mt-4 rounded-full overflow-hidden">
                 <div className="h-full bg-amber-500 animate-[loading_1.5s_infinite] w-1/3"></div>
              </div>
           </div>
        </div>
      )}

      {/* Results Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {suggestion && (
          <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-8 duration-1000">
            <div className={`${theme === 'light' ? 'bg-white border-black/5' : 'bg-neutral-900 border-amber-500/10'} rounded-[2.5rem] p-10 border relative overflow-hidden group/card shadow-2xl`}>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl group-hover/card:bg-amber-500/10 transition-colors"></div>
              
              <div className="flex justify-between items-start mb-8">
                <div className="bg-amber-500/20 text-amber-500 text-[10px] font-black px-4 py-1.5 rounded-full border border-amber-500/20 uppercase tracking-widest">
                  {suggestion.platform} Optimization
                </div>
                <button 
                   onClick={handlePlayAudio}
                   disabled={loadingAudio}
                   className={`w-14 h-14 ${theme === 'light' ? 'bg-black/5 hover:text-black' : 'bg-white/5 hover:text-black'} hover:bg-amber-500 rounded-2xl flex items-center justify-center transition-all border border-transparent disabled:opacity-50 shadow-xl`}
                   title="استمع للإعلان بصوت حلبي"
                 >
                   {loadingAudio ? (
                     <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                   ) : (
                     <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M14 5v14l-7-7H3V9h4l7-7z"></path></svg>
                   )}
                 </button>
              </div>

              <h4 className={`${theme === 'light' ? 'text-black' : 'text-white'} font-black mb-6 text-3xl text-right leading-tight`}>{suggestion.headline}</h4>
              <p className="text-gray-400 mb-10 whitespace-pre-wrap leading-relaxed text-xl text-right font-light">{suggestion.body}</p>
              
              <div className="flex items-center gap-4 flex-row-reverse">
                <div className="bg-amber-500/10 px-8 py-4 rounded-2xl border border-amber-500/20 flex-grow text-center">
                  <span className="text-amber-500 font-black text-lg block">{suggestion.cta}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {!generatedImageUrl && !loadingImage && (
                <button
                  onClick={handleGenerateImage}
                  className={`w-full py-6 ${theme === 'light' ? 'bg-black/5 hover:bg-black/10' : 'bg-white/5 hover:bg-white/10'} border border-white/10 rounded-2xl font-black flex items-center justify-center gap-4 transition-all group overflow-hidden relative shadow-xl`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="text-4xl group-hover:rotate-12 transition-transform">🎨</span>
                  <span>توليد التصميم البصري الذكي</span>
                </button>
              )}
              
              {loadingImage && (
                <div className={`w-full p-12 border ${theme === 'light' ? 'border-black/5 bg-gray-100' : 'border-white/5 bg-neutral-900/50'} rounded-[2.5rem] flex flex-col items-center gap-8 shadow-inner`}>
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-amber-500/10 rounded-full"></div>
                    <div className="absolute top-0 w-20 h-20 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <div className="text-center">
                    <p className="text-amber-400 font-black text-2xl animate-pulse">جاري بناء التصوير السينمائي...</p>
                    <p className="text-xs text-gray-600 mt-4 font-bold tracking-[0.3em] uppercase">Render Engine: Gemini 2.5 Flash</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {generatedImageUrl && (
          <div className="flex flex-col items-center animate-in zoom-in-95 fade-in duration-1000">
            <div className="relative group w-full max-w-[360px]">
              <div className="absolute -inset-4 bg-gradient-to-b from-amber-500/40 to-amber-900/40 rounded-[4rem] blur-2xl opacity-40 group-hover:opacity-70 transition duration-1000"></div>
              <div className="relative bg-[#111] p-5 rounded-[4rem] shadow-3xl border border-white/10 ring-1 ring-white/5">
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-10 border border-white/5"></div>
                <img 
                  src={generatedImageUrl} 
                  alt="Generated Ad" 
                  className="rounded-[3rem] w-full aspect-[9/16] object-cover shadow-2xl"
                />
              </div>
            </div>
            <div className="mt-12 flex flex-col items-center gap-6">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                 <span className="text-gray-400 text-sm font-black tracking-widest uppercase">Export Ready • 4K Quality</span>
              </div>
              <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = generatedImageUrl;
                  link.download = `halabi-creative-${Date.now()}.png`;
                  link.click();
                }}
                className={`bg-white/5 hover:bg-amber-500 text-amber-500 hover:text-black px-12 py-5 rounded-2xl font-black transition-all border border-amber-500/20 shadow-2xl flex items-center gap-4 text-lg active:scale-95`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                <span>تحميل التصميم النهائي</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};

export default GeminiAssistant;