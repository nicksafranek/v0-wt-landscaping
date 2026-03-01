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
import { SERVICE_AREAS, cityToSlug, BUSINESS_INFO } from "@/lib/constants"
import { SERVICES_EXTENDED } from "@/lib/services-data"
import { Clock, Shield, Award, Phone } from "lucide-react"
import { ServiceShowcase } from "@/components/ui/service-showcase"
import { AnimatedButton } from "@/components/ui/animated-button"

// Why Choose Us features
const WHY_CHOOSE_US = [
  {
    icon: Clock,
    title: "Reliable & On-Time",
    description: "We show up when we say we will. Your schedule matters to us.",
  },
  {
    icon: Shield,
    title: "Professional Team",
    description: "Experienced, uniformed professionals dedicated to your property's care.",
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
        <section
          className="relative min-h-[60svh] w-full overflow-hidden flex items-center justify-center pt-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 15% 50%, rgba(255, 107, 0, 0.08) 0%, transparent 25%),
              radial-gradient(circle at 85% 30%, rgba(255, 107, 0, 0.05) 0%, transparent 20%)
            `
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

          <div className="relative max-w-7xl 2xl:max-w-[1600px] mx-auto px-6 py-16 md:py-24">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-orange bg-orange/10 rounded-full border border-orange/20">
                Cleveland&apos;s Trusted Landscaping Experts
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground tracking-wide mb-6 text-balance">
                Professional Landscaping & Property Maintenance Services
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 mb-8">
                Providing year-round property maintenance to homeowners.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <AnimatedButton
                  onClick={handleOpenQuote}
                  className="px-8"
                  wrapperClassName="w-full sm:w-auto"
                >
                  Get Your Free Quote
                </AnimatedButton>
                <Link
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex items-center gap-2 text-foreground hover:text-orange transition-colors font-medium px-6 py-3"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call {BUSINESS_INFO.phoneFormatted}</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-12 md:py-16 bg-background border-b border-border">
          <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-6">
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

        {/* Services Showcase - Alternating Full-Width Sections */}
        <section id="services-hub" className="bg-background">


          {/* Individual Service Showcases */}
          <div className="bg-background">
            {SERVICES_EXTENDED.map((service, index) => (
              <ServiceShowcase
                key={service.id}
                service={service}
                index={index}
              />
            ))}
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
                <AnimatedButton
                  onClick={handleOpenQuote}
                  className="bg-white text-orange hover:bg-white/90 hover:text-orange"
                  wrapperClassName="w-full sm:w-auto"
                  gradientColors="conic-gradient(from 90deg, transparent 0%, transparent 50%, rgba(255, 255, 255, 0.8) 100%)"
                >
                  Schedule Your Free Quote
                </AnimatedButton>
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
