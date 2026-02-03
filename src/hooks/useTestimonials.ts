'use client';

import { useDataFetching } from './useDataFetching';
import type { Testimonial } from '@/lib/types';

export function useTestimonials() {
  return useDataFetching<Testimonial>('testimonials');
}
