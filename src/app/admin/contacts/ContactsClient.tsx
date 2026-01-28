
'use client';

import { useState } from 'react';
import { useContacts } from '@/hooks/useContacts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { columns } from './columns';
import { DataTable } from './data-table';
import { Contact } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import DeleteContactDialog from './DeleteContactDialog';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ContactsClient() {
  const { contacts, loading, error } = useContacts();
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleDelete = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDeleteDialogOpen(true);
  };
  
  const handleEdit = (contact: Contact) => {
    router.push(`/admin/contacts/${contact.id}/edit`);
  };

  const handleCloseDialogs = () => {
    setIsDeleteDialogOpen(false);
    setSelectedContact(null);
  };
  
  if (error) {
    return <div className="text-destructive">Error loading contacts: {error.message}</div>;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Contacts</CardTitle>
            <Button asChild>
                <Link href="/admin/contacts/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Contact
                </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
           {contacts.length === 0 && !loading ? (
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-24 text-center">
                    <h3 className="text-lg font-semibold tracking-tight">No Contacts Yet</h3>
                    <p className="text-sm text-muted-foreground">Click "Add Contact" to get started.</p>
                </div>
           ) : (
                <DataTable 
                    columns={columns({ onEdit: handleEdit, onDelete: handleDelete })} 
                    data={contacts as Contact[]} 
                    isLoading={loading} 
                />
           )}
        </CardContent>
      </Card>
      
      {isDeleteDialogOpen && (
        <DeleteContactDialog
          isOpen={isDeleteDialogOpen}
          onClose={handleCloseDialogs}
          contact={selectedContact}
        />
      )}
    </>
  );
}
