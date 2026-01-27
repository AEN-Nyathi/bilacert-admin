'use client';
import { useState, useEffect, useRef } from 'react';
import type {
  DocumentReference,
  DocumentData,
  FirestoreError,
  DocumentSnapshot,
} from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

export function useDoc<T = DocumentData>(ref: DocumentReference<T> | null) {
  const [snapshot, setSnapshot] = useState<DocumentSnapshot<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  const refRef = useRef(ref);

  useEffect(() => {
    if (refRef.current && ref && refRef.current.isEqual(ref)) {
      return;
    }
    refRef.current = ref;

    if (!ref) {
      setSnapshot(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        setSnapshot(snap);
        setError(null);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError(err);
        setLoading(false);
        const permissionError = new FirestorePermissionError({
          path: ref.path,
          operation: 'get',
        });
        errorEmitter.emit('permission-error', permissionError);
      }
    );

    return () => unsubscribe();
  }, [ref]);

  const data = snapshot?.exists()
    ? { id: snapshot.id, ...snapshot.data() }
    : null;

  return { data, loading, error, snapshot };
}
