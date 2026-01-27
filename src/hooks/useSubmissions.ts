'use client';

import { useMemo } from 'react';
import type { Submission } from '@/lib/types';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore, useCollection } from '@/firebase';

export function useSubmissions() {
  const firestore = useFirestore();

  const submissionsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'form_submissions'),
      orderBy('submittedAt', 'desc')
    );
  }, [firestore]);

  const {
    data: submissions,
    loading,
    error,
  } = useCollection<Submission>(submissionsQuery as any);

  return { submissions, loading, error };
}
