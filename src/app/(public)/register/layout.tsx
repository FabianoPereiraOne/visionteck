'use client'
import "@/styles/globals.scss";
import { Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "900"] });

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <section className={inter.className}>
   {children}
   <Toaster position="top-right" toastOptions={{
    style: {
     background: "#1A1A1E",
     color: "#F9F9F9"
    }
   }} />
  </section>
 );
}
