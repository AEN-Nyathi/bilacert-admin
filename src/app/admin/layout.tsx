import type { ReactNode } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { AuthProvider } from '@/context/AuthContext';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayout>{children}</AdminLayout>
    </AuthProvider>
  );
}
