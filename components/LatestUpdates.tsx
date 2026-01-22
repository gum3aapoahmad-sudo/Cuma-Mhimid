
import React from 'react';
import { RECENT_UPDATES } from '../constants';

interface Props {
  theme?: 'dark' | 'light';
}

const LatestUpdates: React.FC<Props> = ({ theme }) => {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h2 className={`text-3xl md:text-4xl font-black mb-2 ${theme === 'light' ? 'text-black' : 'text-white'}`}>أحدث الأعمال والتحديثات</h2>
          <p className="text-gray-500">نشارككم آخر ما تم إنجازه في استوديو حلبي</p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-500 ring-1 ring-inset ring-green-500/20">
            متاح للطلبات الآن
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {RECENT_UPDATES.map((update) => (
          <div key={update.id} className={`group relative overflow-hidden rounded-2xl ${theme === 'light' ? 'bg-white border-black/5' : 'bg-neutral-900 border-white/5'} border transition-all hover:border-amber-500/30`}>
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={update.image} 
                alt={update.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-amber-500 text-xs font-bold uppercase tracking-wider">{update.type}</span>
                <span className="text-gray-600 text-xs">•</span>
                <span className="text-gray-500 text-xs">{update.date}</span>
              </div>
              <h3 className={`text-lg font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'} group-hover:text-amber-400 transition-colors`}>{update.title}</h3>
            </div>
            <div className="absolute top-4 left-4">
               <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold border border-white/10 text-white">
                 تم الإنجاز ✓
               </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestUpdates;
