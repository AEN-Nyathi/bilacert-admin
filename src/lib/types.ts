import type { Timestamp } from 'firebase/firestore';

export interface Submission {
  id?: string;
  serviceType: string;
  clientName: string;
  clientEmail: string;
  submittedAt: Timestamp;
  status: 'new' | 'in-progress' | 'completed' | 'rejected';
  [key: string]: any;
}

export interface Testimonial {
  id: string;
  author: string;
  company: string;
  text: string;
  createdAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string; // MDX content
  publishedAt: Date;
  author: string;
}
