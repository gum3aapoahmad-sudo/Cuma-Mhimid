
import React, { useState } from 'react';

interface Props {
  theme?: 'dark' | 'light';
}

const ContactForm: React.FC<Props> = ({ theme }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: 'تطوير ويب',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `مرحباً، أريد الاستفسار عن خدمة عبر موقع حلبي للخدمات:%0a
👤 الاسم: ${formData.name}%0a
📱 الهاتف: ${formData.phone}%0a
🛠️ نوع الخدمة: ${formData.serviceType}%0a
📝 التفاصيل: ${formData.message}`;

    window.open(`https://wa.me/905348292352?text=${text}`, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 px-4 max-w-4xl mx-auto relative z-10 scroll-mt-24">
      <div className={`${theme === 'light' ? 'bg-white shadow-xl border-black/5' : 'bg-[#111] border-white/10'} border rounded-[3rem] p-8 md:p-12 overflow-hidden relative`}>
        
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div>

        <div className="text-center mb-10">
          <h2 className={`text-3xl md:text-5xl font-black mb-4 ${theme === 'light' ? 'text-black' : 'text-white'}`}>ابدأ مشروعك الآن</h2>
          <p className="text-gray-500">املأ النموذج وسيتم تحويلك مباشرة للواتساب للتحدث مع المهندس جمعة.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={`text-sm font-bold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>الاسم الكامل</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-6 py-4 rounded-2xl outline-none border transition-all focus:border-amber-500 ${theme === 'light' ? 'bg-gray-50 border-gray-200 text-black' : 'bg-black/40 border-white/10 text-white'}`}
                placeholder="اسمك الكريم"
              />
            </div>
            <div className="space-y-2">
              <label className={`text-sm font-bold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>رقم الهاتف</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-6 py-4 rounded-2xl outline-none border transition-all focus:border-amber-500 ${theme === 'light' ? 'bg-gray-50 border-gray-200 text-black' : 'bg-black/40 border-white/10 text-white'}`}
                placeholder="09..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={`text-sm font-bold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>نوع الخدمة المطلوبة</label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className={`w-full px-6 py-4 rounded-2xl outline-none border transition-all focus:border-amber-500 appearance-none cursor-pointer ${theme === 'light' ? 'bg-gray-50 border-gray-200 text-black' : 'bg-black/40 border-white/10 text-white'}`}
            >
              <option value="تطوير ويب">💻 برمجة وتصميم مواقع</option>
              <option value="مونتاج فيديو">🎬 مونتاج فيديو (Motion)</option>
              <option value="تعديل صور">📸 تعديل صور (AI/Retouch)</option>
              <option value="إنتاج صوتي">🎙️ إنتاج صوتي</option>
              <option value="أخرى">✨ خدمة أخرى</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className={`text-sm font-bold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>تفاصيل الطلب</label>
            <textarea
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-6 py-4 rounded-2xl outline-none border transition-all focus:border-amber-500 resize-none ${theme === 'light' ? 'bg-gray-50 border-gray-200 text-black' : 'bg-black/40 border-white/10 text-white'}`}
              placeholder="اشرح لنا فكرتك باختصار..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black text-xl transition-all shadow-xl shadow-green-900/20 flex items-center justify-center gap-3 active:scale-95"
          >
            <span>إرسال الطلب عبر واتساب</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
