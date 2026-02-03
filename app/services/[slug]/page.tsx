"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { notFound } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { QuoteModal } from "@/components/ui/quote-modal"
import { QuoteDrawer } from "@/components/ui/quote-drawer"
import { Button } from "@/components/ui/button"
import { SERVICE_AREAS, cityToSlug, BUSINESS_INFO } from "@/lib/constants"
import { getServiceBySlug, getRelatedServices, type ServiceExtended } from "@/lib/services-data"
import { 
  ChevronRight, 
  Phone, 
  Check, 
  ArrowRight,
  Calendar
} from "lucide-react"
import { cn } from "@/lib/utils"

// Sticky CTA Button Component
function StickyCTA({ onClick }: { onClick: () => void }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (roughly 400px)
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <Button
        onClick={onClick}
        size="lg"
        className="bg-orange text-white hover:bg-orange-hover shadow-lg rounded-full px-6 py-6 flex items-center gap-2"
      >
        <Calendar className="w-5 h-5" />
        <span className="hidden sm:inline">Get Free Quote</span>
      </Button>
    </motion.div>
  )
}

// Breadcrumbs Component
function Breadcrumbs({ serviceName }: { serviceName: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
        </li>
        <ChevronRight className="w-4 h-4" aria-hidden="true" />
        <li>
          <Link href="/services" className="hover:text-foreground transition-colors">
            Services
          </Link>
        </li>
        <ChevronRight className="w-4 h-4" aria-hidden="true" />
        <li>
          <span className="text-foreground font-medium" aria-current="page">
            {serviceName}
          </span>
        </li>
      </ol>
    </nav>
  )
}

// Process Timeline Component
function ProcessTimeline({ steps }: { steps: ServiceExtended["processSteps"] }) {
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" aria-hidden="true" />
      
      <div className="space-y-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.step}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative flex gap-6"
          >
            {/* Step number */}
            <div className="relative z-10 w-12 h-12 rounded-full bg-orange text-white flex items-center justify-center font-serif text-xl shrink-0">
              {step.step}
            </div>
            
            {/* Content */}
            <div className="pt-2">
              <h4 className="font-semibold text-foreground text-lg mb-1">{step.title}</h4>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Related Services Component
function RelatedServices({ services, currentSlug }: { services: ServiceExtended[], currentSlug: string }) {
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {services.map((service, index) => (
        <motion.div
          key={service.slug}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Link
            href={`/services/${service.slug}`}
            className={cn(
              "block p-4 rounded-lg border border-border bg-card hover:border-orange/50 hover:shadow-md transition-all group",
              service.slug === currentSlug && "border-orange bg-orange/5"
            )}
          >
            <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center mb-3 group-hover:bg-orange/20 transition-colors">
              <service.icon className="w-5 h-5 text-orange" aria-hidden="true" />
            </div>
            <h4 className="font-semibold text-foreground mb-1">{service.shortTitle}</h4>
            <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

export default function ServicePage() {
  const params = useParams()
  const slug = params.slug as string
  const service = getServiceBySlug(slug)
  
  const [quoteOpen, setQuoteOpen] = useState(false)
  const isMobile = useIsMobile()
  const prefersReducedMotion = useReducedMotion()

  if (!service) {
    notFound()
  }

  const handleOpenQuote = () => setQuoteOpen(true)
  const relatedServices = getRelatedServices(slug)
  const allCities = [...SERVICE_AREAS.full, ...SERVICE_AREAS.mulchOnly]

  return (
    <>
      <Header onOpenQuote={handleOpenQuote} />
      
      <main className="pt-[72px]">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <Image
              src={service.image || "/placeholder.svg"}
              alt={`${service.title} service in Cleveland suburbs`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          
          <div className="relative z-10 py-16 md:py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-6">
              <Breadcrumbs serviceName={service.shortTitle} />
              
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl"
              >
                <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-orange bg-orange/20 rounded-full backdrop-blur-sm">
                  {service.heroTagline}
                </span>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white tracking-wide mb-6 text-balance">
                  Professional {service.shortTitle} in North Royalton & Cleveland Suburbs
                </h1>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
                  {service.valueProposition}
                </p>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Button
                    onClick={handleOpenQuote}
                    size="lg"
                    className="bg-orange text-white hover:bg-orange-hover transition-colors font-semibold px-8"
                  >
                    Get a Free Quote
                  </Button>
                  <Link
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="flex items-center gap-2 text-white hover:text-orange transition-colors font-medium"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call {BUSINESS_INFO.phoneFormatted}</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content Area - Two Column Layout */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content - 2/3 width */}
              <div className="lg:col-span-2 space-y-12">
                {/* Introduction */}
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-6">
                    Why Choose WT Landscaping for {service.shortTitle}?
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {service.introContent}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Whether {"you're"} a homeowner in Strongsville looking for reliable weekly service or a property manager 
                    in Parma needing a dependable partner, WT Landscaping delivers the quality and consistency your property deserves.
                  </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-serif text-2xl text-foreground tracking-wide mb-6">
                    What&apos;s Included
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-orange/10 flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-orange" aria-hidden="true" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Benefits Section */}
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-serif text-2xl text-foreground tracking-wide mb-6">
                    The Benefits of Professional {service.shortTitle}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {service.benefits.map((benefit, index) => (
                      <div key={benefit.title} className="p-4 rounded-lg bg-ice dark:bg-charcoal/30">
                        <h4 className="font-semibold text-foreground mb-2">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* How It Works */}
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-serif text-2xl text-foreground tracking-wide mb-8">
                    How It Works
                  </h3>
                  <ProcessTimeline steps={service.processSteps} />
                </motion.div>

                {/* FAQ Section */}
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-serif text-2xl text-foreground tracking-wide mb-6">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4">
                    {service.faqs.map((faq, index) => (
                      <details 
                        key={index} 
                        className="group p-4 rounded-lg border border-border bg-card"
                      >
                        <summary className="font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                          {faq.question}
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-open:rotate-90 transition-transform" />
                        </summary>
                        <p className="mt-4 text-muted-foreground">{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar - 1/3 width */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Quick Quote Card */}
                  <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
                    <h3 className="font-serif text-xl text-foreground tracking-wide mb-4">
                      Ready to Get Started?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Get a free, no-obligation quote for your {service.shortTitle.toLowerCase()} needs.
                    </p>
                    <Button
                      onClick={handleOpenQuote}
                      className="w-full bg-orange text-white hover:bg-orange-hover"
                    >
                      Get Your Free Quote
                    </Button>
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground text-center">
                        Or call us directly:
                      </p>
                      <Link
                        href={`tel:${BUSINESS_INFO.phone}`}
                        className="block text-center text-lg font-semibold text-orange hover:text-orange-hover mt-1"
                      >
                        {BUSINESS_INFO.phoneFormatted}
                      </Link>
                    </div>
                  </div>

                  {/* Related Services */}
                  <div className="p-6 rounded-xl border border-border bg-card">
                    <h3 className="font-serif text-xl text-foreground tracking-wide mb-4">
                      Other Services
                    </h3>
                    <div className="space-y-3">
                      {relatedServices.map((relService) => (
                        <Link
                          key={relService.slug}
                          href={`/services/${relService.slug}`}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center shrink-0">
                            <relService.icon className="w-4 h-4 text-orange" aria-hidden="true" />
                          </div>
                          <span className="text-sm font-medium text-foreground group-hover:text-orange transition-colors">
                            {relService.shortTitle}
                          </span>
                          <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Serving Your Neighborhood Section */}
        <section className="py-16 md:py-20 bg-ice dark:bg-charcoal/50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-4">
                Serving Your Neighborhood
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We provide professional {service.shortTitle.toLowerCase()} services throughout the Greater Cleveland 
                and Northeast Ohio area. Find your city below.
              </p>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
            >
              {allCities.map((city) => (
                <Link
                  key={city}
                  href={`/services/${cityToSlug(city)}`}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-background border border-border text-foreground hover:border-orange hover:text-orange transition-colors"
                >
                  {city}
                </Link>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Bottom Related Services Grid */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-4">
                Explore Our Other Services
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                WT Landscaping offers a full range of property maintenance services to keep your home looking its best year-round.
              </p>
            </motion.div>

            <RelatedServices services={relatedServices} currentSlug={slug} />
          </div>
        </section>

        {/* CTA Footer Section */}
        <section className="py-16 md:py-20 bg-orange">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white tracking-wide mb-6">
                Ready for Professional {service.shortTitle}?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Get expert service and a free estimate. We respond within 24 hours.
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

      {/* Sticky CTA */}
      <StickyCTA onClick={handleOpenQuote} />

      {/* Quote Form - Modal on Desktop, Drawer on Mobile */}
      {isMobile ? (
        <QuoteDrawer open={quoteOpen} onOpenChange={setQuoteOpen} />
      ) : (
        <QuoteModal open={quoteOpen} onOpenChange={setQuoteOpen} />
      )}
    </>
  )
}
