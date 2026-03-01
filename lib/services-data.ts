import { SERVICES } from "./constants"

// Extended service data for individual service pages (Rank 2 Child SEO Authority)
export interface ServiceExtended {
  id: string
  slug: string
  title: string
  shortTitle: string
  description: string
  servicePageDescription: string
  image: string
  icon: typeof SERVICES[number]["icon"]
  valueProposition: string
  features: string[]
  // SEO fields
  metaTitle: string
  metaDescription: string
  // Long-form content sections
  heroTagline: string
  heroTitle?: string
  introContent: string
  // Process steps for "How It Works" section
  processSteps: {
    step: number
    title: string
    description: string
  }[]
  // Benefits for extended content
  benefits: {
    title: string
    description: string
  }[]
  // FAQ items for schema markup
  faqs: {
    question: string
    answer: string
  }[]
}

export const SERVICES_EXTENDED: ServiceExtended[] = [
  {
    ...SERVICES[0],
    slug: "lawn-mowing",
    shortTitle: "Lawn Mowing",
    image: "/images/WT_Landscaping/stripes-1.webp",
    valueProposition: "Consistent, reliability you can set your watch to",
    servicePageDescription: "We know your lawn is the first thing people notice about your property. It's our goal to create a look that makes a lasting impression on neighbors and guests alike.",
    features: ["Weekly/Bi-Weekly Cuts", "Detailed Edging", "Weed Eating", "Debris Cleanup", "Seasonal Height Adjustments"],
    metaTitle: "Lawn Mowing & Edging North Royalton | WT Property Maintenance",
    metaDescription: "Keep your yard looking sharp without lifting a finger. WT Property Maintenance provides precision lawn mowing and professional edging in North Royalton. Get a reliable, picture-perfect cut every week—schedule your free estimate today!",
    heroTagline: "Precision Lawn Care for Cleveland's Finest Properties",
    heroTitle: "Professional Lawn Mowing & Edging in Cleveland",
    introContent: "A well-maintained lawn is the foundation of exceptional curb appeal. At WT Property Maintenance, we combine commercial-grade equipment with years of expertise to deliver the pristine, manicured look your property deserves. Our professional lawn mowing and edging services transform ordinary yards into neighborhood standouts in the greater Cleveland area.",
    processSteps: [
      { step: 1, title: "Initial Assessment", description: "We evaluate your lawn's size and condition to create a customized mowing plan." },
      { step: 2, title: "Scheduling Setup", description: "Choose weekly or bi-weekly service that fits your lifestyle and lawn's growth rate." },
      { step: 3, title: "Professional Execution", description: "Our crew arrives on time, mows to the optimal height, and edges all borders with precision." },
      { step: 4, title: "Cleanup & Inspection", description: "We blow off all walkways and driveways, leaving your property spotless." },
    ],
    benefits: [
      { title: "Attention to Detail", description: "We trim around every obstacle and edge every border for a complete, professional finish." },
      { title: "Sharp Blades Always", description: "Our equipment is regularly maintained for clean cuts each visit." },
      { title: "Consistent Schedule", description: "Our team arrives on the same scheduled day each week for predictable, worry-free service." },
      { title: "No Contracts Required", description: "Enjoy professional service without long-term commitments." },
    ],
    faqs: [
      { question: "How often should I have my lawn mowed?", answer: "For most Ohio lawns, weekly mowing during the growing season (April-November) promotes healthy grass for the long term." },
      { question: "Do you bag or mulch clippings?", answer: "We recommend mulching as it returns nutrients to your soil. However, we can bag clippings upon request for an additional fee." },
      { question: "What if it rains on my scheduled day?", answer: "We monitor weather closely and will reschedule your service to the next available day, typically within 24-48 hours." },
    ],
  },
  {
    ...SERVICES[1],
    slug: "mulch-installation",
    shortTitle: "Mulch Installation",
    image: "/images/WT_Landscaping/Detroit-Mulch-Installation.webp",
    valueProposition: "Picture perfect beds that elevate curb appeal all year",
    servicePageDescription: "More than just spreading mulch, we redefine your landscape beds. From crisp edge trenching to precise material application, we ensure a clean, weed-suppressing finish that lasts.",
    features: ["Bed Edging & Shaping", "Custom Texture", "Weed Barrier Available", "Color Options Available", "Bulk Delivery"],
    metaTitle: "Mulch Installation North Royalton | WT Property Maintenance",
    metaDescription: "Upgrade your curb appeal with professional mulch installation and precision bed edging in North Royalton. Get picture-perfect, sharp-edged beds that stay beautiful all year. Protect your landscape and save time—request your free mulch estimate today!",
    heroTagline: "Premium Mulch Installation for Stunning Landscape Beds",
    heroTitle: "Expert Mulch Installation in Cleveland",
    introContent: "Transform your landscape beds with professional mulch installation from WT Property Maintenance. We specialize in premium double-shredded mulch of any color that not only enhances your property's appearance but also protects your plants and soil. Serving Northeast Ohio, we handle everything from delivery to installation.",
    processSteps: [
      { step: 1, title: "Bed Evaluation", description: "We determine yardage and take note of any specific request." },
      { step: 2, title: "Material Selection", description: "Choose your mulch color and texture." },
      { step: 3, title: "Bed Preparation", description: "We clean the beds if needed, define edges, and install weed barrier upon request." },
      { step: 4, title: "Expert Installation", description: "Mulch is spread to the ideal 2-3 inch depth, keeping it away from plant stems and tree trunks." },
    ],
    benefits: [
      { title: "Curb Appeal", description: "Fresh mulch instantly elevates your property's appearance and value." },
      { title: "Weed Suppression", description: "Proper mulch depth blocks sunlight, dramatically reducing weed growth." },
      { title: "Moisture Retention", description: "Mulch acts as insulation, keeping soil moist and reducing watering needs." },
      { title: "Temperature Control", description: "Protects roots from extreme heat in summer and cold in winter." },
    ],
    faqs: [
      { question: "How much mulch do I need?", answer: "We calculate based on your bed square footage. Generally, 1 cubic yard covers about 100 square feet at 3 inches deep." },
      { question: "How often should mulch be replaced?", answer: "We recommend refreshing mulch annually in spring. A light top-dressing maintains the 2-3 inch ideal depth." },
      { question: "Do you remove old mulch first?", answer: "It depends on the condition. If existing mulch is heavily decomposed or diseased, removal is recommended. Otherwise, we can top-dress." },
    ],
  },
  {
    ...SERVICES[2],
    slug: "seasonal-cleanups",
    shortTitle: "Seasonal Cleanups",
    image: "/images/WT_Landscaping/CU-BG1.webp",
    valueProposition: "A fresh landscape that's prepared for the next season",
    servicePageDescription: "Don't let leaves and debris suffocate your lawn. Our comprehensive cleanups clear every corner of your property, preventing mold and preparing your landscape for vigorous spring growth.",
    features: ["Leaf Removal & Disposal", "Bed Preparation", "Patio Clearing", "Fertilization Available", "Gutter Clearing Available"],
    metaTitle: "Fall & Spring Cleanups North Royalton | WT Property Maintenance",
    metaDescription: "Clear the leaves and prep your property for the season with professional spring and fall cleanups in North Royalton. From debris removal to final bed prep, WT Property Maintenance handles the heavy lifting. Get your yard season-ready—call for a free estimate today!",
    heroTagline: "Comprehensive Seasonal Cleanups for Year-Round Beauty",
    heroTitle: "Fall & Spring Cleanups for Cleveland Homeowners",
    introContent: "Seasonal transitions demand attention to keep your landscape healthy and attractive. WT Property Maintenance's comprehensive cleanup services prepare your property for spring growth and protect it through winter dormancy. We handle everything from leaf removal to perennial cutbacks, ensuring your property is always ready for the next season.",
    processSteps: [
      { step: 1, title: "Property Survey", description: "We walk your property to identify all areas needing attention and note any concerns." },
      { step: 2, title: "Debris Removal", description: "Leaves, sticks, and accumulated debris are cleared from lawns, beds, and hardscapes." },
      { step: 3, title: "Lawn Preparation", description: "Upon request we fertilize/winterize your lawn to prepare for the next growing season." },
      { step: 4, title: "Final Touches", description: "Gutters are cleared (if requested), walkways are blown clean, and everything is hauled away." },
    ],
    benefits: [
      { title: "Lawn Health", description: "Removing leaves prevents suffocation and fungal disease in your turf." },
      { title: "Pest Prevention", description: "Debris removal eliminates overwintering spots for insects and rodents." },
      { title: "Spring Head Start", description: "Fall cleanup means your property is ready to shine when spring arrives." },
      { title: "Time Savings", description: "Let us handle the heavy work while you enjoy your weekends." },
    ],
    faqs: [
      { question: "When should I schedule fall cleanup?", answer: "We recommend keeping up with leaves throughout the fall with multiple cleanups, or one big cleanup after the majority of leaves have fallen." },
      { question: "Why should I choose a professional cleanup over doing it myself?", answer: "Professional equipment (like high-velocity blowers) can extract debris from deep within mulch beds and under decks that a standard rake simply can’t reach. Plus, we handle the heavy lifting and disposal, giving you your entire weekend back." },
      { question: "Do you haul away all the debris?", answer: "Yes, all debris is loaded and hauled away. We leave your property completely clean and ready for the season." },
    ],
  },
  {
    ...SERVICES[3],
    slug: "hedge-trimming",
    shortTitle: "Hedge Trimming",
    image: "/images/WT_Landscaping/content-shrub-trimming-1.webp",
    valueProposition: "Sharp edges. Healthy plants. No guesswork",
    servicePageDescription: "Overgrown shrubs can hide your home's beauty. We expertly shape and prune your hedges to strictly maintain their health while enhancing your property's architectural lines.",
    features: ["Precise Shaping", "Seasonal Timing", "Pre-Cleaned Equipment", "All Shrub Types", "Debris Clearing"],
    metaTitle: "Hedge Trimming North Royalton | WT Property Maintenance",
    metaDescription: "Give your property a sharp, professional finish with precision hedge trimming and shrub care in North Royalton. We shape your landscape for maximum curb appeal and healthy growth. Get defined, picture-perfect hedges—request your free estimate today!",
    heroTagline: "Expert Hedge Trimming for Picture-Perfect Properties",
    heroTitle: "Professional Hedge Trimming in Cleveland",
    introContent: "Well-manicured hedges and shrubs are the finishing touch that separates good landscaping from great landscaping. WT Property Maintenance's professional hedge trimming services combine artistic shaping with horticultural expertise to keep your plants healthy and your property looking impeccable throughout the growing season.",
    processSteps: [
      { step: 1, title: "Plant Assessment", description: "We determine the best trimming approach for each plant's health." },
      { step: 2, title: "Timing Coordination", description: "We schedule trimming at optimal times based on the season." },
      { step: 3, title: "Precision Trimming", description: "Using professional equipment, we shape hedges while maintaining plant health and natural form." },
      { step: 4, title: "Complete Cleanup", description: "All clippings are collected and hauled away, leaving your property pristine." },
    ],
    benefits: [
      { title: "Promotes Growth", description: "Proper pruning stimulates healthy new growth and denser foliage." },
      { title: "Disease Prevention", description: "Removing dead or crossing branches improves air circulation and reduces disease." },
      { title: "Shape Maintenance", description: "Regular trimming keeps hedges in their intended form and size." },
      { title: "Property Value", description: "Well-maintained shrubs significantly enhance curb appeal and property value." },
    ],
    faqs: [
      { question: "When is the best time to trim hedges?", answer: "Most hedges benefit from trimming in late spring after new growth emerges, then maintaining throughout the summer." },
      { question: "Can you reshape overgrown shrubs?", answer: "Yes, overgrown hedges can be restored in one visit." },
      { question: "Do you trim all types of shrubs?", answer: "Absolutely. Our team is trained on all common Cleveland-area shrubs including boxwood, arborvitae, privet, yew, and flowering shrubs like hydrangeas." },
    ],
  },
  {
    ...SERVICES[4],
    slug: "snow-removal",
    shortTitle: "Snow Removal",
    image: "/images/WT_Landscaping/snow-clearing-screenshot.webp",
    valueProposition: "Complete reliability when it matters most",
    servicePageDescription: "Winter in Northeast Ohio is unpredictable; our service isn't. We trigger operations automatically at a set number of inches, ensuring you never have to shovel before your morning commute.",
    features: ["24/7 Service", "Driveways, Sidewalks & Front Steps", "Rock Salt Per Request", "Seasonal Contracts Available", "Per-Push Available"],
    metaTitle: "Snow Removal North Royalton | WT Property Maintenance",
    metaDescription: "Clear your driveway and stay safe this winter with reliable 24/7 snow removal in North Royalton. From residential plowing to sidewalk clearing, we ensure you’re never snowed in. Get dependable winter property care—request your free estimate today!",
    heroTagline: "Dedicated Service for Safe Winter Access",
    heroTitle: "24/7 Snow Removal in Cleveland",
    introContent: "Cleveland winters demand reliable snow removal you can count on. WT Property Maintenance provides prompt, thorough snow clearing services to keep your property safe and accessible throughout the winter season. From the first flurries to the last spring snow, our team is ready 24/7 to handle whatever Mother Nature delivers.",
    processSteps: [
      { step: 1, title: "Weather Monitoring", description: "We track storms closely and position crews for rapid deployment when snow begins." },
      { step: 2, title: "Timely Dispatch", description: "Our crews are dispatched based on accumulation triggers you set (typically 2-3 inches)." },
      { step: 3, title: "Thorough Clearing", description: "Driveways, walkways, and steps are cleared completely with attention to detail." },
      { step: 4, title: "Ice Treatment", description: "Rock salt is applied by request to prevent refreezing and ensure safe surfaces." },
    ],
    benefits: [
      { title: "24/7 Availability", description: "Snow doesn't follow business hours, and neither do we during winter storms." },
      { title: "Liability Protection", description: "Keep your property safe and reduce slip-and-fall risk for family and visitors." },
      { title: "Consistent Service", description: "Same crew, same quality, all winter long. One phone call away." },
      { title: "Flexible Options", description: "Choose seasonal contracts for peace of mind or per-push service as needed." },
    ],
    faqs: [
      { question: "At what snowfall amount do you come out?", answer: "Standard trigger is 2 inches, but we can customize based on your needs. Some clients prefer 1-inch triggers for cleaner surfaces." },
      { question: "Do you offer seasonal contracts?", answer: "Yes, seasonal contracts provide unlimited service for a fixed monthly rate, giving you predictable costs and guaranteed priority service." },
      { question: "What areas do you clear?", answer: "We clear driveways, walkways, front steps, and can include back patios or additional areas. We'll customize service to your property's needs." },
    ],
  },
]

// Helper to find service by slug
export function getServiceBySlug(slug: string): ServiceExtended | undefined {
  return SERVICES_EXTENDED.find(service => service.slug === slug)
}

// Get all service slugs for static generation
export function getAllServiceSlugs(): string[] {
  return SERVICES_EXTENDED.map(service => service.slug)
}

// Get related services (all except current)
export function getRelatedServices(currentSlug: string): ServiceExtended[] {
  return SERVICES_EXTENDED.filter(service => service.slug !== currentSlug)
}
