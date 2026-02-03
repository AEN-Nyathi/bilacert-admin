'use client';

import { useDataFetching } from './useDataFetching';
import type { Service } from '@/lib/types';

export function useServices() {
  return useDataFetching<Service>('services');
}
