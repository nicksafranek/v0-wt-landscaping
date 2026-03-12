import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Bebas_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'

import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ["latin"],
  variable: '--font-bebas',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "BEST Landscaping Cleveland - WT Property Maintenance Provides Expert Lawn Care, Mowing, Mulching, Fall And Spring Cleanups, Hedge Trimming, & Snow Removal Near Me. Call Today for a Free Estimate",
  description: "Transform your home’s curb appeal with WT Property Maintenance. From picture-perfect mulch beds to reliable snow removal, we provide elite, year-round care in Cleveland. Get your free estimate today!",
  robots: 'index, follow',
  alternates: {
    canonical: 'https://wtlandscaping.com',
  },
  openGraph: {
    title: "BEST Landscaping Cleveland - WT Property Maintenance Provides Expert Lawn Care, Mowing, Mulching, Fall And Spring Cleanups, Hedge Trimming, & Snow Removal Near Me. Call Today for a Free Estimate",
    description: "Experience the excitement of a perfectly maintained yard. Elite landscaping and year-round property care for North Royalton and the Cleveland suburbs.",
    images: [{ url: '/images/WT_Landscaping/hero-background.webp', width: 1200, height: 630 }],
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/favicon-brand.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: [
      { url: '/favicon-brand.svg' },
    ],
    shortcut: '/favicon-brand.svg',
  },
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "WT Property Maintenance",
              "description": "Professional landscaping and snow removal services in Cleveland suburbs",
              "telephone": "440-429-7313",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "[Street Address]",
                "addressLocality": "North Royalton",
                "addressRegion": "OH",
                "postalCode": "44133"
              },
              "areaServed": [
                "North Royalton", "Parma", "Garfield Heights", "Maple Heights",
                "Strongsville", "Brecksville", "Broadview Heights", "Brooklyn",
                "Old Brooklyn", "Middleburg Heights", "Kent", "Stow", "Aurora"
              ],
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "00:00",
                "closes": "23:59"
              },
              "serviceType": ["Lawn Mowing", "Mulch Installation", "Hedge Trimming", "Seasonal Cleanups", "Snow Removal"]
            })
          }}
        />
        {/* GA4 Placeholder */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Google Analytics 4 Placeholder
              // Replace with actual GA4 tracking code
              // window.dataLayer = window.dataLayer || [];
              // function gtag(){dataLayer.push(arguments);}
              // gtag('js', new Date());
              // gtag('config', 'G-XXXXXXXXXX');
            `
          }}
        />
      </head>
      <body className={`${inter.variable} ${bebasNeue.variable} font-sans antialiased md:pb-0 [scrollbar-gutter:stable]`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
