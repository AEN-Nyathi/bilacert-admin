
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
  shortDescription?: string;
  slug: string;
  icon?: string;
  href: string;
  category: string;
  orderIndex?: number;
  content?: string;
  features?: string[];
  requirements?: string[];
  includes?: string[];
  published: boolean;
  featured: boolean;
  createdAt: string;
  processingTime?: string;
  pricing?: number;
  image?: string;
  thumbnail?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  pricingPlans?: PricingPlan[];
  processSteps?: ProcessStep[];
  successStory?: SuccessStory;
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
  published: boolean;
  createdAt: string;
  image?: string;
  author?: string;
  readTime?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
}
