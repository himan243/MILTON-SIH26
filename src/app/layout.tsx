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
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#faf8f5] text-[#1c1917] font-sans antialiased min-h-screen flex flex-col selection:bg-[#fde68a] selection:text-[#1c1917]">
        <AppProvider>
          <NoiseOverlay />
          <Navbar />
          <main className="flex-1 pt-[72px]">
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
