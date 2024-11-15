import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Photogram - Share Your World',
  description: 'A beautiful place to share your moments',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(inter.className, "h-full bg-gray-50 flex flex-col")}>
        <Navbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}