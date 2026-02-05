"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { QuoteModal } from "@/components/ui/quote-modal"
import { QuoteDrawer } from "@/components/ui/quote-drawer"
import { Button } from "@/components/ui/button"
import { SERVICES, SERVICE_AREAS, cityToSlug, BUSINESS_INFO } from "@/lib/constants"
import { Check, Clock, Shield, Award, Phone, ArrowRight } from "lucide-react"

// Extended service data with images, features, and value propositions
const SERVICES_EXTENDED = [
  {
    ...SERVICES[0],
    image: "/images/services/lawn-mowing.webp",
    valueProposition: "We use commercial-grade equipment and proven techniques to deliver consistent, quality results every visit.",
    features: ["Weekly/bi-weekly scheduling", "Crisp edging included", "Debris cleanup after each visit"],
    slug: "lawn-mowing",
  },
  {
    ...SERVICES[1],
    image: "/images/services/mulch-installation.webp",
    valueProposition: "Our team handles everything from delivery to installation, ensuring proper depth and coverage for lasting curb appeal.",
    features: ["Premium double-shredded mulch", "Weed barrier available", "Bed edging & shaping"],
    slug: "mulch",
  },
  {
    ...SERVICES[2],
    image: "/images/services/hedge-trimming.webp",
    valueProposition: "Regular maintenance keeps your hedges healthy and your property looking sharp throughout the growing season.",
    features: ["Precision shaping", "Plant health assessment", "Debris hauled away"],
    slug: "trimming",
  },
  {
    ...SERVICES[3],
    image: "/images/services/seasonal-cleanup.webp",
    valueProposition: "We prepare your landscape for seasonal transitions with thorough debris removal and bed preparation.",
    features: ["Leaf removal & disposal", "Gutter clearing available", "Bed preparation"],
    slug: "cleanups",
  },
  {
    ...SERVICES[4],
    image: "/images/services/snow-removal.webp",
    valueProposition: "Count on us for prompt response times and thorough clearing, keeping your property safe and accessible.",
    features: ["24/7 emergency service", "Driveways & sidewalks", "Salt/ice melt application"],
    slug: "snow",
  },
]

// Why Choose Us features
const WHY_CHOOSE_US = [
  {
    icon: Clock,
    title: "Reliable & On-Time",
    description: "We show up when we say we will. Your schedule matters to us.",
  },
  {
    icon: Shield,
    title: "Fully Insured",
    description: "Licensed and insured for your peace of mind and protection.",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description: "We stand behind our work with a 100% satisfaction guarantee.",
  },
]

export default function ServicesPage() {
  const [quoteOpen, setQuoteOpen] = useState(false)
  const isMobile = useIsMobile()
  const prefersReducedMotion = useReducedMotion()

  const handleOpenQuote = () => setQuoteOpen(true)

  const allCities = [...SERVICE_AREAS.full, ...SERVICE_AREAS.mulchOnly]

  return (
    <>
      <Header onOpenQuote={handleOpenQuote} />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-[72px]">
          <div className="bg-ice dark:bg-charcoal/50 py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center"
              >
                <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-orange bg-orange/10 rounded-full">
                  Cleveland&apos;s Trusted Landscaping Experts
                </span>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground tracking-wide mb-6 text-balance">
                  Professional Landscaping & Property Maintenance Services
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                  From precision lawn mowing in Strongsville to professional mulch installation in Kent, 
                  WT Landscaping provides elite, year-round care for your property.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    onClick={handleOpenQuote}
                    size="lg"
                    className="bg-orange text-white hover:bg-orange-hover transition-colors font-semibold px-8"
                  >
                    Get Your Free Quote
                  </Button>
                  <Link
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="flex items-center gap-2 text-foreground hover:text-orange transition-colors font-medium"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call {BUSINESS_INFO.phoneFormatted}</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-12 md:py-16 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {WHY_CHOOSE_US.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-orange/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-orange" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid - Detailed Cards with Images */}
        <section id="services-hub" className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-4">
                Our Services
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive property care solutions tailored to your needs. Click on any service to learn more.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES_EXTENDED.map((service, index) => (
                <motion.article
                  key={service.id}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-orange/50 transition-all"
                >
                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={`${service.title} service in Cleveland suburbs`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-10 h-10 rounded-lg bg-orange flex items-center justify-center">
                        <service.icon className="w-5 h-5 text-white" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-2xl text-foreground tracking-wide mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    
                    {/* Features List */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                          <Check className="w-4 h-4 text-orange shrink-0" aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-orange font-medium hover:gap-3 transition-all"
                    >
                      Explore Service
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Service Area Cross-Links */}
        <section className="py-16 md:py-20 bg-ice dark:bg-charcoal/50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-4">
                Serving Our Local Communities
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We proudly serve homeowners and businesses throughout the Greater Cleveland and Kent areas.
                Click your city to see available services.
              </p>
            </motion.div>

            {/* Full Service Areas */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              <h3 className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Full Service Areas
              </h3>
              <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                {SERVICE_AREAS.full.map((city) => (
                  <Link
                    key={city}
                    href={`/services/${cityToSlug(city)}`}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-background border border-border text-foreground hover:border-orange hover:text-orange transition-colors"
                  >
                    {city}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Mulch Only Areas */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Mulch & Seasonal Cleanups
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {SERVICE_AREAS.mulchOnly.map((city) => (
                  <Link
                    key={city}
                    href={`/services/${cityToSlug(city)}`}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-orange/10 border border-orange/20 text-orange hover:bg-orange hover:text-white transition-colors"
                  >
                    {city}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonial Highlight */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-6">
            <motion.blockquote
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-xl md:text-2xl text-foreground italic leading-relaxed mb-6">
                &ldquo;WT Landscaping transformed our backyard in Strongsville. They were on time, 
                professional, and the mulch looks incredible. Highly recommend!&rdquo;
              </p>
              <footer className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-muted" />
                <div className="text-left">
                  <cite className="not-italic font-semibold text-foreground">Sarah M.</cite>
                  <p className="text-sm text-muted-foreground">Strongsville Resident</p>
                </div>
              </footer>
            </motion.blockquote>
          </div>
        </section>

        {/* CTA Footer Section */}
        <section className="py-16 md:py-20 bg-orange">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white tracking-wide mb-6">
                Ready for a Professional Quote?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Get expert advice and a free estimate for your landscaping or snow removal needs. 
                We respond within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  onClick={handleOpenQuote}
                  size="lg"
                  className="bg-white text-orange hover:bg-ice transition-colors font-semibold px-8 py-6 text-lg"
                >
                  Schedule Your Free Quote
                </Button>
                <Link
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex items-center gap-2 text-white hover:text-white/80 transition-colors font-medium"
                >
                  <Phone className="w-5 h-5" />
                  <span>Or Call {BUSINESS_INFO.phoneFormatted}</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Quote Form - Modal on Desktop, Drawer on Mobile */}
      {isMobile ? (
        <QuoteDrawer open={quoteOpen} onOpenChange={setQuoteOpen} />
      ) : (
        <QuoteModal open={quoteOpen} onOpenChange={setQuoteOpen} />
      )}
    </>
  )
}
