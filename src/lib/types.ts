
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
  slug: string;
  href: string;
  category: string;
  description?: string;
  content?: string;
  published: boolean;
  createdAt: string;
  processingTime?: string;
  pricing?: any;
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
}
