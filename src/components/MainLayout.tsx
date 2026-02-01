'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function MainLayout({ 
    children, 
    footer 
}: { 
    children: React.ReactNode, 
    footer: React.ReactNode 
}) {
    const pathname = usePathname();
    const isAdminPage = pathname.startsWith('/admin');

    if (isAdminPage) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <main className="min-h-screen">{children}</main>
            {footer}
            <WhatsAppButton />
        </>
    );
}
