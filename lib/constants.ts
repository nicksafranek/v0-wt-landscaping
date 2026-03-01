import { GiFarmTractor, GiWheelbarrow, GiRake, GiShears } from 'react-icons/gi'
import { BsSnow } from 'react-icons/bs'
import { PiPark } from 'react-icons/pi'
import type { IconType } from 'react-icons'
import type { LucideIcon } from 'lucide-react'
import type { Variants } from 'framer-motion'

// Business Information - Centralized for easy editing
export const BUSINESS_INFO = {
  name: "WT Property Maintenance",
  phone: "440-429-7313",
  phoneFormatted: "(440) 429-7313",
  address: {
    street: "",
    city: "North Royalton",
    state: "OH",
    zip: "44133",
  },
  hours: "Available 24/7",
  email: "nick@wtpropertymaintenance.com",
  social: {
    facebook: "https://www.facebook.com/people/WT-Property-Maintenance/61588506766745/",
  }
} as const

// Service Areas Configuration
// Service Areas Configuration
export const SERVICE_AREAS = {
  full: [
    "North Royalton",
    "Broadview Heights",
    "Brecksville",
    "Strongsville",
    "Parma",
    "Independence",
    "Seven Hills",
    "Middleburg Heights",
    "Brooklyn",
    "Old Brooklyn",
    "Garfield Heights",
    "Maple Heights",
  ],
  mulchOnly: [
    "Cuyahoga County",
    "Summit County",
    "Portage County",
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
  icon: IconType | LucideIcon
}

export const SERVICES: Service[] = [
  {
    id: "mowing",
    slug: "lawn-mowing",
    title: "Lawn Mowing & Edging",
    description: "Reclaim your weekends with precision mowing that gives your lawn a crisp, professional finish.",
    icon: GiFarmTractor,
  },
  {
    id: "mulch",
    slug: "mulch-installation",
    title: "Mulch Installation",
    description: "Instantly refresh your landscape beds with premium mulch, installed to perfection.",
    icon: GiWheelbarrow,
  },
  {
    id: "cleanups",
    slug: "seasonal-cleanups",
    title: "Seasonal Cleanups",
    description: "Prepare your property for the changing seasons with a complete, detail-oriented cleanup.",
    icon: GiRake,
  },
  {
    id: "trimming",
    slug: "hedge-trimming",
    title: "Hedge Trimming",
    description: "Restore the natural beauty of your shrubs with artistic, health-focused pruning.",
    icon: GiShears,
  },
  {
    id: "snow",
    slug: "snow-removal",
    title: "Snow Removal",
    description: "Sleep soundly knowing your driveway will be clear and safe before you leave for work.",
    icon: BsSnow,
  },
] as const

// Extended service data with images and features for detailed cards
export const SERVICES_EXTENDED = [
  {
    ...SERVICES[0],
    image: "/images/WT_Landscaping/stripes-1.webp",
    valueProposition: "Instant satisfaction each time you pull in the driveway",
    features: ["Weekly/Bi-Weekly Cuts", "Detailed Edging", "Debris Cleanup"],
  },
  {
    ...SERVICES[1],
    image: "/images/WT_Landscaping/Detroit-Mulch-Installation.webp",
    valueProposition: "Picture perfect beds that elevate curb appeal all year",
    features: ["Bed Edging & Shaping", "Custom Texture", "Weed Barrier Available"],
  },
  {
    ...SERVICES[2],
    image: "/images/WT_Landscaping/CU-BG1.webp",
    valueProposition: "A fresh landscape that's prepared for the next season",
    features: ["Leaf Removal & Disposal", "Bed Preparation", "Patio Clearing"],
  },
  {
    ...SERVICES[3],
    image: "/images/WT_Landscaping/content-shrub-trimming-1.webp",
    valueProposition: "Neatly shaped and designed to catch eyes",
    features: ["Precise Shaping", "Seasonal Timing", "Pre-Cleaned Equipment"],
  },
  {
    ...SERVICES[4],
    image: "/images/WT_Landscaping/snow-clearing-screenshot.webp",
    valueProposition: "Wake up to a clear driveway at the press of a button",
    features: ["24/7 Service", "Driveways, Sidewalks & Front Steps", "Rock Salt Per Request"],
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
  title: "Landscaping & Snow Removal Cleveland",
  subtitle: "Year-Round Property Care: Lawn Mowing, Mulch Installation, Seasonal Cleanups, Hedge Trimming, and Snow Removal",
  ctaText: "Get Your Free Quote",
  secondaryCta: "Call/Text:",
} as const

// SEO Metadata - separate from visible content
export const SEO_METADATA = {
  title: "BEST Landscaping Cleveland - WT Property Maintenance Provides Expert Lawn Care, Mowing, Mulching, Fall And Spring Cleanups, Hedge Trimming, & Snow Removal Near Me. Call Today for a Free Estimate",
  description: "WT Property Maintenance offers elite, year-round property care in Strongsville, Parma, & North Royalton. Get expert lawn mowing, mulch installation, & 24/7 snow removal. Schedule your free quote today!",
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
    quote: "WT Property Maintenance transformed our backyard in Strongsville. They were on time, professional, and the mulch looks incredible. Highly recommend!",
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
export const ANIMATION_VARIANTS: Record<string, any> = {
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
}
