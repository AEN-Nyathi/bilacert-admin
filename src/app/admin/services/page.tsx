
import { Suspense } from 'react';
import ServicesClient from './ServicesClient';
import ServicesLoading from './loading';

export const metadata = {
    title: 'Services | Bilacert Admin Pro',
    description: 'Manage regulatory services.',
};

export default function ServicesPage() {
  return (
    <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Services</h1>
        <Suspense fallback={<ServicesLoading />}>
            <ServicesClient />
        </Suspense>
    </div>
  );
}
