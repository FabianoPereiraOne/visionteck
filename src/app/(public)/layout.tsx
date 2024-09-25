import { VisionContextProvider } from "@/context"
import "@/styles/globals.scss"
import { config } from "@/styles/toast"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"]
})

export const metadata: Metadata = {
  title: "Vision Teck",
  description: "Pagina Inicial | Vision Teck",
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

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-BR'>
      <body className={inter.className}>
        <VisionContextProvider>
          {children}
          <Toaster position='top-right' toastOptions={config} />
        </VisionContextProvider>
      </body>
    </html>
  )
}
