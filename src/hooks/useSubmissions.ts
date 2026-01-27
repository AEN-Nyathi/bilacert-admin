'use client';

import { useState, useEffect } from 'react';
import type { Submission } from '@/lib/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export function useSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
        setLoading(false);
        return;
    }
      
    const fetchSubmissions = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error);
        setSubmissions([]);
      } else {
        const mappedData = data.map(item => ({
            id: item.id,
            formType: item.form_type,
            status: item.status,
            serviceId: item.service_id,
            serviceName: item.service_name,
            fullName: item.full_name,
            email: item.email,
            phone: item.phone,
            company: item.company,
            industry: item.industry,
            details: item.details,
            internalNotes: item.internal_notes,
            assignedTo: item.assigned_to,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
            completedAt: item.completed_at,
        })) as Submission[];

        setSubmissions(mappedData);
        setError(null);
      }
      setLoading(false);
    };

    fetchSubmissions();

    const channel = supabase
      .channel('form_submissions')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'form_submissions' },
        (payload) => {
          // Just refetch all for simplicity
          fetchSubmissions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { submissions, loading, error };
}
