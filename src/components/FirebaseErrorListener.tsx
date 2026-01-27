'use client';
import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '@/hooks/use-toast';

export default function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handler = (error: FirestorePermissionError) => {
      console.error(error); // Also log to console for dev visibility
      if (process.env.NODE_ENV === 'development') {
        // In development, we throw the error to make it visible in the Next.js overlay.
        // This provides a better developer experience for debugging security rules.
        throw error;
      } else {
        // In production, we show a friendly toast message.
        toast({
          variant: 'destructive',
          title: 'Permission Denied',
          description: 'You do not have permission to perform this action.',
        });
      }
    };

    errorEmitter.on('permission-error', handler);

    return () => {
      errorEmitter.off('permission-error', handler);
    };
  }, [toast]);

  return null;
}
