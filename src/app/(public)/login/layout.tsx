import { InterFont, MetaDataPage } from "@/schemas/pages/config";
import "@/styles/globals.scss";
import { config } from "@/styles/toast";
import { Metadata } from "next";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = MetaDataPage({ title: "Login" })

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <section className={InterFont.className}>
   {children}
   <Toaster position="top-right" toastOptions={config} />
  </section>
 );
}
