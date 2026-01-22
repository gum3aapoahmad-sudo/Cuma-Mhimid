
import { Service, PortfolioItem, VideoItem, ProjectUpdate } from './types';

export const HERO_SLIDES = [
  {
    id: 0,
    image: 'https://images.unsplash.com/photo-1548018566-281b37b03697?auto=format&fit=crop&q=80&w=2000',
    alt: 'Aleppo Citadel'
  }
];

// 19 Luxurious & Professional Services
export const SERVICES: Service[] = [
  {
    id: 'passport',
    title: 'تجديد جواز سفر (VIP)',
    category: 'معاملات رسمية',
    description: 'خدمة النخبة لحجز الدور وتجهيز الأوراق الرسمية لجوازات السفر المستعجلة والعادية بدقة متناهية.',
    price: 'حسب النوع',
    icon: '🛂',
    badge: 'خدمة ملكية',
    reviews: [
      { id: '101', userName: 'سامر ح.', rating: 5, comment: 'تعامل راقي جداً وسرعة خيالية.', date: '2024-02-15' }
    ]
  },
  {
    id: 'shamcash',
    title: 'الوساطة المالية (شام كاش)',
    category: 'تحويل أموال',
    description: 'تحويلات مالية آمنة وموثقة بين المحافظات. نضمن وصول حوالتك في لحظات عبر شبكة شام كاش المعتمدة.',
    price: 'عمولة رمزية',
    icon: '💸',
    badge: 'فوري',
    reviews: []
  },
  {
    id: 'audio',
    title: 'الإنتاج الصوتي الفاخر',
    category: 'خدمات رقمية',
    description: 'تأليف، تلحين، وهندسة صوتية. أغاني خاصة، زفات ملكية، ومواويل عتابا تُكتب خصيصاً لك.',
    price: 'بدءاً من 10$',
    icon: '🎙️',
    badge: 'حصري',
    reviews: []
  },
  {
    id: 'retouch',
    title: 'تعديل صور (High-End)',
    category: 'خدمات رقمية',
    description: 'معالجة صور سينمائية باستخدام أحدث تقنيات الذكاء الاصطناعي وPhotoshop. نحول صورك إلى لوحات فنية.',
    price: '2$ / صورة',
    icon: '💎',
    badge: 'الأكثر طلباً',
    reviews: []
  },
  {
    id: 'video_edit',
    title: 'مونتاج سينمائي (Motion)',
    category: 'خدمات رقمية',
    description: 'صناعة محتوى مرئي يخطف الأنفاس لمنصات تيك توك وريلز. انتقالات ومؤثرات بصرية بمستوى هوليوود.',
    price: 'بدءاً من 5$',
    icon: '🎬',
    reviews: []
  },
  {
    id: 'translation',
    title: 'الترجمة المحلفة المعتمدة',
    category: 'معاملات رسمية',
    description: 'ترجمة الوثائق الرسمية والشهادات بدقة قانونية تامة، معتمدة لدى كافة الدوائر الحكومية.',
    price: 'حسب الوثيقة',
    icon: '📝',
    reviews: []
  },
  {
    id: 'branding',
    title: 'تصميم الهوية البصرية',
    category: 'خدمات رقمية',
    description: 'بناء علامة تجارية (Branding) متكاملة. شعارات، ألوان، وخطوط تعكس روح مشروعك وتخلد في الذاكرة.',
    price: 'باقات خاصة',
    icon: '✨',
    reviews: []
  },
  {
    id: 'hr_jobs',
    title: 'التوظيف التنفيذي (HR)',
    category: 'فرص عمل',
    description: 'ربط الكفاءات العالية بالشركات المرموقة. نساعدك في إيجاد الفرصة التي تليق بخبراتك.',
    price: 'مجاني',
    icon: '🤝',
    reviews: []
  },
  {
    id: 'real_estate_3d',
    title: 'تصوير وتسويق عقاري',
    category: 'خدمات رقمية',
    description: 'عروض ثلاثية الأبعاد (360 درجة) وتصوير جوي للعقارات الفاخرة لتسريع عملية البيع والتأجير.',
    price: 'حسب العقار',
    icon: '🏰',
    reviews: []
  },
  {
    id: 'social_media',
    title: 'إدارة منصات التواصل',
    category: 'خدمات رقمية',
    description: 'إدارة حسابات احترافية، كتابة محتوى إبداعي، وجدولة نشر لزيادة التفاعل والوصول للجمهور المستهدف.',
    price: 'اشتراك شهري',
    icon: '📱',
    reviews: []
  },
  {
    id: 'legal',
    title: 'الاستشارات القانونية',
    category: 'محامين واستشارات',
    description: 'نخبة من المحامين لتقديم استشارات دقيقة في القضايا المدنية، التجارية، والعقارية.',
    price: 'استشارة',
    icon: '⚖️',
    reviews: []
  },
  {
    id: 'uni_admission',
    title: 'القبولات الجامعية',
    category: 'تعليم ودورات',
    description: 'تأمين قبولات في الجامعات الخاصة والحكومية، ومساعدة الطلاب في اختيار التخصص المناسب.',
    price: 'رمزي',
    icon: '🎓',
    reviews: []
  },
  {
    id: 'medical',
    title: 'السياحة العلاجية',
    category: 'طب وصحة',
    description: 'تنسيق مواعيد مع أشهر الأطباء والمشافي لعمليات التجميل، زراعة الشعر، والأسنان.',
    price: 'تنسيق',
    icon: '🩺',
    reviews: []
  },
  {
    id: 'events',
    title: 'تنظيم الحفلات والمناسبات',
    category: 'أخرى',
    description: 'تخطيط وتنفيذ حفلات الزفاف، أعياد الميلاد، والمؤتمرات بأدق التفاصيل وأرقى التجهيزات.',
    price: 'حسب الحفل',
    icon: '🎉',
    reviews: []
  },
  {
    id: 'app_dev',
    title: 'برمجة وتطوير التطبيقات',
    category: 'خدمات رقمية',
    description: 'تحويل فكرتك إلى تطبيق ذكي (Android/iOS) بتصميم عصري وأداء عالي السرعة.',
    price: 'مشروع كامل',
    icon: '💻',
    reviews: []
  },
  {
    id: 'cyber_security',
    title: 'الأمن السيبراني وحماية الحسابات',
    category: 'خدمات رقمية',
    description: 'استرجاع الحسابات المخترقة، تأمين الصفحات التجارية، وفحص الثغرات الأمنية.',
    price: 'حسب الحالة',
    icon: '🛡️',
    badge: 'حماية قصوى',
    reviews: []
  },
  {
    id: 'interior',
    title: 'التصميم الداخلي والديكور',
    category: 'أخرى',
    description: 'تصاميم 3D للمنازل والمكاتب. نحول مساحتك إلى تحفة فنية تجمع بين الراحة والجمال.',
    price: 'بالمتر',
    icon: '🛋️',
    reviews: []
  },
  {
    id: 'car_rental',
    title: 'تأجير سيارات فارهة',
    category: 'شحن وتوصيل',
    description: 'أسطول من السيارات الحديثة والفارهة للمناسبات الخاصة ورجال الأعمال، مع أو بدون سائق.',
    price: 'يومي',
    icon: '🚗',
    reviews: []
  },
  {
    id: 'e_store',
    title: 'إنشاء متاجر إلكترونية',
    category: 'خدمات رقمية',
    description: 'متجر متكامل مربوط ببوابات الدفع، جاهز لعرض منتجاتك والبيع أونلاين فوراً.',
    price: 'باقة كاملة',
    icon: '🛍️',
    reviews: []
  }
];

export const VIDEO_ITEMS: VideoItem[] = [
  {
    id: 0,
    category: 'إعلان رسمي',
    title: 'فيلم "حلبي للخدمات": المستقبل يبدأ هنا',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-people-working-in-a-corporate-office-42718-large.mp4',
    duration: '1:00',
    views: 'جديد',
    likes: 'Top'
  },
  {
    id: 1,
    category: 'سيارات فاخرة',
    title: 'مرسيدس S-Class: القيادة المطلقة',
    thumbnail: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-black-car-driving-in-the-city-4074-large.mp4',
    duration: '0:30',
    views: '1.2M',
    likes: '45k'
  },
  {
    id: 2,
    category: 'مجوهرات راقية',
    title: 'بريق الأبدية: تشكيلة الماس 2024',
    thumbnail: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-jewelry-box-43550-large.mp4',
    duration: '0:45',
    views: '850k',
    likes: '32k'
  },
  {
    id: 3,
    category: 'عقارات',
    title: 'فيلا الأحلام: الرفاهية بلا حدود',
    thumbnail: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-living-room-with-a-fireplace-4340-large.mp4',
    duration: '1:00',
    views: '2.5M',
    likes: '120k'
  },
  {
    id: 4,
    category: 'ضيافة وفنادق',
    title: 'منتجع الراحة: استعيد توازنك',
    thumbnail: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-hotel-resort-4346-large.mp4',
    duration: '0:15',
    views: '500k',
    likes: '15k'
  },
  {
    id: 5,
    category: 'تكنولوجيا',
    title: 'تطبيق المستقبل: حياتك أسهل',
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-programmer-coding-on-computer-screen-close-up-42589-large.mp4',
    duration: '0:30',
    views: '900k',
    likes: '28k'
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    category: 'تصميم وفنون',
    title: 'تصميم هوية بصرية لشركة عقارات',
    description: 'مشروع متكامل يتضمن تصميم الشعار، الأوراق الرسمية، وبطاقات العمل بأسلوب عصري.',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800',
    moreImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 2,
    category: 'ويب وتطبيقات',
    title: 'تطوير متجر إلكتروني للملابس',
    description: 'متجر إلكتروني سريع ومتجاوب مع جميع الأجهزة، مع نظام دفع إلكتروني متكامل.',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800',
    moreImages: [
       'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 3,
    category: 'ميديا وتسويق',
    title: 'حملة تسويقية لمطعم فاخر',
    description: 'إدارة حسابات التواصل الاجتماعي وإنشاء محتوى إبداعي لزيادة المبيعات.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 4,
    category: 'تصميم وفنون',
    title: 'تصميم شعار تطبيق توصيل',
    description: 'شعار بسيط ومعبر يعكس سرعة وموثوقية الخدمة.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 5,
    category: 'ويب وتطبيقات',
    title: 'موقع تعريفي لشركة سياحة',
    description: 'موقع يعرض الخدمات السياحية بطريقة جذابة مع إمكانية الحجز أونلاين.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 6,
    category: 'ميديا وتسويق',
    title: 'فيديو ترويجي لمنتج تجميل',
    description: 'فيديو قصير وجذاب لمنصات التواصل الاجتماعي.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&q=80&w=800',
  }
];

export const RECENT_UPDATES: ProjectUpdate[] = [
  {
    id: 0,
    type: 'تحديث ذكي',
    title: 'إطلاق مختبر حلبي للذكاء الاصطناعي (AI Lab)',
    date: 'الآن',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4628c71d0?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 1,
    type: 'فيديو',
    title: 'فيديو ترويجي لشركة سياحة في اللاذقية',
    date: 'أمس',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 2,
    type: 'تصوير',
    title: 'تعديل 50 صورة لصالح متجر إلكتروني',
    date: 'منذ 3 أيام',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=400',
  },
];

export const CITY_DETAILS = [
  { name: 'حلب', icon: '🏰', color: 'bg-amber-500', desc: 'الشهباء' },
  { name: 'دمشق', icon: '🕌', color: 'bg-emerald-600', desc: 'الياسمين' },
  { name: 'حمص', icon: '🕰️', color: 'bg-orange-500', desc: 'الوليد' },
  { name: 'حماة', icon: '🎡', color: 'bg-rose-500', desc: 'النواعير' },
  { name: 'اللاذقية', icon: '⚓', color: 'bg-blue-500', desc: 'الساحل' },
  { name: 'طرطوس', icon: '🏖️', color: 'bg-cyan-500', desc: 'البحر' },
  { name: 'إدلب', icon: '🫒', color: 'bg-green-600', desc: 'الخضراء' },
  { name: 'الرقة', icon: '🌊', color: 'bg-teal-500', desc: 'الفرات' },
  { name: 'دير الزور', icon: '🌉', color: 'bg-yellow-600', desc: 'الجسور' }
];

export const CITIES = CITY_DETAILS.map(c => c.name);
