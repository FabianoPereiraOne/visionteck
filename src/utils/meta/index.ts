export const useLoadTitle = ({
  title,
  description
}: {
  title: string
  description?: string
}) => ({
  title,
  description,
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
})
