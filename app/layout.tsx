// import type React from "react"
// import type { Metadata, Viewport } from "next"
// import { Inter, Poppins } from "next/font/google"
// import { PWAWrapper } from "@/components/pwa/pwa-wrapper"
// import { Navbar } from "@/components/navbar"
// import "./globals.css"
// import { useEffect } from "react"
// import { RemindersManager } from "@/lib/reminders"

// const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
//   variable: "--font-poppins",
// })

// // ✅ Next.js App Router: keep only valid fields in metadata
// export const metadata: Metadata = {
//   title: "RxMind - Never Miss a Dose Again",
//   description:
//     "Seamlessly manage your medications, set personalized reminders, and track your health with RxMind - your trusted partner in well-being.",
//   manifest: "/manifest.json",
//   appleWebApp: {
//     capable: true,
//     statusBarStyle: "default",
//     title: "RxMind",
//   },
//   formatDetection: {
//     telephone: false,
//   },
//   openGraph: {
//     type: "website",
//     siteName: "RxMind",
//     title: "RxMind - Never Miss a Dose Again",
//     description:
//       "Seamlessly manage your medications, set personalized reminders, and track your health with RxMind - your trusted partner in well-being.",
//   },
//   twitter: {
//     card: "summary",
//     title: "RxMind - Never Miss a Dose Again",
//     description:
//       "Seamlessly manage your medications, set personalized reminders, and track your health with RxMind - your trusted partner in well-being.",
//   },
// }

// // ✅ Properly export viewport instead of putting inside metadata
// export const viewport: Viewport = {
//   themeColor: "#2563eb",
//   width: "device-width",
//   initialScale: 1,
//   maximumScale: 1,
//   userScalable: false,
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en" className={`${inter.variable} ${poppins.variable} antialiased`}>
//       <head>
//         {/* PWA / Icons */}
//         <link rel="icon" href="/favicon.ico" />
//         <link rel="apple-touch-icon" href="/icon-192x192.png" />
//         <link rel="apple-touch-icon" sizes="192x192" href="/icon-192x192.png" />
//         <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
//         <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png" />
//         <meta name="apple-mobile-web-app-capable" content="yes" />
//         <meta name="apple-mobile-web-app-status-bar-style" content="default" />
//         <meta name="apple-mobile-web-app-title" content="RxCare" />
//         <meta name="mobile-web-app-capable" content="yes" />
//         <meta name="msapplication-TileColor" content="#2563eb" />
//         <meta name="msapplication-config" content="/browserconfig.xml" />
//         <style>{`
// html {
//   font-family: ${inter.style.fontFamily}, ${poppins.style.fontFamily};
//   --font-sans: ${inter.variable};
//   --font-mono: ${poppins.variable};
// }
//         `}</style>
//       </head>
//       <body className="font-sans">
//         <PWAWrapper>
//           <Navbar />
//           {children}
//         </PWAWrapper>
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `
//             (function(){
//               if (!('Notification' in window)) return;
//               // Example: hydrate reminders from localStorage (could be replaced with API)
//               const stored = localStorage.getItem('rxmind_reminders');
//               let reminders = [];
//               try { reminders = stored ? JSON.parse(stored) : []; } catch {}
//               // minimal inline scheduler using the same logic
//               function speak(text){ try{ const u=new SpeechSynthesisUtterance(text); u.lang='en-US'; speechSynthesis.speak(u);}catch{}}
//               function tick(){
//                 const now = Date.now();
//                 reminders.forEach(r=>{
//                   if (now >= r.time && now - r.time < 60000) {
//                     try { new Notification(r.title || 'Medicine Reminder', { body: r.message || 'Time to take your medicine.' }); } catch {}
//                     speak(r.message || 'Time to take your medicine');
//                   }
//                 });
//               }
//               setInterval(tick, 30000);
//             })();
//           `}}
//         />
//       </body>
//     </html>
//   )
// }

import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Poppins } from "next/font/google"
import { PWAWrapper } from "@/components/pwa/pwa-wrapper"
import { Navbar } from "@/components/navbar"
import "./globals.css"
import ConnectionBanner from "@/components/connectionBanner"
import { AuthProvider } from "@/contexts/AuthContext"

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
    "Seamlessly manage your medications, set personalized reminders, and track your health with RxCare - your trusted partner in well-being.",
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
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </PWAWrapper>
        <ConnectionBanner />
      </body>
    </html>
  )
}
