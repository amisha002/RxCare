import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { PWAWrapper } from "@/components/pwa/pwa-wrapper"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "RxCare - Never Miss a Dose Again",
  description:
    "Seamlessly manage your medications, set personalized reminders, and track your health with RxCare - your trusted partner in well-being.",
  generator: "v0.app",
  manifest: "/manifest.json",
  themeColor: "#2563eb",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "RxCare",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "RxCare",
    title: "RxCare - Never Miss a Dose Again",
    description:
      "Seamlessly manage your medications, set personalized reminders, and track your health with RxCare - your trusted partner in well-being.",
  },
  twitter: {
    card: "summary",
    title: "RxCare - Never Miss a Dose Again",
    description:
      "Seamlessly manage your medications, set personalized reminders, and track your health with RxCare - your trusted partner in well-being.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <head>
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
      </head>
      <body className="font-sans">
        <PWAWrapper>{children}</PWAWrapper>
      </body>
    </html>
  )
}
