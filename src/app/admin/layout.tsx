'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/Header';
import { Loader2 } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';
import SupabaseNotConfigured from '@/components/admin/SupabaseNotConfigured';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // The login page is not wrapped by this main layout structure, so it has its own check.
  // For all other admin pages, we check for Supabase config first.
  if (pathname !== '/admin/login' && !isSupabaseConfigured) {
    return <SupabaseNotConfigured />;
  }
  
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading) {
      if (!user && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
      if (user && pathname === '/admin/login') {
        router.push('/admin/dashboard');
      }
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user && pathname !== '/admin/login') {
    return null; // Redirecting...
  }

  if (user && pathname === '/admin/login') {
    return null; // Redirecting...
  }
  
  // Render the login page without the admin sidebar/header
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Render the main admin layout for an authenticated user
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="flex min-h-svh flex-1 flex-col bg-background">
        <AdminHeader />
        <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </SidebarProvider>
  );
}
