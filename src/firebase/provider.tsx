'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { initializeFirebase, type FirebaseInstances } from './';
import FirebaseErrorListener from '@/components/FirebaseErrorListener';

const FirebaseContext = createContext<FirebaseInstances | null>(null);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const instances = useMemo(initializeFirebase, []);

  return (
    <FirebaseContext.Provider value={instances}>
      {children}
      <FirebaseErrorListener />
    </FirebaseContext.Provider>
  );
}

export const useFirebase = (): FirebaseInstances => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const useFirebaseApp = () => useFirebase().app;
export const useAuth = () => useFirebase().auth;
export const useFirestore = () => useFirebase().firestore;
