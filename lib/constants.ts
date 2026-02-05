import { Tractor, Shovel, Shrub, Leaf, Snowflake } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// Business Information - Centralized for easy editing
export const BUSINESS_INFO = {
  name: "WT Landscaping",
  phone: "440-429-7313",
  phoneFormatted: "(440) 429-7313",
  address: {
    street: "[Street Address]",
    city: "North Royalton",
    state: "OH",
    zip: "44133",
  },
  email: "info@wtlandscaping.com",
  social: {
    facebook: "https://facebook.com/wtlandscaping",
    instagram: "https://instagram.com/wtlandscaping",
  }
} as const

// Service Areas Configuration
export const SERVICE_AREAS = {
  full: [
    "North Royalton",
    "Parma",
    "Garfield Heights",
    "Maple Heights",
    "Strongsville",
    "Brecksville",
    "Broadview Heights",
    "Brooklyn",
    "Old Brooklyn",
    "Middleburg Heights",
  ],
  mulchOnly: [
    "Kent",
    "Stow",
    "Aurora",
  ],
} as const

// All cities combined for form dropdown
export const ALL_CITIES = [...SERVICE_AREAS.full, ...SERVICE_AREAS.mulchOnly] as const

// Helper to generate slug from city name
export function cityToSlug(city: string): string {
  return city.toLowerCase().replace(/\s+/g, '-')
}

// Services Configuration
export interface Service {
  id: string
  slug: string
  title: string
  description: string
  icon: LucideIcon
}

export const SERVICES: Service[] = [
  {
    id: "mowing",
    slug: "lawn-mowing",
    title: "Lawn Mowing & Edging",
    description: "Precision cuts and crisp edges for a manicured look in the Cleveland suburbs.",
    icon: Tractor,
  },
  {
    id: "mulch",
    slug: "mulch",
    title: "Mulch Installation",
    description: "Premium double-shredded mulch delivered and installed in Kent, Stow, and Aurora.",
    icon: Shovel,
  },
  {
    id: "trimming",
    slug: "trimming",
    title: "Hedge Trimming",
    description: "Professional pruning and shaping to enhance your property's curb appeal and plant health.",
    icon: Shrub,
  },
  {
    id: "cleanups",
    slug: "cleanups",
    title: "Seasonal Cleanups",
    description: "Comprehensive leaf removal and bed clearing for Spring and Fall readiness in Kent, Stow, and Aurora.",
    icon: Leaf,
  },
  {
    id: "snow",
    slug: "snow",
    title: "Snow Removal",
    description: "Reliable 24/7 driveway and sidewalk clearing for safe winter access in the Cleveland area.",
    icon: Snowflake,
  },
] as const

// Service options for form dropdown
export const SERVICE_OPTIONS = SERVICES.map(s => ({
  value: s.id,
  label: s.title,
}))

// Hero Content
export const HERO_CONTENT = {
  // Visible H1 heading - optimized for user readability
  title: "Landscaping & Snow Removal Cleveland Suburbs",
  subtitle: "WT Landscaping provides elite, year-round property maintenance. Serving North Royalton, Parma, Strongsville, Broadview Heights, and surrounding Cleveland suburbs. Professional mulch delivery available in Kent, Stow, and Aurora.",
  ctaText: "Get Your Free Quote",
  secondaryCta: "Call/Text:",
} as const

// SEO Metadata - separate from visible content
export const SEO_METADATA = {
  title: "BEST Landscaping & Snow Removal Cleveland Suburbs - WT Landscaping - Professional Lawn Mowing, Edging, Mulch & Cleanup Near Me",
  description: "WT Landscaping offers elite, year-round property care in Strongsville, Parma, & North Royalton. Get expert lawn mowing, mulch installation, & 24/7 snow removal. Schedule your free quote today!",
} as const

// Testimonials
export interface Testimonial {
  id: string
  quote: string
  author: string
  location: string
  rating: number
  image?: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote: "WT Landscaping transformed our backyard in Strongsville. They were on time, professional, and the mulch looks incredible. Highly recommend!",
    author: "Sarah M.",
    location: "Strongsville Resident",
    rating: 5,
    image: "/testimonials/sarah-m.webp",
  },
] as const

// Navigation Links
export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const

// Animation Variants for Framer Motion
export const ANIMATION_VARIANTS = {
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: i * 0.15, 
        duration: 0.5, 
        ease: "easeOut" 
      }
    })
  },
  staggerChildren: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  },
  scaleOnHover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  cardVariant: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  }
} as const
