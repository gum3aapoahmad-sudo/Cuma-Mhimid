
import React, { useState } from 'react';
import { Service, Review } from '../types';

interface Props {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onAddReview: (serviceId: string, review: Omit<Review, 'id' | 'date'>) => void;
  theme?: 'dark' | 'light';
}

const ServiceReviewsModal: React.FC<Props> = ({ service, isOpen, onClose, onAddReview, theme }) => {
  const [rating, setRating] = useState(0);
  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [showAddReview, setShowAddReview] = useState(false);

  if (!isOpen || !service) return null;

  const averageRating = service.reviews.length
    ? (service.reviews.reduce((acc, curr) => acc + curr.rating, 0) / service.reviews.length).toFixed(1)
    : '0.0';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    
    onAddReview(service.id, {
      userName,
      rating,
      comment
    });
    
    // Reset form and close
    setRating(0);
    setUserName('');
    setComment('');
    setShowAddReview(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className={`relative w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-[2rem] shadow-2xl border ${theme === 'light' ? 'bg-white border-black/10' : 'bg-neutral-900 border-white/10'} animate-in zoom-in-95 duration-300 flex flex-col`}>
        
        {/* Header */}
        <div className={`p-6 border-b ${theme === 'light' ? 'border-gray-100' : 'border-white/5'} flex justify-between items-start ${theme === 'light' ? 'bg-white' : 'bg-neutral-900'}`}>
          <div>
            <div className="text-4xl mb-2">{service.icon}</div>
            <h2 className={`text-2xl font-black ${theme === 'light' ? 'text-black' : 'text-white'}`}>{service.title}</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-3xl font-bold text-amber-500">{averageRating}</span>
              <div className="flex text-amber-500">
                {[1, 2, 3, 4, 5].map((star) => (
                   <svg key={star} className={`w-5 h-5 ${parseFloat(averageRating) >= star ? 'fill-current' : 'text-gray-400'}`} viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                ))}
              </div>
              <span className="text-gray-500 text-sm">({service.reviews.length} تقييم)</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:rotate-90 ${theme === 'light' ? 'bg-gray-100 hover:bg-gray-200 text-black' : 'bg-white/5 hover:bg-white/10 text-white'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-amber-500/20">
          
          {/* Reviews List */}
          <div className="space-y-4 mb-20">
            {service.reviews.length === 0 ? (
              <div className="text-center py-10">
                <span className="text-4xl block mb-2">💬</span>
                <p className="text-gray-500">كن أول من يقيم هذه الخدمة!</p>
              </div>
            ) : (
              service.reviews.slice().reverse().map((review) => (
                <div key={review.id} className={`p-4 rounded-xl border ${theme === 'light' ? 'bg-gray-50 border-gray-100' : 'bg-white/5 border-white/5'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className={`font-bold block ${theme === 'light' ? 'text-black' : 'text-white'}`}>{review.userName}</span>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className={`w-3 h-3 ${review.rating >= star ? 'fill-current' : 'text-gray-400 opacity-30'}`} viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                      ))}
                    </div>
                  </div>
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Fixed Bottom Section for Adding Review */}
        <div className={`p-4 border-t ${theme === 'light' ? 'border-gray-100 bg-white' : 'border-white/5 bg-[#111]'}`}>
          {!showAddReview ? (
            <button 
              onClick={() => setShowAddReview(true)}
              className="w-full py-4 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-black font-bold rounded-xl transition-all border border-amber-500/20 flex items-center justify-center gap-2"
            >
              <span>✍️</span>
              <span>أضف تقييمك الآن</span>
            </button>
          ) : (
            <div className="animate-in slide-in-from-bottom-10 duration-300">
              <div className="flex justify-between items-center mb-4">
                 <h3 className={`text-sm font-bold ${theme === 'light' ? 'text-black' : 'text-white'}`}>كتابة تقييم جديد</h3>
                 <button onClick={() => setShowAddReview(false)} className="text-gray-500 text-sm hover:text-red-500">إلغاء</button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex justify-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`transition-transform hover:scale-110 ${rating >= star ? 'text-amber-500' : 'text-gray-400'}`}
                    >
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    </button>
                  ))}
                </div>
                
                <input
                  type="text"
                  placeholder="الاسم"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl outline-none border transition-all focus:border-amber-500 ${theme === 'light' ? 'bg-gray-50 border-gray-200 text-black' : 'bg-black/50 border-white/10 text-white'}`}
                />
                
                <textarea
                  placeholder="اكتب تجربتك..."
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl outline-none border transition-all focus:border-amber-500 resize-none h-20 ${theme === 'light' ? 'bg-gray-50 border-gray-200 text-black' : 'bg-black/50 border-white/10 text-white'}`}
                ></textarea>

                <button
                  type="submit"
                  disabled={rating === 0}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold rounded-xl transition-all shadow-lg"
                >
                  نشر التقييم
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceReviewsModal;
