import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Poppins } from "next/font/google"
import { PWAWrapper } from "@/components/pwa/pwa-wrapper"
import { Navbar } from "@/components/navbar"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

// ✅ Next.js App Router: keep only valid fields in metadata
export const metadata: Metadata = {
  title: "RxMind - Never Miss a Dose Again",
  description:
    "Seamlessly manage your medications, set personalized reminders, and track your health with RxMind - your trusted partner in well-being.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "RxMind",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "RxMind",
    title: "RxMind - Never Miss a Dose Again",
    description:
      "Seamlessly manage your medications, set personalized reminders, and track your health with RxMind - your trusted partner in well-being.",
  },
  twitter: {
    card: "summary",
    title: "RxMind - Never Miss a Dose Again",
    description:
      "Seamlessly manage your medications, set personalized reminders, and track your health with RxMind - your trusted partner in well-being.",
  },
}

// ✅ Properly export viewport instead of putting inside metadata
export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <head>
        {/* PWA / Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="RxCare" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <style>{`
html {
  font-family: ${inter.style.fontFamily}, ${poppins.style.fontFamily};
  --font-sans: ${inter.variable};
  --font-mono: ${poppins.variable};
}
        `}</style>
      </head>
      <body className="font-sans">
        <PWAWrapper>
          <Navbar />
          {children}
        </PWAWrapper>
      </body>
    </html>
  )
}
