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
import { PulseIndicator } from "@/components/ui/pulse-indicator"
import { SERVICE_AREAS, cityToSlug, BUSINESS_INFO } from "@/lib/constants"
import { getServiceBySlug, getRelatedServices, type ServiceExtended } from "@/lib/services-data"
import {
  ChevronRight,
  Phone,
  Check,
  ArrowRight
} from "lucide-react"
import { cn } from "@/lib/utils"


// Breadcrumbs Component
function Breadcrumbs({ serviceName }: { serviceName: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-slate-300">
        <li>
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
        </li>
        <ChevronRight className="w-4 h-4" aria-hidden="true" />
        <li>
          <Link href="/services" className="hover:text-white transition-colors">
            Services
          </Link>
        </li>
        <ChevronRight className="w-4 h-4" aria-hidden="true" />
        <li>
          <span className="text-slate-200 font-medium" aria-current="page">
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
              "block p-6 rounded-lg border bg-neutral-700 hover:bg-neutral-600 transaction-all group h-full flex flex-col",
              service.slug === currentSlug
                ? "border-orange ring-1 ring-orange"
                : "border-neutral-600 hover:border-orange/50"
            )}
          >
            <div className="w-12 h-12 rounded-lg bg-neutral-800/50 flex items-center justify-center mb-4 group-hover:bg-orange/10 transition-colors shrink-0">
              <service.icon className="w-6 h-6 text-orange" aria-hidden="true" />
            </div>
            <h4 className="font-semibold text-lg text-white mb-2 group-hover:text-orange transition-colors">{service.shortTitle}</h4>
            <p className="text-sm text-neutral-300 leading-relaxed flex-grow">{service.description}</p>
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

          <div className={cn(
            "relative z-10",
            slug === 'snow' ? "py-12 md:py-16 lg:py-24" : "py-16 md:py-24 lg:py-32"
          )}>
            <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-6">
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
                  {service.heroTitle || `Professional ${service.shortTitle} in North Royalton & Cleveland Suburbs`}
                </h1>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
                  {service.valueProposition}
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
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
        <section className={cn(
          "bg-background pb-16 md:pb-24",
          (service.slug === "mulch-installation" || service.slug === "lawn-mowing" || service.slug === "seasonal-cleanups") ? "pt-8 md:pt-12" : "py-16 md:py-24"
        )}>
          <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content - 2/3 width */}
              <div className="lg:col-span-2 space-y-12">
                {/* Introduction */}
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  {(service.slug === "mulch-installation" || service.slug === "lawn-mowing" || service.slug === "seasonal-cleanups") && (
                    <div className="mb-4">
                      <PulseIndicator size="large" />
                    </div>
                  )}
                  <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-6">
                    Why Choose WT Property Maintenance for {service.shortTitle}?
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {service.introContent}
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
