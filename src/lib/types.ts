
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
  category: string;
  published: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  author: string;
  company: string;
  text: string;
  createdAt: Date;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string; // MDX content
  publishedAt: Date;
  author: string;
}
