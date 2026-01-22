
import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: { title: string; price: string } | null;
  theme?: 'dark' | 'light';
}

const BookingModal: React.FC<Props> = ({ isOpen, onClose, selectedPackage, theme }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    notes: ''
  });

  if (!isOpen || !selectedPackage) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `مرحباً، أرغب بحجز باقة جديدة:%0a
📦 الباقة: ${selectedPackage.title}%0a
💰 السعر: ${selectedPackage.price}%0a
👤 الاسم: ${formData.name}%0a
📱 الهاتف: ${formData.phone}%0a
📝 ملاحظات: ${formData.notes}`;

    window.open(`https://wa.me/905348292352?text=${message}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>
      <div className={`relative w-full max-w-md rounded-[2.5rem] p-8 shadow-[0_0_50px_-10px_rgba(251,191,36,0.2)] animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 border ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-[#111] border-amber-500/20'}`}>
        <button 
          onClick={onClose}
          className={`absolute top-6 left-6 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:rotate-90 ${theme === 'light' ? 'bg-gray-100 hover:bg-gray-200 text-black' : 'bg-white/5 hover:bg-white/10 text-white'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <div className="text-center mb-8 mt-2">
          <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
             🛍️
          </div>
          <span className="text-amber-500 text-xs font-black uppercase tracking-[0.2em]">تأكيد الحجز</span>
          <h3 className={`text-2xl font-black mt-2 ${theme === 'light' ? 'text-black' : 'text-white'}`}>{selectedPackage.title}</h3>
          <div className="mt-2 inline-block bg-amber-500 px-4 py-1 rounded-full text-black font-black text-sm">
            {selectedPackage.price}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-xs font-bold mb-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>الاسم الكامل</label>
            <input 
              required
              type="text"
              placeholder="الاسم الكريم"
              className={`w-full px-5 py-4 rounded-xl outline-none border focus:border-amber-500 transition-all font-bold ${theme === 'light' ? 'bg-gray-50 border-gray-200 text-black placeholder-gray-400' : 'bg-black/50 border-white/10 text-white placeholder-gray-600'}`}
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className={`block text-xs font-bold mb-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>رقم الهاتف (واتساب)</label>
            <input 
              required
              type="tel"
              placeholder="09..."
              className={`w-full px-5 py-4 rounded-xl outline-none border focus:border-amber-500 transition-all font-bold ${theme === 'light' ? 'bg-gray-50 border-gray-200 text-black placeholder-gray-400' : 'bg-black/50 border-white/10 text-white placeholder-gray-600'}`}
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div>
            <label className={`block text-xs font-bold mb-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>ملاحظات إضافية (اختياري)</label>
            <textarea 
              rows={3}
              placeholder="أي تفاصيل إضافية..."
              className={`w-full px-5 py-4 rounded-xl outline-none border focus:border-amber-500 transition-all resize-none font-bold ${theme === 'light' ? 'bg-gray-50 border-gray-200 text-black placeholder-gray-400' : 'bg-black/50 border-white/10 text-white placeholder-gray-600'}`}
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
            />
          </div>
          
          <button 
            type="submit"
            className="w-full py-5 bg-amber-500 hover:bg-amber-600 text-black font-black rounded-xl shadow-xl shadow-amber-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-2 mt-4"
          >
            <span>تأكيد الحجز عبر واتساب</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
