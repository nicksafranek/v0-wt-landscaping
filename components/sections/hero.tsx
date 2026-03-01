"use client"

import { Phone, MessageCircle } from "lucide-react"
import { HERO_CONTENT, BUSINESS_INFO } from "@/lib/constants"
import { QuoteForm } from "@/components/ui/quote-form"
import { motion } from "framer-motion"

interface HeroProps {
  onOpenQuote: () => void
}

export function Hero({ onOpenQuote }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[70vh] md:min-h-[85vh] flex items-start pt-20 lg:pt-28 pb-16 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: "url('/images/WT_Landscaping/hero-background.webp')",
            backgroundColor: "#1E293B",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Left Column: Text Content - Static for absolute stability */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left pt-8 lg:pt-0">
            <motion.h1
              className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-wide text-balance drop-shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {HERO_CONTENT.title}
            </motion.h1>

            <motion.p
              className="mt-4 md:mt-6 text-base md:text-xl text-white/90 max-w-xl leading-relaxed text-pretty drop-shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {HERO_CONTENT.subtitle}
            </motion.p>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4">
                {/* Call Us Button */}
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex items-center gap-3 bg-black/40 backdrop-blur-md p-1.5 pr-6 rounded-full border border-white/20 w-full sm:w-auto shadow-xl group hover:bg-black/60 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-orange flex items-center justify-center shadow-lg shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-[10px] uppercase tracking-wider text-white/80 font-semibold leading-none mb-1">Call Us</span>
                    <span className="text-white font-bold group-hover:text-orange-300 transition-colors leading-none">
                      {BUSINESS_INFO.phoneFormatted}
                    </span>
                  </div>
                </a>

                {/* Text Now Button - Original Pill Design */}
                <a
                  href={`sms:${BUSINESS_INFO.phone}`}
                  className="group flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3.5 sm:py-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all border border-white/20 hover:border-white/40 shadow-xl"
                >
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium whitespace-nowrap">Text Now</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none lg:mr-0 flex flex-col justify-center h-full py-8 lg:py-0">
            <motion.div
              className="bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl p-6 lg:p-8 dark ring-1 ring-white/5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Get Your Free Quote</h3>
                <p className="text-white/70 text-sm">Fast, professional service in your area.</p>
              </div>

              <div className="dark">
                <QuoteForm variant="hero" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
