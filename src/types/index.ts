export interface GumroadProduct {
  id: string;
  name: string;
  preview_url: string;
  description: string;
  price: number;
  currency: string;
  short_url: string;
  formatted_price: string;
  tags?: string[];
}

export type ProductCategory = 'focus' | 'discipline' | 'dopamine' | 'productivity' | 'identity' | 'systems';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  currency: string;
  category: ProductCategory;
  gumroadUrl: string;
  rating: number;
  reviewCount: number;
  licensesTotal?: number;
  licensesRemaining?: number;
  featured: boolean;
  icon: string;
  accentColor: string; // Tailwind class like 'brand-accent'
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  content: string;
  rating: number;
  productName: string;
  date: string;
  initials: string;
  avatarGradient: string;
}

export interface Stat {
  value: string;
  label: string;
}
