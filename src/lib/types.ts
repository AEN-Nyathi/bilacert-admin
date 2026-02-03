
export interface PricingPlan {
  title: string;
  description: string;
  features: string[];
  price: string;
  popular: boolean;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface SuccessStory {
  scenario: string;
  challenge: string;
  solution: string;
  result: string;
}

export interface Submission {
  id?: string;
  formType: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected' | 'archived';
  serviceId?: string;
  serviceName?: string;
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  industry?: string;
  details?: any; // jsonb
  internalNotes?: string;
  assignedTo?: string;
  createdAt: string; // timestamp
  updatedAt: string; // timestamp
  completedAt?: string; // timestamp
}


export interface Service {
  id: string;
  title: string;
  description: string;
  short_description?: string;
  slug: string;
  icon?: string;
  href: string;
  category: string;
  order_index?: number;
  content?: string;
  features?: string[];
  requirements?: string[];
  includes?: string[];
  published: boolean;
  featured: boolean;
  created_at: string;
  processing_time?: string;
  pricing?: number;
  image?: string;
  thumbnail?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  pricing_plans?: PricingPlan[];
  process_steps?: ProcessStep[];
  success_story?: SuccessStory;
  updated_at?: string;
}

export interface Testimonial {
  id: string;
  postUrl: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  category?: string;
  tags?: string;
  read_time?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  featured_image?: string;
  thumbnail?: string;
  published: boolean;
  published_at?: string;
  featured: boolean;
  author_id?: string;
  author_name?: string;
  views_count?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  submitted_at: string;
}
