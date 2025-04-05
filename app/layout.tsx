import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Russo_One } from "next/font/google"
import "./globals.css"
import { ThemeMeta } from "@/components/theme/theme-meta"
import { AuthProvider } from "@/components/theme/auth-provider"
import { ThemeProvider } from "@/components/theme/theme-provider"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const russoOne = Russo_One({
  variable: "--font-russo-one",
  weight: "400",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "SpotsAds",
  description: "SpotsAds",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SpotsAds",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${russoOne.variable} antialiased`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ThemeMeta />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
