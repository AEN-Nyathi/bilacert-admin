'use client';
import { useState, useEffect, useRef } from 'react';
import type {
  Query,
  DocumentData,
  FirestoreError,
  QuerySnapshot,
} from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

export function useCollection<T = DocumentData>(query: Query<T> | null) {
  const [snapshot, setSnapshot] = useState<QuerySnapshot<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  const queryRef = useRef(query);

  useEffect(() => {
    // Prevent re-running the effect if the query is the same
    if (queryRef.current && query && queryRef.current.isEqual(query)) {
      return;
    }
    queryRef.current = query;

    if (!query) {
      setSnapshot(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = onSnapshot(
      query,
      (snap) => {
        setSnapshot(snap);
        setError(null);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
        
        let path = 'unknown collection';
        // Attempt to get path from internal properties for better error context
        if (query && (query as any)._query?.path?.segments) {
            path = (query as any)._query.path.segments.join('/');
        }

        const permissionError = new FirestorePermissionError({
          path: path,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
      }
    );

    return () => unsubscribe();
  }, [query]);

  const data =
    snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() })) || [];

  return { data, loading, error, snapshot };
}
