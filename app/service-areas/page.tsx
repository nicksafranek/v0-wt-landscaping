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
import { AnimatedButton } from "@/components/ui/animated-button"
import { SERVICE_AREAS, cityToSlug, BUSINESS_INFO, SERVICES } from "@/lib/constants"
import { MapPin, Leaf, Phone, Check, ArrowRight, Map, MapPinned } from "lucide-react"
import { ServiceAreaMap } from "@/components/ui/service-area-map"

export default function ServiceAreasPage() {
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)
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
        {/* Hero Section */}
        <section
          className="relative min-h-[60svh] w-full overflow-hidden flex items-center justify-center pt-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 15% 50%, rgba(255, 107, 0, 0.08) 0%, transparent 25%),
              radial-gradient(circle at 85% 30%, rgba(255, 107, 0, 0.05) 0%, transparent 20%),
              radial-gradient(circle at 50% 100%, rgba(249, 115, 22, 0.08) 0%, transparent 40%),
              radial-gradient(circle at 0% 100%, rgba(249, 115, 22, 0.1) 0%, transparent 30%)
            `
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_20%,#000_70%,transparent_100%)] pointer-events-none" />

          <div className="relative max-w-7xl 2xl:max-w-[1600px] mx-auto px-6 py-16 md:py-24 z-10">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-orange bg-orange/10 rounded-full border border-orange/20">
                Northeast Ohio Coverage
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground tracking-wide mb-6 text-balance">
                Service Areas
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 leading-relaxed mb-8">
                WT Property Maintenance proudly serves homeowners across the Cleveland suburbs
                and Northeast Ohio with professional property maintenance services.
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

        {/* Full Service Areas Section */}
        <section
          className="relative py-16 md:py-24 bg-white overflow-hidden"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 0% 0%, rgba(249, 115, 22, 0.15) 0%, transparent 80%),
              radial-gradient(ellipse at 100% 100%, rgba(34, 197, 94, 0.12) 0%, transparent 60%),
              radial-gradient(circle at 50% 0%, rgba(249, 115, 22, 0.12) 0%, transparent 60%),
              url("data:image/svg+xml,%3Csvg width='800' height='800' viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M800 584.2C787 581 773.8 578.4 760 577.2c-29-2.5-56 3.7-81.6 13.3-25.5 9.7-47.5 23-66.5 38.8-19 15.8-35.3 32.8-49 51-13.6 18.2-24.8 37.3-33.6 57.3-1.6 4-3 8-4.3 12h32c9.5-26.6 23.4-51.5 41-73.4 17.6-22 38.6-41.4 62-57.5 23.4-16.2 49-28.5 76-36.4 14.5-4.2 29.5-6.5 45-7.7V584.2zM0 318c15.5 1.2 30.5 3.5 45 7.7 27 8 52.6 20.2 76 36.4C144.4 378 165.4 397.5 183 419.5c17.6 22 31.5 46.8 41 73.4 1.3 3.6 2.5 7.3 3.6 11h32.7c-13.7-42.3-36.4-80.4-66.7-111.4C163.3 361.5 125.2 338.8 83 325.2c-26.2-8.5-53.7-11.7-81.5-9.2C-1.5 316.2-3 316.4-4.5 316.7L0 318zM0 457.7c28.3-2.6 56.5 0.5 83.2 9.2 42.2 13.6 80.3 36.3 111.4 66.6 30.3 30.3 53 68.4 66.6 110.6 8.7 26.6 11.8 54.8 9.3 83.2l0 .7h32.3c3.2-38-2.6-76-17.5-111.2-15-35-37.5-66.4-66.2-92.4-28.8-26-62.5-45.6-100-58-37.5-12.4-77.5-16.7-117.6-12.7V457.7zM800 242.3V104.5c-40 4-80 8.3-117.6 20.7-37.5 12.4-71.2 32-100 58-28.7 26-51.2 57.2-66.2 92.4C501.3 311 495.5 349 498.7 387h32.3c-2.4-28.4 0.7-56.6 9.3-83.2 13.6-42.2 36.3-80.3 66.6-110.6C638.2 163 676.3 140.2 718.5 126.7c26.7-8.7 54.9-11.7 83.2-9.2L800 242.3z' fill='%23000000' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")
            `,
            backgroundSize: '100% 100%, 100% 100%, 100% 100%, 800px 800px',
            backgroundRepeat: 'no-repeat, no-repeat, no-repeat, repeat'
          }}
        >
          <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-6">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-orange/10 flex items-center justify-center">
                  <MapPinned className="w-6 h-6 text-orange" aria-hidden="true" />
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide">
                  Full Service Areas
                </h2>
              </div>
              <p className="text-neutral-600 max-w-2xl">
                These Cleveland suburb communities receive our complete range of landscaping,
                lawn care, seasonal maintenance, and snow removal services.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
              {/* Left Column: Services & Cities */}
              <div className="flex flex-col gap-5 h-full">
                {/* Services Available */}
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  {/* Pulsing Gradient Border Overlay */}
                  <motion.div
                    className="absolute -inset-[1px] rounded-[17px] z-0 opacity-50"
                    style={{
                      backgroundImage: 'linear-gradient(45deg, #F97316, #EAB308, #F97316)',
                      backgroundSize: '200% 200%'
                    }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <div className="relative z-10 bg-white/90 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 shadow-xl">
                    <h3 className="font-semibold text-foreground mb-4">Services Available</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-foreground">
                        <Check className="w-5 h-5 text-orange shrink-0" aria-hidden="true" />
                        <Link href="/services/lawn-mowing" className="hover:text-orange transition-colors">
                          Lawn Mowing & Edging
                        </Link>
                      </li>
                      <li className="flex items-center gap-3 text-foreground">
                        <Check className="w-5 h-5 text-orange shrink-0" aria-hidden="true" />
                        <Link href="/services/mulch" className="hover:text-orange transition-colors">
                          Mulch Installation
                        </Link>
                      </li>
                      <li className="flex items-center gap-3 text-foreground">
                        <Check className="w-5 h-5 text-orange shrink-0" aria-hidden="true" />
                        <Link href="/services/trimming" className="hover:text-orange transition-colors">
                          Hedge Trimming
                        </Link>
                      </li>
                      <li className="flex items-center gap-3 text-foreground">
                        <Check className="w-5 h-5 text-orange shrink-0" aria-hidden="true" />
                        <Link href="/services/cleanups" className="hover:text-orange transition-colors">
                          Spring & Fall Cleanups
                        </Link>
                      </li>
                      <li className="flex items-center gap-3 text-foreground">
                        <Check className="w-5 h-5 text-orange shrink-0" aria-hidden="true" />
                        <Link href="/services/snow" className="hover:text-orange transition-colors">
                          Snow Removal
                        </Link>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Cities List (Moved from Grid below) */}
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative flex-grow flex flex-col"
                >
                  {/* Pulsing Gradient Border Overlay */}
                  <motion.div
                    className="absolute -inset-[1px] rounded-[17px] z-0 opacity-50"
                    style={{
                      backgroundImage: 'linear-gradient(45deg, #F97316, #EAB308, #F97316)',
                      backgroundSize: '200% 200%'
                    }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                  <div className="relative z-10 bg-white/90 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 flex-grow flex flex-col shadow-xl">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-orange" /> Serving:
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                      {SERVICE_AREAS.full.map((city) => {
                        const isHovered = hoveredCity === city
                        return (
                          <button
                            key={city}
                            onMouseEnter={() => setHoveredCity(city)}
                            onMouseLeave={() => setHoveredCity(null)}
                            className={`
                                          text-left px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-300
                                          ${isHovered
                                ? "border-orange/50 bg-gradient-to-br from-white to-orange/5 shadow-lg -translate-y-1 text-orange"
                                : "border-white/40 bg-white/80 shadow-sm hover:shadow-md text-black"
                              }
                                          flex items-center justify-start gap-4 group backdrop-blur-sm relative pl-6 pr-4 overflow-hidden w-full
                                      `}
                          >
                            {/* Left Side Accent Bar - Always Dark */}
                            <div className="absolute left-0 inset-y-0 w-1.5 bg-orange" />
                            <span className="whitespace-nowrap font-semibold">{city}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Map Only */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col h-full items-stretch"
              >
                <div className="w-full h-full rounded-2xl overflow-hidden border border-border shadow-lg bg-white/50 backdrop-blur-sm">
                  <ServiceAreaMap
                    hoveredCity={hoveredCity}
                    onHoverCity={setHoveredCity}
                    showFullServiceArea={true}
                    showMulchServiceArea={false}
                    className="w-full h-full min-h-[400px] lg:min-h-[450px]"
                  />
                </div>
              </motion.div>
            </div>
          </div >
        </section >

        {/* Mulch & Cleanups Areas Section */}
        <section
          className="relative py-16 md:py-24 bg-white overflow-hidden"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 100% 0%, rgba(34, 197, 94, 0.12) 0%, transparent 60%),
              radial-gradient(ellipse at 0% 100%, rgba(249, 115, 22, 0.15) 0%, transparent 60%),
              radial-gradient(circle at 50% 90%, rgba(34, 197, 94, 0.08) 0%, transparent 40%),
              url("data:image/svg+xml,%3Csvg width='800' height='800' viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M800 584.2C787 581 773.8 578.4 760 577.2c-29-2.5-56 3.7-81.6 13.3-25.5 9.7-47.5 23-66.5 38.8-19 15.8-35.3 32.8-49 51-13.6 18.2-24.8 37.3-33.6 57.3-1.6 4-3 8-4.3 12h32c9.5-26.6 23.4-51.5 41-73.4 17.6-22 38.6-41.4 62-57.5 23.4-16.2 49-28.5 76-36.4 14.5-4.2 29.5-6.5 45-7.7V584.2zM0 318c15.5 1.2 30.5 3.5 45 7.7 27 8 52.6 20.2 76 36.4C144.4 378 165.4 397.5 183 419.5c17.6 22 31.5 46.8 41 73.4 1.3 3.6 2.5 7.3 3.6 11h32.7c-13.7-42.3-36.4-80.4-66.7-111.4C163.3 361.5 125.2 338.8 83 325.2c-26.2-8.5-53.7-11.7-81.5-9.2C-1.5 316.2-3 316.4-4.5 316.7L0 318zM0 457.7c28.3-2.6 56.5 0.5 83.2 9.2 42.2 13.6 80.3 36.3 111.4 66.6 30.3 30.3 53 68.4 66.6 110.6 8.7 26.6 11.8 54.8 9.3 83.2l0 .7h32.3c3.2-38-2.6-76-17.5-111.2-15-35-37.5-66.4-66.2-92.4-28.8-26-62.5-45.6-100-58-37.5-12.4-77.5-16.7-117.6-12.7V457.7zM800 242.3V104.5c-40 4-80 8.3-117.6 20.7-37.5 12.4-71.2 32-100 58-28.7 26-51.2 57.2-66.2 92.4C501.3 311 495.5 349 498.7 387h32.3c-2.4-28.4 0.7-56.6 9.3-83.2 13.6-42.2 36.3-80.3 66.6-110.6C638.2 163 676.3 140.2 718.5 126.7c26.7-8.7 54.9-11.7 83.2-9.2L800 242.3z' fill='%23000000' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")
            `,
            backgroundSize: '100% 100%, 100% 100%, 100% 100%, 800px 800px',
            backgroundRepeat: 'no-repeat, no-repeat, no-repeat, repeat'
          }}
        >
          <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-6">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-forest/10 flex items-center justify-center">
                  <MapPinned className="w-6 h-6 text-forest" aria-hidden="true" />
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide">
                  Mulch & Seasonal Cleanups
                </h2>
              </div>
              <p className="text-neutral-600 max-w-2xl">
                We extend our premium mulch installation and seasonal cleanup services
                to these additional Northeast Ohio communities.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
              {/* Left Column: Services & Cities */}
              <div className="flex flex-col gap-5 h-full">
                {/* Services Available */}
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  {/* Pulsing Gradient Border Overlay */}
                  <motion.div
                    className="absolute -inset-[1px] rounded-[17px] z-0 opacity-50"
                    style={{
                      backgroundImage: 'linear-gradient(45deg, #22C55E, #15803D, #22C55E)',
                      backgroundSize: '200% 200%'
                    }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <div className="relative z-10 bg-white/90 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 shadow-xl shrink-0">
                    <h3 className="font-semibold text-foreground mb-4">Services Available</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-foreground">
                        <Check className="w-5 h-5 text-forest shrink-0" aria-hidden="true" />
                        <Link href="/services/mulch" className="hover:text-forest transition-colors">
                          Mulch Installation
                        </Link>
                      </li>
                      <li className="flex items-center gap-3 text-foreground">
                        <Check className="w-5 h-5 text-forest shrink-0" aria-hidden="true" />
                        <Link href="/services/cleanups" className="hover:text-forest transition-colors">
                          Spring Cleanups
                        </Link>
                      </li>
                      <li className="flex items-center gap-3 text-foreground">
                        <Check className="w-5 h-5 text-forest shrink-0" aria-hidden="true" />
                        <Link href="/services/cleanups" className="hover:text-forest transition-colors">
                          Fall Cleanups
                        </Link>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Cities List (Moved from Grid below) */}
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative flex-grow flex flex-col"
                >
                  {/* Pulsing Gradient Border Overlay */}
                  <motion.div
                    className="absolute -inset-[1px] rounded-[17px] z-0 opacity-50"
                    style={{
                      backgroundImage: 'linear-gradient(45deg, #22C55E, #15803D, #22C55E)',
                      backgroundSize: '200% 200%'
                    }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                  <div className="relative z-10 bg-white/90 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 flex-grow flex flex-col shadow-xl">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-forest" /> Serving:
                    </h3>
                    <div className="flex flex-col gap-2 flex-grow justify-center">
                      {SERVICE_AREAS.mulchOnly.map((city) => {
                        const isHovered = hoveredCity === city
                        return (
                          <button
                            key={city}
                            onMouseEnter={() => setHoveredCity(city)}
                            onMouseLeave={() => setHoveredCity(null)}
                            className={`
                                          text-left px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-300
                                          ${isHovered
                                ? "border-forest/50 bg-gradient-to-br from-white to-forest/5 shadow-lg -translate-y-1 text-forest"
                                : "border-white/40 bg-white/80 shadow-sm hover:shadow-md text-black"
                              }
                                          flex items-center justify-start gap-4 group backdrop-blur-sm relative pl-6 pr-4 overflow-hidden w-full
                                      `}
                          >
                            {/* Left Side Accent Bar - Always Dark */}
                            <div className="absolute left-0 inset-y-0 w-1.5 bg-forest" />
                            <span className="whitespace-nowrap font-semibold">{city}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Map Only */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col h-full items-stretch"
              >
                <div className="w-full h-full rounded-2xl overflow-hidden border border-border shadow-lg bg-white/50 backdrop-blur-sm">
                  <ServiceAreaMap
                    hoveredCity={hoveredCity}
                    onHoverCity={setHoveredCity}
                    showFullServiceArea={false}
                    showMulchServiceArea={true}
                    className="w-full h-full min-h-[400px] lg:min-h-[450px]"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section >

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-orange">
          <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-6">
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
                <AnimatedButton
                  onClick={handleOpenQuote}
                  className="bg-white text-orange hover:bg-white/90 hover:text-orange"
                  wrapperClassName="w-full sm:w-auto"
                  gradientColors="conic-gradient(from 90deg, transparent 0%, transparent 50%, rgba(255, 255, 255, 0.8) 100%)"
                >
                  Request a Free Quote
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
        </section >
      </main >

      <Footer />

      {/* Quote Form - Modal on Desktop, Drawer on Mobile */}
      {
        isMobile ? (
          <QuoteDrawer open={quoteOpen} onOpenChange={setQuoteOpen} />
        ) : (
          <QuoteModal open={quoteOpen} onOpenChange={setQuoteOpen} />
        )
      }
    </>
  )
}
