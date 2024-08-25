'use client'
import { VisionContextProvider } from "@/context";
import "@/styles/globals.scss";
import { config } from "@/styles/toast";
import { Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "900"] });

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <VisionContextProvider>
   <section className={inter.className}>
    {children}
    <Toaster position="top-right" toastOptions={config} />
   </section>
  </VisionContextProvider>
 );
}
