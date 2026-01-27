
'use client';

import { useState } from 'react';
import { useContacts } from '@/hooks/useContacts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { columns } from './columns';
import { DataTable } from './data-table';
import { Contact } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import ContactForm from './ContactForm';
import DeleteContactDialog from './DeleteContactDialog';

export default function ContactsClient() {
  const { contacts, loading, error } = useContacts();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleAdd = () => {
    setSelectedContact(null);
    setIsFormOpen(true);
  };

  const handleEdit = (contact: Contact) => {
    setSelectedContact(contact);
    setIsFormOpen(true);
  };

  const handleDelete = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDialogs = () => {
    setIsFormOpen(false);
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
                <Button onClick={handleAdd}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Contact
                </Button>
                </div>
            </CardHeader>
            <CardContent>
                <DataTable 
                    columns={columns({ onEdit: handleEdit, onDelete: handleDelete })} 
                    data={contacts as Contact[]} 
                    isLoading={loading} 
                />
            </CardContent>
        </Card>
        
        {isFormOpen && (
            <ContactForm
                isOpen={isFormOpen}
                onClose={handleCloseDialogs}
                contact={selectedContact}
            />
        )}

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
