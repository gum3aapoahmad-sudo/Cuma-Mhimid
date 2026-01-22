
import React, { useState } from 'react';
import BookingModal from './BookingModal';

interface Props {
  theme?: 'dark' | 'light';
}

const Packages: React.FC<Props> = ({ theme }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<{title: string, price: string} | null>(null);

  const handleSelectPackage = (title: string, price: string) => {
    setSelectedPkg({ title, price });
    setIsModalOpen(true);
  };

  const packages = [
    {
      name: "Essential Elegance",
      arName: "باقة الانطلاق",
      description: "الحل الأمثل للشركات الناشئة التي تبحث عن بداية قوية ومظهر احترافي.",
      price: "150$",
      features: ["تصميم شعار عصري", "تصميم بزنس كارد", "5 تصاميم سوشيال ميديا", "إنشاء صفحات تواصل"],
      icon: "👔",
      gradient: "from-blue-500/20 to-blue-600/5",
      border: "border-blue-500/30",
      accent: "text-blue-400"
    },
    {
      name: "Prestige Business",
      arName: "باقة البرستيج",
      description: "هوية بصرية متكاملة وحضور رقمي يفرض احترامه في السوق.",
      price: "450$",
      features: ["هوية بصرية كاملة (Branding)", "خطة محتوى لمدة شهر", "3 فيديوهات ريلز احترافية", "موشن جرافيك تعريفي (30 ثانية)"],
      popular: true,
      icon: "💎",
      gradient: "from-amber-500/20 to-amber-600/5",
      border: "border-amber-500/50",
      accent: "text-amber-500"
    },
    {
      name: "Royal Empire",
      arName: "الإمبراطورية الرقمية",
      description: "تجربة رقمية شاملة لا حدود لها، مصممة للنخبة وكبار المستثمرين.",
      price: "1200$+",
      features: ["موقع إلكتروني متكامل (Store/Web)", "إدارة شاملة لمدة 3 أشهر", "إنتاج إعلان سينمائي ضخم", "مستشار تسويقي شخصي 24/7"],
      icon: "👑",
      gradient: "from-purple-500/20 to-purple-600/5",
      border: "border-purple-500/30",
      accent: "text-purple-400"
    }
  ];

  return (
    <section className="py-20 md:py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12 md:mb-16">
        <span className="text-amber-500 text-xs font-black uppercase tracking-[0.3em] mb-4 block">The Royal Collection</span>
        <h2 className={`text-3xl md:text-6xl font-black mb-6 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
          باقات <span className="gold-text">الأناقة الرقمية</span>
        </h2>
        <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-lg md:text-xl max-w-2xl mx-auto`}>
          استثمر في مظهر عملك. اختر الباقة التي تعكس قيمة علامتك التجارية وتضمن لك التميز.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
        {packages.map((pkg, idx) => (
          <div 
            key={idx}
            className={`relative rounded-[2.5rem] p-8 border backdrop-blur-md transition-all duration-500 group hover:-translate-y-4 ${pkg.popular ? 'bg-[#0f0f0f] border-amber-500/50 scale-100 md:scale-105 shadow-[0_0_50px_-10px_rgba(245,158,11,0.2)] z-10' : `${theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#0a0a0a] border-white/10'} hover:border-white/20`}`}
          >
            {pkg.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-black font-black px-6 py-2 rounded-full text-xs uppercase tracking-widest shadow-lg">
                خيار النخبة
              </div>
            )}
            
            <div className={`absolute inset-0 bg-gradient-to-b ${pkg.gradient} rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

            <div className="relative z-10">
              <div className="text-4xl mb-6">{pkg.icon}</div>
              <h3 className={`text-xl font-black uppercase tracking-widest mb-1 ${pkg.accent}`}>{pkg.name}</h3>
              <h4 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-black' : 'text-white'}`}>{pkg.arName}</h4>
              <p className="text-gray-500 text-sm mb-8 min-h-[40px] leading-relaxed">{pkg.description}</p>
              
              <div className="mb-8 pb-8 border-b border-white/5">
                <span className={`text-4xl font-black ${theme === 'light' ? 'text-black' : 'text-white'}`}>{pkg.price}</span>
                <span className="text-gray-500 text-sm"> / للمشروع</span>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-400 group-hover:text-gray-200 transition-colors">
                    <span className={`w-1.5 h-1.5 rounded-full ${pkg.accent.replace('text-', 'bg-')}`}></span>
                    {feat}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleSelectPackage(pkg.arName, pkg.price)}
                className={`w-full block py-4 text-center rounded-2xl font-black text-sm transition-all ${pkg.popular ? 'bg-amber-500 hover:bg-amber-600 text-black shadow-lg shadow-amber-500/20' : `${theme === 'light' ? 'bg-black text-white hover:bg-gray-800' : 'bg-white/5 hover:bg-white/10 text-white'} border border-white/10`}`}
              >
                احجز هذه الباقة
              </button>
            </div>
          </div>
        ))}
      </div>

      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPackage={selectedPkg}
        theme={theme}
      />
    </section>
  );
};

export default Packages;
