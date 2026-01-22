
export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
  category: string;
  badge?: string;
  reviews: Review[];
}

export interface AdSuggestion {
  headline: string;
  body: string;
  cta: string;
  platform: string;
}

export interface PortfolioItem {
  id: number;
  category: string;
  title: string;
  description?: string; // Added description field
  image: string;
  moreImages?: string[];
}

export interface VideoItem {
  id: number;
  category: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  duration?: string;
  views?: string;
  likes?: string;
}

export interface ProjectUpdate {
  id: number;
  type: string;
  title: string;
  date: string;
  image: string;
}

export type AdPlatform = 'Story' | 'Post' | 'TikTok';
export type AdTone = 'Luxurious' | 'Youthful' | 'Professional';
