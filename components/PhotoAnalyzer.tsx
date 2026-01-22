
import React, { useState, useRef } from 'react';
import { analyzeDesign } from '../services/gemini';

interface Props {
  theme?: 'dark' | 'light';
}

const PhotoAnalyzer: React.FC<Props> = ({ theme }) => {
  const [image, setImage] = useState<string | null>(null);
  const [fileData, setFileData] = useState<{ base64: string; mimeType: string } | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setImage(reader.result as string);
        setFileData({ base64: base64String, mimeType: file.type });
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!fileData) return;
    setLoading(true);
    setAnalysis(null);
    try {
      const result = await analyzeDesign(fileData.base64, fileData.mimeType);
      setAnalysis(result || "لم نتمكن من الحصول على تحليل دقيق.");
    } catch (error) {
      setAnalysis("حدث خطأ أثناء الاتصال بالمحلل الذكي.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${theme === 'light' ? 'bg-gray-50 border-black/10' : 'bg-neutral-900 border-amber-500/20'} border rounded-[2.5rem] p-8 md:p-12 max-w-5xl mx-auto my-20 shadow-[0_0_50px_-12px_rgba(245,158,11,0.15)] relative overflow-hidden transition-colors duration-500`}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
      
      <div className="text-center mb-10">
        <h3 className={`text-3xl md:text-4xl font-black mb-4 ${theme === 'light' ? 'text-black' : 'text-white'}`}>المحلل البصري الذكي</h3>
        <p className="text-gray-400 max-w-2xl mx-auto">
          ارفع صورتك أو تصميمك الآن، ودع ذكاء حلبي الاصطناعي يحلل الجمالية ويقترح عليك كيف تصل بها إلى العالمية.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Upload Area */}
        <div className="space-y-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all h-[400px] flex flex-col items-center justify-center relative overflow-hidden group ${image ? 'border-amber-500/50' : `${theme === 'light' ? 'border-black/10 bg-white' : 'border-white/10 bg-white/5'} hover:border-amber-500/30`}`}
          >
            {image ? (
              <img src={image} alt="Preview" className="absolute inset-0 w-full h-full object-contain p-4" />
            ) : (
              <div className="space-y-4">
                <div className="text-6xl group-hover:scale-110 transition-transform duration-300">🖼️</div>
                <div className={`text-xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>اضغط لرفع الصورة</div>
                <div className="text-sm text-gray-500">يدعم JPG, PNG, WebP</div>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!image || loading}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-black font-black py-4 rounded-2xl text-lg transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                جاري التفكير بعمق...
              </>
            ) : (
              <>
                <span>🔍</span>
                تحليل التصميم الآن
              </>
            )}
          </button>
        </div>

        {/* Results Area */}
        <div className={`${theme === 'light' ? 'bg-black/5 border-black/5' : 'bg-black/40 border-white/5'} border rounded-3xl p-8 h-full min-h-[400px] relative`}>
          {!analysis && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-gray-600 text-center space-y-4">
              <div className="text-4xl">💡</div>
              <p>نتائج التحليل ستظهر هنا...</p>
            </div>
          )}

          {loading && (
            <div className="space-y-6">
              <div className="h-4 bg-white/5 rounded-full w-3/4 animate-pulse"></div>
              <div className="h-4 bg-white/5 rounded-full w-full animate-pulse"></div>
              <div className="h-4 bg-white/5 rounded-full w-5/6 animate-pulse"></div>
              <div className="h-4 bg-white/5 rounded-full w-2/3 animate-pulse"></div>
              <p className="text-center text-amber-500/50 text-sm mt-10">يقوم المحلل الآن بدراسة كل بكسل في صورتك...</p>
            </div>
          )}

          {analysis && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-black text-xs font-bold">AI</span>
                <h4 className="text-amber-400 font-bold">تقرير الخبير الإبداعي</h4>
              </div>
              <div className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} leading-relaxed whitespace-pre-wrap text-lg`}>
                {analysis}
              </div>
              <div className="mt-10 pt-6 border-t border-white/5">
                <a 
                  href="https://wa.me/905348292352" 
                  className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-bold transition-colors"
                >
                  <span>اطلب تحسين تصميمك الآن عبر واتساب</span>
                  <span>🚀</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoAnalyzer;
