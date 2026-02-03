import { SERVICES } from "./constants"

// Extended service data for individual service pages (Rank 2 Child SEO Authority)
export interface ServiceExtended {
  id: string
  slug: string
  title: string
  shortTitle: string
  description: string
  image: string
  icon: typeof SERVICES[number]["icon"]
  valueProposition: string
  features: string[]
  // SEO fields
  metaTitle: string
  metaDescription: string
  // Long-form content sections
  heroTagline: string
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
    image: "/images/services/lawn-mowing.webp",
    valueProposition: "We use commercial-grade equipment and proven techniques to deliver consistent, quality results every visit.",
    features: ["Weekly/bi-weekly scheduling", "Crisp edging included", "Debris cleanup after each visit", "Striping patterns available", "Height customization"],
    metaTitle: "BEST Lawn Mowing & Edging Cleveland Suburbs - WT Landscaping",
    metaDescription: "Professional lawn mowing and edging services in North Royalton, Parma, Strongsville & Cleveland suburbs. Precision cuts, crisp edges, weekly scheduling. Free quotes!",
    heroTagline: "Precision Lawn Care for Cleveland's Finest Properties",
    introContent: "A well-maintained lawn is the foundation of exceptional curb appeal. At WT Landscaping, we combine commercial-grade equipment with decades of expertise to deliver the pristine, manicured look your property deserves. Our professional lawn mowing and edging services transform ordinary yards into neighborhood standouts throughout North Royalton, Parma, Strongsville, and the greater Cleveland area.",
    processSteps: [
      { step: 1, title: "Initial Assessment", description: "We evaluate your lawn's size, grass type, and condition to create a customized mowing plan." },
      { step: 2, title: "Scheduling Setup", description: "Choose weekly or bi-weekly service that fits your lifestyle and lawn's growth rate." },
      { step: 3, title: "Professional Execution", description: "Our crew arrives on time, mows to the optimal height, and edges all borders with precision." },
      { step: 4, title: "Cleanup & Inspection", description: "We blow off all walkways and driveways, leaving your property spotless." },
    ],
    benefits: [
      { title: "Consistent Height", description: "We never cut more than 1/3 of the grass blade, promoting healthier root systems." },
      { title: "Sharp Blades Always", description: "Our equipment is maintained daily for clean cuts that prevent disease." },
      { title: "Flexible Scheduling", description: "We work around your schedule with reliable arrival windows." },
      { title: "No Contracts Required", description: "Enjoy professional service without long-term commitments." },
    ],
    faqs: [
      { question: "How often should I have my lawn mowed?", answer: "For most Cleveland-area lawns, weekly mowing during peak growing season (May-September) and bi-weekly during spring and fall provides optimal results." },
      { question: "Do you bag or mulch clippings?", answer: "We recommend mulching as it returns nutrients to your soil. However, we can bag clippings upon request for an additional fee." },
      { question: "What if it rains on my scheduled day?", answer: "We monitor weather closely and will reschedule your service to the next available day, typically within 24-48 hours." },
    ],
  },
  {
    ...SERVICES[1],
    slug: "mulch",
    shortTitle: "Mulch Installation",
    image: "/images/services/mulch-installation.webp",
    valueProposition: "Our team handles everything from delivery to installation, ensuring proper depth and coverage for lasting curb appeal.",
    features: ["Premium double-shredded mulch", "Weed barrier available", "Bed edging & shaping", "Color options available", "Bulk delivery"],
    metaTitle: "BEST Mulch Installation Kent, Stow, Aurora & Cleveland - WT Landscaping",
    metaDescription: "Professional mulch installation and delivery in Kent, Stow, Aurora & Cleveland suburbs. Premium double-shredded mulch, bed edging, weed barriers. Free estimates!",
    heroTagline: "Premium Mulch Installation for Stunning Landscape Beds",
    introContent: "Transform your landscape beds with professional mulch installation from WT Landscaping. We specialize in premium double-shredded hardwood mulch that not only enhances your property's appearance but also protects your plants and soil. Serving Kent, Stow, Aurora, and the greater Cleveland area, we handle everything from delivery to expert installation.",
    processSteps: [
      { step: 1, title: "Bed Evaluation", description: "We measure your beds and assess current conditions, noting any edging or prep work needed." },
      { step: 2, title: "Material Selection", description: "Choose from our premium mulch colors: natural brown, black, or red-dyed options." },
      { step: 3, title: "Bed Preparation", description: "We remove old mulch if needed, define edges, and install weed barrier upon request." },
      { step: 4, title: "Expert Installation", description: "Mulch is spread to the ideal 2-3 inch depth, keeping it away from plant stems and tree trunks." },
    ],
    benefits: [
      { title: "Weed Suppression", description: "Proper mulch depth blocks sunlight, dramatically reducing weed growth." },
      { title: "Moisture Retention", description: "Mulch acts as insulation, keeping soil moist and reducing watering needs." },
      { title: "Temperature Control", description: "Protects roots from extreme heat in summer and cold in winter." },
      { title: "Curb Appeal", description: "Fresh mulch instantly elevates your property's appearance and value." },
    ],
    faqs: [
      { question: "How much mulch do I need?", answer: "We calculate based on your bed square footage. Generally, 1 cubic yard covers about 100 square feet at 3 inches deep." },
      { question: "How often should mulch be replaced?", answer: "We recommend refreshing mulch annually in spring. A light top-dressing maintains the 2-3 inch ideal depth." },
      { question: "Do you remove old mulch first?", answer: "It depends on the condition. If existing mulch is heavily decomposed or diseased, removal is recommended. Otherwise, we can top-dress." },
    ],
  },
  {
    ...SERVICES[2],
    slug: "trimming",
    shortTitle: "Hedge Trimming",
    image: "/images/services/hedge-trimming.webp",
    valueProposition: "Regular maintenance keeps your hedges healthy and your property looking sharp throughout the growing season.",
    features: ["Precision shaping", "Plant health assessment", "Debris hauled away", "All shrub types", "Seasonal timing expertise"],
    metaTitle: "BEST Hedge Trimming & Shrub Pruning Cleveland - WT Landscaping",
    metaDescription: "Professional hedge trimming and shrub pruning in North Royalton, Parma, Strongsville & Cleveland suburbs. Precision shaping, plant health, debris removal. Free quotes!",
    heroTagline: "Expert Hedge Trimming for Picture-Perfect Properties",
    introContent: "Well-manicured hedges and shrubs are the finishing touch that separates good landscaping from great landscaping. WT Landscaping's professional hedge trimming services combine artistic shaping with horticultural expertise to keep your plants healthy and your property looking impeccable throughout the growing season.",
    processSteps: [
      { step: 1, title: "Plant Assessment", description: "We identify shrub species and determine the best trimming approach for each plant's health." },
      { step: 2, title: "Timing Coordination", description: "We schedule trimming at optimal times based on each plant's growth cycle and blooming period." },
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
      { question: "When is the best time to trim hedges?", answer: "Most hedges benefit from trimming in late spring after new growth emerges, with a second light trim in mid-summer. We avoid fall trimming which can stimulate tender growth before winter." },
      { question: "Can you reshape overgrown hedges?", answer: "Yes, though severely overgrown hedges may require renovation pruning over 2-3 seasons to restore their shape without shocking the plants." },
      { question: "Do you trim all types of shrubs?", answer: "Absolutely. Our team is trained on all common Cleveland-area shrubs including boxwood, arborvitae, privet, yew, and flowering shrubs like hydrangeas." },
    ],
  },
  {
    ...SERVICES[3],
    slug: "cleanups",
    shortTitle: "Seasonal Cleanups",
    image: "/images/services/seasonal-cleanup.webp",
    valueProposition: "We prepare your landscape for seasonal transitions with thorough debris removal and bed preparation.",
    features: ["Leaf removal & disposal", "Gutter clearing available", "Bed preparation", "Perennial cutback", "Debris hauling"],
    metaTitle: "BEST Spring & Fall Cleanup Cleveland Suburbs - WT Landscaping",
    metaDescription: "Professional seasonal cleanup services in North Royalton, Parma, Strongsville & Cleveland. Leaf removal, bed prep, gutter clearing. Spring & fall readiness. Free quotes!",
    heroTagline: "Comprehensive Seasonal Cleanups for Year-Round Beauty",
    introContent: "Seasonal transitions demand attention to keep your landscape healthy and attractive. WT Landscaping's comprehensive cleanup services prepare your property for spring growth and protect it through winter dormancy. We handle everything from leaf removal to perennial cutbacks, ensuring your Cleveland-area property is always ready for the next season.",
    processSteps: [
      { step: 1, title: "Property Survey", description: "We walk your property to identify all areas needing attention and note any concerns." },
      { step: 2, title: "Debris Removal", description: "Leaves, sticks, and accumulated debris are cleared from lawns, beds, and hardscapes." },
      { step: 3, title: "Bed Preparation", description: "We edge beds, cut back perennials, and prepare soil for the upcoming season." },
      { step: 4, title: "Final Touches", description: "Gutters are cleared (if requested), walkways are blown clean, and everything is hauled away." },
    ],
    benefits: [
      { title: "Lawn Health", description: "Removing leaves prevents suffocation and fungal disease in your turf." },
      { title: "Pest Prevention", description: "Debris removal eliminates overwintering spots for insects and rodents." },
      { title: "Spring Head Start", description: "Fall cleanup means your property is ready to shine when spring arrives." },
      { title: "Time Savings", description: "Let us handle the heavy work while you enjoy your weekends." },
    ],
    faqs: [
      { question: "When should I schedule fall cleanup?", answer: "We recommend scheduling after the majority of leaves have fallen, typically late October through mid-November in the Cleveland area." },
      { question: "What's included in spring cleanup?", answer: "Spring cleanup includes debris removal, bed edging, perennial cutback of remaining stalks, light pruning, and preparing beds for mulch or planting." },
      { question: "Do you haul away all the debris?", answer: "Yes, all debris is loaded and hauled away. We leave your property completely clean and ready for the season." },
    ],
  },
  {
    ...SERVICES[4],
    slug: "snow",
    shortTitle: "Snow Removal",
    image: "/images/services/snow-removal.webp",
    valueProposition: "Count on us for prompt response times and thorough clearing, keeping your property safe and accessible.",
    features: ["24/7 emergency service", "Driveways & sidewalks", "Salt/ice melt application", "Seasonal contracts", "Per-push available"],
    metaTitle: "BEST Snow Removal & Plowing Cleveland Suburbs - WT Landscaping",
    metaDescription: "Reliable 24/7 snow removal and plowing in North Royalton, Parma, Strongsville & Cleveland. Driveways, sidewalks, salt application. Seasonal contracts available!",
    heroTagline: "Reliable 24/7 Snow Removal for Safe Winter Access",
    introContent: "Cleveland winters demand reliable snow removal you can count on. WT Landscaping provides prompt, thorough snow clearing services to keep your property safe and accessible throughout the winter season. From the first flurries to the last spring snow, our team is ready 24/7 to handle whatever Mother Nature delivers.",
    processSteps: [
      { step: 1, title: "Weather Monitoring", description: "We track storms closely and position crews for rapid deployment when snow begins." },
      { step: 2, title: "Timely Dispatch", description: "Our crews are dispatched based on accumulation triggers you set (typically 2-3 inches)." },
      { step: 3, title: "Thorough Clearing", description: "Driveways, walkways, and steps are cleared completely with attention to detail." },
      { step: 4, title: "Ice Treatment", description: "Salt or ice melt is applied to prevent refreezing and ensure safe surfaces." },
    ],
    benefits: [
      { title: "24/7 Availability", description: "Snow doesn't follow business hours, and neither do we during winter storms." },
      { title: "Liability Protection", description: "Keep your property safe and reduce slip-and-fall risk for family and visitors." },
      { title: "Consistent Service", description: "Same crew, same quality, all winter long with seasonal contracts." },
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
