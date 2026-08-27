import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlobalSearchModal } from '@/components/GlobalSearchModal';
import { PreserveModal } from '@/components/PreserveModal';
import { NoiseOverlay } from '@/components/NoiseOverlay';
import { FloatingAIAssistant } from '@/components/FloatingAIAssistant';

export const metadata: Metadata = {
  title: 'Nostalgic Hub | Northeast Cultural Living Museum & Revival',
  description: 'Rediscover, preserve, learn, create, and experience forgotten traditional games, bamboo crafts, food stories, and childhood creations of Northeast India.',
  keywords: 'Northeast India, Traditional Games, Bamboo Crafts, Assam, Meghalaya, Nagaland, Living Museum, Cultural Preservation, Upcycling AI',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#fcf9f3] text-[#1c1c18] font-sans antialiased min-h-screen flex flex-col selection:bg-[#fe997c]/30 selection:text-[#772f1a]">
        <AppProvider>
          <NoiseOverlay />
          <Navbar />
          <main className="flex-1 pt-[68px]">
            {children}
          </main>
          <Footer />
          <GlobalSearchModal />
          <PreserveModal />
          <FloatingAIAssistant />
        </AppProvider>
      </body>
    </html>
  );
}
