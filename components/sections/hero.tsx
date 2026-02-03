"use client"

import { useEffect, useReducer, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Phone, MessageCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HERO_CONTENT, BUSINESS_INFO, ANIMATION_VARIANTS } from "@/lib/constants"

interface HeroProps {
  onOpenQuote: () => void
}

export function Hero({ onOpenQuote }: HeroProps) {
  const prefersReducedMotion = useReducedMotion()
  
  const variants = prefersReducedMotion 
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : ANIMATION_VARIANTS.fadeInUp

  return (
    <section 
      className="relative min-h-[75vh] flex items-center justify-center pt-[72px]"
      aria-label="Hero section"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero-bg.webp')",
            backgroundColor: "#1E293B",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 text-center">
        <motion.h1
          custom={0}
          initial="hidden"
          animate="visible"
          variants={variants}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-wide text-balance"
        >
          {HERO_CONTENT.title}
        </motion.h1>

        <motion.p
          custom={1}
          initial="hidden"
          animate="visible"
          variants={variants}
          className="mt-6 text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed text-pretty"
        >
          {HERO_CONTENT.subtitle}
        </motion.p>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={variants}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={onOpenQuote}
            size="lg"
            className="h-14 px-8 text-lg bg-orange text-white hover:bg-orange-hover transition-colors font-medium min-w-[200px]"
          >
            {HERO_CONTENT.ctaText}
          </Button>

          <div className="flex items-center gap-3">
            <span className="text-white/80 text-sm">{HERO_CONTENT.secondaryCta}</span>
            <div className="flex items-center gap-2">
              <Link
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                aria-label={`Call ${BUSINESS_INFO.phoneFormatted}`}
              >
                <Phone className="w-5 h-5" />
                <span className="hidden sm:inline">{BUSINESS_INFO.phoneFormatted}</span>
              </Link>
              <Link
                href={`sms:${BUSINESS_INFO.phone}`}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                aria-label={`Text ${BUSINESS_INFO.phoneFormatted}`}
              >
                <MessageCircle className="w-5 h-5" />
                <span className="hidden sm:inline">Text</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
