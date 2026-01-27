
import { Suspense } from 'react';
import ContactsClient from './ContactsClient';
import ContactsLoading from './loading';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export const metadata = {
    title: 'Contacts | Bilacert Admin Pro',
    description: 'Manage your contacts.',
};

export default function ContactsPage() {
  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
        </div>
        <Suspense fallback={<ContactsLoading />}>
            <ContactsClient />
        </Suspense>
    </div>
  );
}
