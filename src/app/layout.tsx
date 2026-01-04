import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';
import Providers from "@/components/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ESAN | Electrical Products",
  description: "Find the right electrical products for your home, office, or shop. Simple, purpose-based buying.",
};

import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col antialiased text-gray-900 bg-gray-50`}>
        <LanguageProvider>
          <Providers>
            <Header />
            <CartProvider>
              {children}
              <WhatsAppFloatingButton />
            </CartProvider>
            <Footer />
          </Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}
