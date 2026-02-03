import React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getServiceBySlug, getAllServiceSlugs, SERVICES_EXTENDED } from "@/lib/services-data"
import { SERVICE_AREAS, BUSINESS_INFO } from "@/lib/constants"

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

// Generate static params for all service slugs
export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({
    slug,
  }))
}

// Dynamic metadata generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return {
      title: "Service Not Found - WT Landscaping",
    }
  }

  const allCities = [...SERVICE_AREAS.full, ...SERVICE_AREAS.mulchOnly]

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: [
      `${service.shortTitle.toLowerCase()} cleveland`,
      `${service.shortTitle.toLowerCase()} north royalton`,
      `${service.shortTitle.toLowerCase()} parma`,
      `${service.shortTitle.toLowerCase()} strongsville`,
      "landscaping cleveland suburbs",
      "property maintenance ohio",
    ],
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      images: [{ url: service.image || "/og-image.jpg", width: 1200, height: 630 }],
      type: "website",
    },
    alternates: {
      canonical: `https://wtlandscaping.com/services/${service.slug}`,
    },
  }
}

export default async function ServiceLayout({ children, params }: LayoutProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const allCities = [...SERVICE_AREAS.full, ...SERVICE_AREAS.mulchOnly]

  // JSON-LD Schema for this specific service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": BUSINESS_INFO.name,
      "telephone": BUSINESS_INFO.phone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": BUSINESS_INFO.address.street,
        "addressLocality": BUSINESS_INFO.address.city,
        "addressRegion": BUSINESS_INFO.address.state,
        "postalCode": BUSINESS_INFO.address.zip,
      },
    },
    "areaServed": allCities.map((city) => ({
      "@type": "City",
      "name": city,
    })),
    "serviceType": service.title,
  }

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  }

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://wtlandscaping.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://wtlandscaping.com/services",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.shortTitle,
        "item": `https://wtlandscaping.com/services/${service.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
