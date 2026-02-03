'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AdminPageProps<T> {
  useData: () => { data: T[], loading: boolean, error: Error | null, refresh: () => void };
  title: string;
  newItemButtonText: string;
  newItemLink: string;
  renderItem: (item: T, onEdit: (item: T) => void, onDelete: (item: T) => void) => React.ReactNode;
  renderLoading?: () => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
  DeleteDialog: React.FC<{ isOpen: boolean; onClose: () => void; item: T | null; onDeleted: () => void; }>;
}

export default function AdminPage<T extends { id: string, title?: string, name?: string }>({ 
  useData,
  title,
  newItemButtonText,
  newItemLink,
  renderItem,
  renderLoading,
  renderEmpty,
  DeleteDialog
}: AdminPageProps<T>) {
  const { data, loading, error, refresh } = useData();
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const handleDelete = (item: T) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  const handleEdit = (item: T) => {
    router.push(`${newItemLink}/${item.id}/edit`);
  };

  const handleCloseDialogs = () => {
    setIsDeleteDialogOpen(false);
    setSelectedItem(null);
  };

  const onDeleted = () => {
    handleCloseDialogs();
    refresh();
  };

  const defaultLoading = () => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-48 w-full animate-pulse rounded-lg bg-muted"></div>
      ))}
    </div>
  );

  const defaultEmpty = () => (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-24 text-center">
      <h3 className="text-lg font-semibold tracking-tight">No {title} Yet</h3>
      <p className="text-sm text-muted-foreground">Click "{newItemButtonText}" to get started.</p>
    </div>
  );

  if (error) {
    return <div className="text-destructive">Error loading {title.toLowerCase()}: {error.message}</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <Button asChild>
              <Link href={newItemLink}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {newItemButtonText}
              </Link>
          </Button>
      </div>

      <div className="mt-6">
        {loading 
          ? (renderLoading ? renderLoading() : defaultLoading()) 
          : data.length === 0 
            ? (renderEmpty ? renderEmpty() : defaultEmpty()) 
            : (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {data.map((item) => renderItem(item, handleEdit, handleDelete))}
                </div>
              )
        }
      </div>

      {isDeleteDialogOpen && (
        <DeleteDialog
          isOpen={isDeleteDialogOpen}
          onClose={handleCloseDialogs}
          item={selectedItem}
          onDeleted={onDeleted}
        />
      )}
    </>
  );
}
