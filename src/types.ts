export type SpiceLevel = 'Doux' | 'Moyen' | 'Piquant (Oranais)';

export interface MenuItem {
  id: string;
  name: string;
  nameArabic: string;
  category: 'grillades' | 'friture' | 'plateaux' | 'tajines' | 'entrees' | 'boissons';
  description: string;
  price: number; // in Dinar Algérien (DA)
  image: string;
  badge?: string;
  popular?: boolean;
  servesCount?: string;
  spicyConfigurable?: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  spiceLevel?: SpiceLevel;
  notes?: string;
}

export interface Review {
  id: string;
  author: string;
  authorType?: string; // e.g. "Local Guide · 45 avis · 76 photos"
  rating: number;
  date: string;
  content: string;
  tags: string[];
  likesCount?: number;
  photosCount?: number;
  ownerResponse?: {
    date: string;
    text: string;
  };
}

export interface RushHourData {
  time: string; // e.g. "06 h", "09 h", "12 h", "15 h", "18 h", "21 h", "00 h"
  busyPercentage: number; // 0 to 100
  label: string;
}

export interface MapsGroundingLink {
  title: string;
  uri: string;
  snippet?: string;
}

export interface AssistantMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  mapsLinks?: MapsGroundingLink[];
  timestamp: string;
}
