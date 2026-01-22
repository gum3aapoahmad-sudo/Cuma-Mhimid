
import React, { useState } from 'react';
import { CITY_DETAILS } from '../constants';
import { generateQuickDescription } from '../services/gemini';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'dark' | 'light';
}

const CATEGORIES = [
  'معاملات رسمية',
  'تحويل أموال (شام كاش)',
  'فرص عمل',
  'سكن وإيجارات',
  'طب وصحة',
  'تعليم ودورات',
  'محامين واستشارات',
  'شحن وتوصيل',
  'خدمات رقمية',
  'أخرى'
];

const AddServiceModal: React.FC<Props> = ({ isOpen, onClose, theme }) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceName: '',
    category: CATEGORIES[0],
    city: CITY_DETAILS[0].name,
    price: '',
    description: ''
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCitySelect = (cityName: string) => {
    setFormData({ ...formData, city: cityName });
  };

  const handleAutoDescription = async () => {
    if (!formData.serviceName || !formData.category) return;
    setIsGenerating(true);
    const desc = await generateQuickDescription(formData.serviceName, formData.category);
    if (desc) {
      setFormData(prev => ({ ...prev, description: desc }));
    }
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `طلب إضافة خدمة جديدة:%0a
👤 الاسم: ${formData.name}%0a
📱 الهاتف: ${formData.phone}%0a
🏷️ اسم الخدمة: ${formData.serviceName}%0a
📂 التصنيف: ${formData.category}%0a
📍 المدينة: ${formData.city}%0a
💰 السعر المبدئي: ${formData.price}%0a
📝 الوصف: ${formData.description}`;

    window.open(`https://wa.me/905348292352?text=${message}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container - Full screen on mobile, Card on desktop */}
      <div className={`relative w-full h-full md:h-auto md:max-h-[90vh] md:w-[700px] overflow-y-auto ${theme === 'light' ? 'bg-white' : 'bg-[#111]'} md:rounded-[2.5rem] shadow-2xl transition-all duration-300 animate-in fade-in zoom-in-95 scrollbar-hide`}>
        
        {/* Header */}
        <div className={`sticky top-0 z-20 px-6 py-4 flex justify-between items-center ${theme === 'light' ? 'bg-white/95 border-b border-gray-100' : 'bg-[#111]/95 border-b border-white/10'} backdrop-blur-md`}>
          <h2 className={`text-xl font-black ${theme === 'light' ? 'text-black' : 'text-white'}`}>أضف خدمتك</h2>
          <button 
            onClick={onClose}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${theme === 'light' ? 'bg-gray-100 text-black hover:bg-gray-200' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-amber-600 rounded-2xl mx-auto flex items-center justify-center text-black mb-4 shadow-lg shadow-amber-500/20">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </div>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              انضم إلى مئات مزودي الخدمات المحترفين في سوريا. سجل بياناتك وسيتم التواصل معك لتفعيل الخدمة.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step Indicator */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-amber-500' : 'bg-gray-700'}`}></div>
              <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-amber-500' : 'bg-gray-700'}`}></div>
            </div>

            {step === 1 ? (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>الاسم الكامل</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl outline-none border focus:border-amber-500 transition-all ${theme === 'light' ? 'bg-gray-50 border-gray-200 text-black' : 'bg-black/50 border-white/10 text-white'}`}
                      placeholder="مثال: محمد الحلبي"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>رقم للتواصل (واتساب)</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl outline-none border focus:border-amber-500 transition-all ${theme === 'light' ? 'bg-gray-50 border-gray-200 text-black' : 'bg-black/50 border-white/10 text-white'}`}
                      placeholder="09..."
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-bold mb-3 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>اختر المدينة</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {CITY_DETAILS.map((city) => (
                      <div
                        key={city.name}
                        onClick={() => handleCitySelect(city.name)}
                        className={`
                          relative cursor-pointer rounded-2xl p-3 border-2 transition-all duration-200 group overflow-hidden
                          ${formData.city === city.name 
                            ? 'border-amber-500 bg-amber-500/10' 
                            : `${theme === 'light' ? 'border-gray-200 bg-white hover:border-gray-300' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                        `}
                      >
                        <div className="flex items-center gap-3 relative z-10">
                          {/* Ensure icon is small and relevant */}
                          <span className="text-xl filter drop-shadow-md">{city.icon}</span>
                          <div className="flex flex-col">
                            <span className={`font-bold text-sm ${formData.city === city.name ? 'text-amber-500' : (theme === 'light' ? 'text-gray-800' : 'text-gray-200')}`}>{city.name}</span>
                            <span className="text-[10px] text-gray-500 font-bold opacity-70">{city.desc}</span>
                          </div>
                        </div>
                        
                        {/* Selected Indicator Background */}
                        {formData.city === city.name && (
                           <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-black font-black rounded-xl transition-all mt-4 shadow-lg shadow-amber-500/20"
                >
                  التالي: تفاصيل الخدمة
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                <div>
                  <label className={`block text-sm font-bold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>عنوان الخدمة</label>
                  <input
                    type="text"
                    name="serviceName"
                    required
                    value={formData.serviceName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl outline-none border focus:border-amber-500 transition-all ${theme === 'light' ? 'bg-gray-50 border-gray-200 text-black' : 'bg-black/50 border-white/10 text-white'}`}
                    placeholder="مثال: ترجمة محلفة، بيع عقارات..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>التصنيف</label>
                    <div className="relative">
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl outline-none border focus:border-amber-500 transition-all appearance-none ${theme === 'light' ? 'bg-gray-50 border-gray-200 text-black' : 'bg-black/50 border-white/10 text-white'}`}
                      >
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>السعر المبدئي</label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl outline-none border focus:border-amber-500 transition-all ${theme === 'light' ? 'bg-gray-50 border-gray-200 text-black' : 'bg-black/50 border-white/10 text-white'}`}
                      placeholder="اتفاق / 10$..."
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className={`block text-sm font-bold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>وصف الخدمة</label>
                    <button 
                      type="button"
                      onClick={handleAutoDescription}
                      disabled={isGenerating || !formData.serviceName}
                      className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-1 rounded-lg border border-amber-500/20 hover:bg-amber-500 hover:text-black transition-colors disabled:opacity-50 flex items-center gap-1"
                    >
                      {isGenerating ? <span className="animate-spin">⚡</span> : <span>⚡</span>}
                      {isGenerating ? 'جاري الكتابة...' : 'كتابة تلقائية (Flash Lite)'}
                    </button>
                  </div>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl outline-none border focus:border-amber-500 transition-all resize-none ${theme === 'light' ? 'bg-gray-50 border-gray-200 text-black' : 'bg-black/50 border-white/10 text-white'}`}
                    placeholder="اشرح تفاصيل خدمتك وما يميزها..."
                  ></textarea>
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className={`px-6 py-4 rounded-xl font-bold transition-all border ${theme === 'light' ? 'border-gray-200 hover:bg-gray-100 text-gray-600' : 'border-white/10 hover:bg-white/5 text-gray-300'}`}
                  >
                    السابق
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-green-600 hover:bg-green-700 text-white font-black rounded-xl transition-all shadow-lg shadow-green-900/20"
                  >
                    إرسال الطلب واتساب
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddServiceModal;
