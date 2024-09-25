import LayoutDash from "@/components/layoutDash"
import { VisionContextProvider } from "@/context"
import "@/styles/globals.scss"
import { config } from "@/styles/toast"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"
import styled from "./style.module.scss"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"]
})

export const metadata: Metadata = {
  title: "Vision Teck",
  description: "Dashboard | Vision Teck",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: [
    "nextjs",
    "next14",
    "pwa",
    "next-pwa",
    "tecnologia",
    "investimentos"
  ],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    {
      name: "Fabiano Pereira",
      url: "https://portfolio-fabianopereiraone.vercel.app/"
    }
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "/assets/favicon.png" },
    { rel: "icon", url: "/assets/favicon.png" }
  ]
}

export const viewport: Viewport = {
  themeColor: "#0D0D0D"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-BR'>
      <body className={`${inter.className} ${styled.contentLayout}`}>
        <VisionContextProvider>
          <LayoutDash>
            {children}
            <Toaster position='top-right' toastOptions={config} />
          </LayoutDash>
        </VisionContextProvider>
      </body>
    </html>
  )
}
