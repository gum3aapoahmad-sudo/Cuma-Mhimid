
import React from 'react';

interface Props {
  theme?: 'dark' | 'light';
}

const TechStack: React.FC<Props> = ({ theme }) => {
  const tools = [
    { name: "React / Next.js", desc: "الهيكل المتين لموقعك", icon: "⚛️" },
    { name: "After Effects", desc: "السحر الذي يخطف الأنظار", icon: "🎬" },
    { name: "Gemini AI", desc: "العقل المدبر للمحتوى", icon: "🧠" },
    { name: "Photoshop", desc: "لمسات الجمال الدقيقة", icon: "🎨" },
    { name: "Figma", desc: "مخطط الأناقة الأول", icon: "📐" },
    { name: "Premiere Pro", desc: "سرد القصص باحترافية", icon: "🎞️" }
  ];

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
        <div>
           <span className="text-amber-500 text-xs font-black uppercase tracking-[0.3em] mb-2 block">Our Tools</span>
           <h2 className={`text-3xl md:text-5xl font-black ${theme === 'light' ? 'text-black' : 'text-white'}`}>معرض الأقمشة <span className="gold-text">الرقمية</span></h2>
           <p className="text-gray-500 mt-4">أدواتنا ليست مجرد برامج، هي خيوط ننسج بها إبداعنا.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {tools.map((tool, idx) => (
          <div 
            key={idx} 
            className={`p-6 rounded-3xl border text-center group transition-all duration-300 hover:-translate-y-2 ${theme === 'light' ? 'bg-white border-gray-100 hover:border-amber-500/30' : 'bg-[#0a0a0a] border-white/5 hover:border-amber-500/30'}`}
          >
            <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300 filter grayscale group-hover:grayscale-0">{tool.icon}</div>
            <h3 className={`font-black text-sm mb-2 ${theme === 'light' ? 'text-black' : 'text-white'}`}>{tool.name}</h3>
            <p className="text-[10px] text-gray-500 font-bold">{tool.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
