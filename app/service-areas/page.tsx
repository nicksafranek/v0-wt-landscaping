"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { QuoteModal } from "@/components/ui/quote-modal"
import { QuoteDrawer } from "@/components/ui/quote-drawer"
import { Button } from "@/components/ui/button"
import { SERVICE_AREAS, cityToSlug, BUSINESS_INFO, SERVICES } from "@/lib/constants"
import { MapPin, Leaf, Phone, Check, ArrowRight } from "lucide-react"

export default function ServiceAreasPage() {
  const [quoteOpen, setQuoteOpen] = useState(false)
  const isMobile = useIsMobile()
  const prefersReducedMotion = useReducedMotion()

  const handleOpenQuote = () => setQuoteOpen(true)

  // Services available in full-service areas
  const fullServiceList = [
    "Lawn Mowing & Edging",
    "Mulch Installation",
    "Hedge Trimming",
    "Spring & Fall Cleanups",
    "Snow Removal",
  ]

  // Services available in Kent/Stow/Aurora
  const limitedServiceList = [
    "Mulch Installation",
    "Spring Cleanups",
    "Fall Cleanups",
  ]

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
                  Northeast Ohio Coverage
                </span>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground tracking-wide mb-6 text-balance">
                  Service Areas
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                  WT Landscaping proudly serves homeowners across the Cleveland suburbs 
                  and Northeast Ohio with professional property maintenance services.
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

        {/* Full Service Areas Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-orange/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-orange" aria-hidden="true" />
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide">
                  Full Service Areas
                </h2>
              </div>
              <p className="text-muted-foreground max-w-2xl">
                These Cleveland suburb communities receive our complete range of landscaping, 
                lawn care, seasonal maintenance, and snow removal services.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Services Available */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="font-semibold text-foreground mb-4">Services Available</h3>
                <ul className="space-y-3">
                  {fullServiceList.map((service) => (
                    <li key={service} className="flex items-center gap-3 text-foreground">
                      <Check className="w-5 h-5 text-orange shrink-0" aria-hidden="true" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Cities Grid */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-2"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {SERVICE_AREAS.full.map((city, index) => (
                    <motion.div
                      key={city}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link
                        href={`/services/${cityToSlug(city)}`}
                        className="group block bg-card border border-border rounded-xl p-5 hover:border-orange hover:shadow-md transition-all"
                      >
                        <span className="font-medium text-foreground group-hover:text-orange transition-colors">
                          {city}
                        </span>
                        <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground group-hover:text-orange transition-colors">
                          <span>View services</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mulch & Cleanups Areas Section */}
        <section className="py-16 md:py-24 bg-ice dark:bg-charcoal/50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-orange/10 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-orange" aria-hidden="true" />
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide">
                  Mulch & Seasonal Cleanups
                </h2>
              </div>
              <p className="text-muted-foreground max-w-2xl">
                We extend our premium mulch installation and seasonal cleanup services 
                to these additional Northeast Ohio communities.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Services Available */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="font-semibold text-foreground mb-4">Services Available</h3>
                <ul className="space-y-3">
                  {limitedServiceList.map((service) => (
                    <li key={service} className="flex items-center gap-3 text-foreground">
                      <Check className="w-5 h-5 text-orange shrink-0" aria-hidden="true" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-muted-foreground">
                  Premium double-shredded mulch delivery and professional installation, 
                  plus comprehensive spring and fall cleanup services.
                </p>
              </motion.div>

              {/* Cities Grid */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-2"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {SERVICE_AREAS.mulchOnly.map((city, index) => (
                    <motion.div
                      key={city}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={`/services/${cityToSlug(city)}`}
                        className="group block bg-orange/5 border border-orange/20 rounded-xl p-6 hover:bg-orange/10 hover:border-orange transition-all"
                      >
                        <span className="font-medium text-lg text-foreground group-hover:text-orange transition-colors">
                          {city}
                        </span>
                        <div className="flex items-center gap-1 mt-2 text-sm text-orange">
                          <span>View services</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
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
                Not Sure If We Serve Your Area?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Contact us today and we will let you know what services are available 
                in your neighborhood. We are always expanding our coverage.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  onClick={handleOpenQuote}
                  size="lg"
                  className="bg-white text-orange hover:bg-ice transition-colors font-semibold px-8 py-6 text-lg"
                >
                  Request a Free Quote
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
