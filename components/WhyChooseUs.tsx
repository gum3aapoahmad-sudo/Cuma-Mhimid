
import React, { useState } from 'react';

interface Props {
  theme?: 'dark' | 'light';
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const WhyChooseUs: React.FC<Props> = ({ theme }) => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const features: Feature[] = [
    {
      icon: "🛡️",
      title: "موثوقية وأمان تام",
      description: "نضع أمان بياناتك وخصوصيتك في المقام الأول، مع ضمان كامل لحقوقك في كل تعامل."
    },
    {
      icon: "⚡",
      title: "سرعة تنفيذ قياسية",
      description: "نقدر قيمة وقتك، لذا نلتزم بمواعيد تسليم دقيقة وسريعة دون المساومة على الجودة."
    },
    {
      icon: "💎",
      title: "جودة احترافية عالمية",
      description: "نستخدم أحدث التقنيات ومعايير الجودة العالمية لتقديم مخرجات تليق بعلامتك التجارية."
    },
    {
      icon: "💬",
      title: "تواصل مباشر وشفاف",
      description: "تحدث مباشرة مع الخبراء والمنفذين، لا حواجز ولا تعقيدات، لضمان تنفيذ رؤيتك بدقة."
    },
    {
      icon: "💳",
      title: "سهولة الدفع (شام كاش)",
      description: "وفرنا لك خيارات دفع محلية آمنة ومريحة عبر شام كاش لتسهيل المعاملات المالية."
    }
  ];

  const shamCashId = "5700883ba54c1ab80c6b78530e9a3646";
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${shamCashId}&color=f59e0b&bgcolor=111111`;

  return (
    <section className={`py-20 md:py-24 px-4 relative overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-[#080808]'} transition-colors duration-500`}>
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 relative">
          <div className="inline-block mb-4">
             <span className="py-2 px-4 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-black tracking-widest uppercase">
               لماذا نحن؟
             </span>
          </div>
          <h2 className={`text-3xl md:text-6xl font-black mb-6 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
            لماذا يختار النخبة <br/><span className="gold-text relative inline-block">
              حلبي للخدمات
            </span>؟
          </h2>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto font-light ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            انقر على أي بطاقة لمعرفة تفاصيل الدفع والميزات الحصرية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative">
          {features.map((feature, index) => (
            <div 
              key={index}
              onClick={() => setSelectedFeature(feature)}
              className={`group p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-2 relative overflow-hidden cursor-pointer ${theme === 'light' ? 'bg-gray-50 border-gray-100 hover:shadow-xl hover:bg-white' : 'bg-white/5 border-white/5 hover:border-amber-500/30 hover:bg-white/[0.07]'} z-10`}
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl mb-6 flex items-center justify-center text-2xl md:text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${theme === 'light' ? 'bg-amber-100 text-amber-600' : 'bg-amber-500/10 text-amber-500'}`}>
                {feature.icon}
              </div>
              
              <h3 className={`text-lg md:text-xl font-bold mb-4 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                {feature.title}
              </h3>
              
              <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} leading-relaxed text-sm md:text-base`}>
                {feature.description}
              </p>

              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500 text-xs font-bold flex items-center gap-2">
                <span>عرض التفاصيل</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedFeature(null)}
          ></div>

          <div className="relative w-full max-w-lg rounded-[2.5rem] border border-amber-500/30 shadow-[0_0_100px_rgba(251,191,36,0.2)] animate-in zoom-in-95 duration-300 bg-black max-h-[90vh] overflow-y-auto flex flex-col">
            
            {/* Background Image: Aleppo Citadel with Blur */}
            <div className="absolute inset-0 z-0">
               <img 
                 src="https://images.unsplash.com/photo-1548018566-281b37b03697?q=80&w=1000&auto=format&fit=crop" 
                 alt="Aleppo Citadel" 
                 className="w-full h-full object-cover opacity-60 filter blur-[6px] scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
            </div>

            <div className="relative z-10 p-6 md:p-10 text-center flex-grow">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-amber-500/20 backdrop-blur-md border border-amber-500/50 rounded-3xl flex items-center justify-center text-4xl md:text-5xl mb-6 shadow-2xl">
                {selectedFeature.icon}
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-white mb-4 gold-text">{selectedFeature.title}</h3>
              <p className="text-gray-300 mb-8 leading-relaxed font-light text-sm md:text-base">
                {selectedFeature.description}
              </p>

              <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-6">
                <div className="flex items-center justify-center gap-3 mb-4 text-amber-500">
                  <span className="text-2xl">💳</span>
                  <span className="font-black uppercase tracking-widest text-xs md:text-sm">بيانات الدفع الرسمية</span>
                </div>
                
                <div className="bg-white p-3 md:p-4 rounded-2xl w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 flex items-center justify-center">
                   <img src={qrCodeUrl} alt="Sham Cash QR" className="w-full h-full object-contain" />
                </div>

                <p className="text-xs text-gray-500 mb-2 font-mono">Sham Cash ID</p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 font-mono text-amber-400 text-xs md:text-sm break-all select-all cursor-copy hover:bg-white/10 transition-colors">
                  {shamCashId}
                </div>
              </div>

              <button 
                onClick={() => setSelectedFeature(null)}
                className="w-full md:w-auto px-10 py-4 bg-amber-500 hover:bg-amber-600 text-black font-black rounded-2xl shadow-lg shadow-amber-500/20 transition-all active:scale-95"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhyChooseUs;
