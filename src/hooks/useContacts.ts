'use client';

import { useState, useEffect } from 'react';
import type { Contact } from '@/lib/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
        setLoading(false);
        return;
    }
      
    const fetchContacts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        setError(error);
        setContacts([]);
      } else {
        const mappedData = data.map(item => ({
            id: item.id,
            name: item.name,
            email: item.email,
            phone: item.phone,
            service: item.service,
            message: item.message,
        })) as Contact[];

        setContacts(mappedData);
        setError(null);
      }
      setLoading(false);
    };

    fetchContacts();

    const channel = supabase
      .channel('contacts-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'contacts' },
        (payload) => {
          fetchContacts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { contacts, loading, error };
}
