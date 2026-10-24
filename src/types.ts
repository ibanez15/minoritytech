export interface InspectionCheckItem {
  name: string;
  category: 'Fisik' | 'Layar' | 'Hardware' | 'Baterai' | 'Port & Konektivitas';
  status: 'Passed' | 'Excellent';
  note: string;
}

export interface UltrabookProduct {
  id: string;
  title: string;
  brand: 'Lenovo' | 'Apple' | 'Dell' | 'ASUS' | 'HP' | 'Microsoft';
  modelSeries: string;
  price: number;
  originalPrice: number;
  conditionGrade: 'Grade A+' | 'Grade A';
  batteryHealth: number; // e.g. 94%
  batteryCycle: number; // e.g. 142
  processor: string;
  ram: string;
  storage: string;
  display: string;
  gpu: string;
  weightKg: number;
  inStock: boolean;
  stockCount: number;
  heroImage: string;
  galleryImages: string[];
  description: string;
  warrantyMonths: number;
  inspectionScore: number; // e.g. 98/100
  highlights: string[];
  keyPorts: string[];
  suitableFor: string[];
  geekbenchMultiScore?: number;
  cinebenchR23Score?: number;
  affiliateLinks: {
    tokopedia?: string;
    shopee?: string;
    whatsapp: string;
  };
  inspectionReport: {
    date: string;
    technician: string;
    ssdHealth: number; // e.g. 99%
    thermalUnderLoad: string; // e.g. "68°C Max (Under Cinebench 10 min)"
    keyboardTest: string; // e.g. "100% Working, Backlit Normal"
    screenTest: string; // e.g. "No Dead Pixel, No White Spot, 400 nits"
    audioMicCamera: string; // e.g. "Dolby Audio & FHD IR Cam Verified"
    chassisCondition: string; // e.g. "98% Mulus, mikro baret pemakaian wajar"
    checkItems: InspectionCheckItem[];
  };
}

export interface TechArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Review Mendalam' | 'Tech Insights' | 'Panduan Beli' | 'Komparasi';
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  relatedProductId?: string;
  pros?: string[];
  cons?: string[];
  verdictScore?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  recommendedProductIds?: string[];
}

export interface MatchRecommendation {
  productId: string;
  matchScore: number;
  reason: string;
  bestFitAspects: string[];
}

export interface MatchResponse {
  query: string;
  summary: string;
  recommendations: MatchRecommendation[];
}
