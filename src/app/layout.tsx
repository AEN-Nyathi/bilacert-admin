import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import MainLayout from '@/components/MainLayout';
import FacebookSDKInitializer from '@/components/FacebookSDKInitializer';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Bilacert - Your Compliance Partner | ICASA & NRCS Approvals',
    template: '%s | Bilacert',
  },
  description: 'Bilacert simplifies ICASA and NRCS LOA compliance for South African businesses. Expert guidance for type approvals, licensing, and regulatory compliance. Get your approvals faster with our streamlined process.',
  keywords: 'ICASA, NRCS, compliance, South Africa, regulatory approval, type approval, licensing',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <FacebookSDKInitializer />
        <MainLayout footer={<Footer />}>{children}</MainLayout>
        <Toaster />
      </body>
    </html>
  );
}
