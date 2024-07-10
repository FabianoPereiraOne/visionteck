import "@/styles/globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "900"] });

export const metadata: Metadata = {
  title: "Pagina Inicial | Vision Teck",
  description: "Vision Teck investindo em um mundo melhor",
  icons: {
    icon: '/assets/favicon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
