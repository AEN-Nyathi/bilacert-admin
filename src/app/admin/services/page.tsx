
import { Suspense } from 'react';
import ServicesClient from './ServicesClient';
import ServicesLoading from './loading';

export const metadata = {
    title: 'Services | Bilacert Admin Pro',
    description: 'Manage regulatory services.',
};

export default function ServicesPage() {
  return (
    <Suspense fallback={<ServicesLoading />}>
        <ServicesClient />
    </Suspense>
  );
}
