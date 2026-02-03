'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/supabase';

export function useDataFetching<T>(tableName: string, selectQuery: string = '*', orderBy: string = 'created_at') {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data: fetchedData, error: fetchError } = await supabase
      .from(tableName)
      .select(selectQuery)
      .order(orderBy, { ascending: false });

    if (fetchError) {
      setError(fetchError);
      setData([]);
    } else {
      setData(fetchedData as T[]);
      setError(null);
    }
    setLoading(false);
  }, [tableName, selectQuery, orderBy]);

  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel(`${tableName}-realtime`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: tableName },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tableName, fetchData]);

  return { data, loading, error, refresh: fetchData };
}
