import React from "react"
import type { Metadata } from 'next'
import { Inter, Bebas_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
  title: 'BEST Landscaping & Snow Removal Cleveland Suburbs - WT Landscaping - Professional Lawn Mowing, Edging, Mulch & Cleanup Near Me',
  description: 'WT Landscaping offers elite, year-round property care in Strongsville, Parma, & North Royalton. Get expert lawn mowing, mulch installation, & 24/7 snow removal. Schedule your free quote today!',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://wtlandscaping.com',
  },
  openGraph: {
    title: 'BEST Landscaping & Snow Removal Cleveland Suburbs - WT Landscaping',
    description: 'Elite year-round property care in Cleveland suburbs. Expert lawn mowing, mulch installation, & 24/7 snow removal.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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
              "name": "WT Landscaping",
              "description": "Professional landscaping and snow removal services in Cleveland suburbs",
              "telephone": "440-429-7313",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "[Street Address]",
                "addressLocality": "Kent",
                "addressRegion": "OH",
                "postalCode": "44240"
              },
              "areaServed": [
                "North Royalton", "Parma", "Garfield Heights", "Maple Heights",
                "Strongsville", "Brecksville", "Broadview Heights", "Brooklyn",
                "Old Brooklyn", "Middleburg Heights", "Kent", "Stow", "Aurora"
              ],
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
      <body className={`${inter.variable} ${bebasNeue.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
