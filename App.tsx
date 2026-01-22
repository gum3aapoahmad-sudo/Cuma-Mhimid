
import React, { useState, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import ServiceCard from './components/ServiceCard';
import Footer from './components/Footer';
import VIPConcierge from './components/VIPConcierge';
import SmartAIChat from './components/SmartAIChat';
import { SERVICES } from './constants';

// Lazy load heavy components
const Portfolio = lazy(() => import('./components/Portfolio'));
const VideoGallery = lazy(() => import('./components/VideoGallery'));
const GeminiAssistant = lazy(() => import('./components/GeminiAssistant'));
const PhotoAnalyzer = lazy(() => import('./components/PhotoAnalyzer'));
const LatestUpdates = lazy(() => import('./components/LatestUpdates'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const ServiceReviewsModal = lazy(() => import('./components/ServiceReviewsModal'));
const AddServiceModal = lazy(() => import('./components/AddServiceModal'));
const BeforeAfter = lazy(() => import('./components/BeforeAfter'));
const Packages = lazy(() => import('./components/Packages'));
const TechStack = lazy(() => import('./components/TechStack'));

const SERVICE_FILTERS = [
  { id: 'الكل', label: 'الكل', icon: '🌐' },
  { id: 'خدمات رقمية', label: 'خدمات رقمية', icon: '💻' },
  { id: 'معاملات رسمية', label: 'معاملات رسمية', icon: '⚖️' },
  { id: 'تحويل أموال', label: 'تحويل أموال', icon: '💸' },
  { id: 'أخرى', label: 'خدمات متنوعة', icon: '✨' },
];

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeFilter, setActiveFilter] = useState('الكل');
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const chatRef = React.useRef<any>(null);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const filteredServices = activeFilter === 'الكل' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === activeFilter || (activeFilter === 'أخرى' && !['خدمات رقمية', 'معاملات رسمية', 'تحويل أموال'].includes(s.category)));

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-[#050505] text-gray-100'} transition-colors duration-300 font-sans selection:bg-amber-500 selection:text-black`}>
      
      <Navbar theme={theme} toggleTheme={toggleTheme} onOpenAddService={() => setIsAddServiceOpen(true)} />
      
      <main className="space-y-0">
        <Hero theme={theme} />
        
        <div id="services" className="max-w-7xl mx-auto px-4 py-20">
            <div className="text-center mb-12">
                <h2 className={`text-4xl md:text-5xl font-black mb-6 ${theme === 'light' ? 'text-black' : 'text-white'}`}>خدماتنا المميزة</h2>
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {SERVICE_FILTERS.map(filter => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={`px-6 py-3 rounded-xl font-bold transition-all border ${activeFilter === filter.id ? 'bg-amber-500 text-black border-amber-500' : 'bg-transparent text-gray-500 border-gray-700 hover:border-amber-500'}`}
                        >
                            <span className="mr-2">{filter.icon}</span>
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map(service => (
                    <ServiceCard 
                        key={service.id} 
                        service={service} 
                        theme={theme}
                        onViewReviews={(s) => { setSelectedService(s); setIsReviewsOpen(true); }}
                        onConsultAI={(s) => chatRef.current?.openChat(`أريد الاستفسار عن خدمة: ${s.title}`)}
                    />
                ))}
            </div>
        </div>

        <Suspense fallback={<div className="py-20 text-center">جاري التحميل...</div>}>
            <WhyChooseUs theme={theme} />
            <GeminiAssistant theme={theme} />
            <Packages theme={theme} />
            <Portfolio theme={theme} />
            <VideoGallery theme={theme} />
            <BeforeAfter theme={theme} />
            <TechStack theme={theme} />
            <PhotoAnalyzer theme={theme} />
            <LatestUpdates theme={theme} />
            <ContactForm theme={theme} />
        </Suspense>
      </main>

      <Footer theme={theme} />
      
      <VIPConcierge theme={theme} />
      <SmartAIChat ref={chatRef} />

      {/* Modals */}
      <Suspense fallback={null}>
        <AddServiceModal isOpen={isAddServiceOpen} onClose={() => setIsAddServiceOpen(false)} theme={theme} />
        <ServiceReviewsModal 
            isOpen={isReviewsOpen} 
            onClose={() => setIsReviewsOpen(false)} 
            service={selectedService}
            onAddReview={() => {}} 
            theme={theme} 
        />
      </Suspense>
    </div>
  );
};

export default App;
