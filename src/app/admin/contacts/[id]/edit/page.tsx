
import { supabase } from '@/lib/supabase';
import ContactForm from '../../ContactForm';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Contact } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'Edit Contact | Bilacert Admin Pro',
    description: 'Edit an existing contact.',
};

async function getContact(id: string): Promise<Contact | null> {
    const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) {
        return null;
    }

    return {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        message: data.message,
    } as Contact;
}


export default async function EditContactPage({ params }: { params: { id: string } }) {
    const contact = await getContact(params.id);

    if (!contact) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <Button variant="outline" asChild>
                <Link href="/admin/contacts">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Contacts
                </Link>
            </Button>
            <Card>
                <CardHeader>
                    <CardTitle>Edit Contact</CardTitle>
                    <CardDescription>Update the details for "{contact.name}".</CardDescription>
                </CardHeader>
                <CardContent>
                    <ContactForm contact={contact} />
                </CardContent>
            </Card>
        </div>
    );
}
