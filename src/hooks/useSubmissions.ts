'use client';

import { useState, useEffect } from 'react';
import type { Submission } from '@/lib/types';
import { Timestamp } from 'firebase/firestore';

// In a real scenario, you would import and use firebase:
// import { collection, onSnapshot, query } from 'firebase/firestore';
// import { db } from '@/lib/firebase';

// const submissionCollectionNames = [
//   'icasa_submissions',
//   'nrcsloa_submissions',
//   'sabs_coc_submissions',
//   'nrsc_pr_submissions',
//   'itas_submissions',
//   'za_submissions',
//   'contact_submissions'
// ];

export function useSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // NOTE: The following is mock data for demonstration purposes.
    // The real implementation would use Firebase's onSnapshot for real-time data.
    const mockData: Submission[] = [
      { id: '1', serviceType: 'ICASA', clientName: 'Tech Innovators Inc.', clientEmail: 'contact@techinnovators.com', submittedAt: Timestamp.fromDate(new Date('2023-10-26')), status: 'completed' },
      { id: '2', serviceType: 'NRCS LOA', clientName: 'Global Exports Ltd.', clientEmail: 'shipping@globalexports.com', submittedAt: Timestamp.fromDate(new Date('2023-11-05')), status: 'in-progress' },
      { id: '3', serviceType: 'SABS COC', clientName: 'Construct Co.', clientEmail: 'projects@constructco.com', submittedAt: Timestamp.fromDate(new Date('2023-11-15')), status: 'new' },
      { id: '4', serviceType: 'ICASA', clientName: 'ConnectSphere', clientEmail: 'support@connectsphere.com', submittedAt: Timestamp.fromDate(new Date('2023-11-20')), status: 'new' },
      { id: '5', serviceType: 'ITAS', clientName: 'Auto Parts Direct', clientEmail: 'imports@autoparts.com', submittedAt: Timestamp.fromDate(new Date('2023-11-01')), status: 'completed' },
      { id: '6', serviceType: 'NRCS LOA', clientName: 'Gadget World', clientEmail: 'info@gadgetworld.com', submittedAt: Timestamp.fromDate(new Date('2023-12-01')), status: 'new' },
      { id: '7', serviceType: 'ICASA', clientName: 'Media Streamers', clientEmail: 'ops@mediastreamers.com', submittedAt: Timestamp.fromDate(new Date('2023-11-28')), status: 'in-progress' },
    ];

    const timer = setTimeout(() => {
      setSubmissions(mockData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);

    /*
    // REAL IMPLEMENTATION EXAMPLE
    try {
      const unsubscribes = submissionCollectionNames.map(collectionName => {
        const q = query(collection(db, collectionName));
        return onSnapshot(q, 
          (querySnapshot) => {
            const newSubmissions: Submission[] = [];
            querySnapshot.forEach((doc) => {
              newSubmissions.push({ id: doc.id, ...doc.data() } as Submission);
            });
            
            setSubmissions(prev => {
              const otherSubmissions = prev.filter(s => s.serviceType !== collectionName);
              return [...otherSubmissions, ...newSubmissions];
            });
            setLoading(false);
          }, 
          (err) => {
            console.error(`Error fetching from ${collectionName}:`, err);
            setError(err);
            setLoading(false);
          }
        );
      });

      return () => unsubscribes.forEach(unsub => unsub());
    } catch (e) {
      setError(e as Error);
      setLoading(false);
    }
    */
  }, []);

  return { submissions, loading, error };
}
