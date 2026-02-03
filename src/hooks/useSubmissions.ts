'use client';

import { useDataFetching } from './useDataFetching';
import type { Submission } from '@/lib/types';

export function useSubmissions() {
  return useDataFetching<Submission>('form_submissions');
}
