import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Professional Landscaping Services - WT Landscaping - Lawn Care, Mulching & Snow Removal Cleveland",
  description: "Explore WT Landscaping's professional services: lawn mowing, mulch installation, hedge trimming, seasonal cleanups, and 24/7 snow removal in Strongsville, Parma, North Royalton & Cleveland suburbs. Free quotes!",
  keywords: [
    "landscaping services Cleveland",
    "lawn mowing Strongsville",
    "mulch installation Kent Ohio",
    "snow removal Parma",
    "hedge trimming North Royalton",
    "seasonal cleanup Cleveland suburbs",
  ],
  openGraph: {
    title: "Professional Landscaping Services - WT Landscaping",
    description: "From precision lawn mowing to professional mulch installation, WT Landscaping provides elite, year-round care for your property in Cleveland suburbs.",
    images: [{ url: "/og-services.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  alternates: {
    canonical: "https://wtlandscaping.com/services",
  },
}

// JSON-LD Schema for Services
const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Landscaping and Property Maintenance",
  "provider": {
    "@type": "LocalBusiness",
    "name": "WT Landscaping",
    "telephone": "440-429-7313",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "North Royalton",
      "addressRegion": "OH",
      "postalCode": "44133",
    },
  },
  "areaServed": [
    { "@type": "City", "name": "North Royalton" },
    { "@type": "City", "name": "Parma" },
    { "@type": "City", "name": "Strongsville" },
    { "@type": "City", "name": "Brecksville" },
    { "@type": "City", "name": "Broadview Heights" },
    { "@type": "City", "name": "Brooklyn" },
    { "@type": "City", "name": "Middleburg Heights" },
    { "@type": "City", "name": "Garfield Heights" },
    { "@type": "City", "name": "Maple Heights" },
    { "@type": "City", "name": "Old Brooklyn" },
    { "@type": "City", "name": "Kent" },
    { "@type": "City", "name": "Stow" },
    { "@type": "City", "name": "Aurora" },
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Landscaping Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Lawn Mowing & Edging",
          "description": "Precision cuts and crisp edges for a manicured look in the Cleveland suburbs.",
        },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Mulch Installation",
          "description": "Premium double-shredded mulch delivered and installed in Kent, Stow, and Aurora.",
        },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Hedge Trimming",
          "description": "Professional pruning and shaping to enhance your property's curb appeal.",
        },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Seasonal Cleanups",
          "description": "Comprehensive leaf removal and bed clearing for Spring and Fall.",
        },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Snow Removal",
          "description": "Reliable 24/7 driveway and sidewalk clearing for safe winter access.",
        },
      },
    ],
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      {children}
    </>
  )
}
