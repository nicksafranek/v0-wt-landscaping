"use client"

import { motion, useReducedMotion } from "framer-motion"
import { MapPin, Leaf } from "lucide-react"
import { SERVICE_AREAS } from "@/lib/constants"
import { CityBadge } from "@/components/ui/city-badge"

export function ServiceAreas() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section 
      id="areas" 
      className="py-20 bg-muted dark:bg-muted"
      aria-labelledby="areas-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 
            id="areas-heading"
            className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-4"
          >
            Areas We Serve
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Proudly serving homeowners across the Cleveland suburbs and Northeast Ohio 
            with professional landscaping and property maintenance services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Full Service Areas */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-xl p-8 border border-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-orange" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-2xl text-foreground tracking-wide">
                Full Service Areas
              </h3>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Complete landscaping, lawn care, seasonal cleanups, and snow removal services.
            </p>
            <div className="flex flex-wrap gap-2">
              {SERVICE_AREAS.full.map((city) => (
                <CityBadge key={city} city={city} />
              ))}
            </div>
          </motion.div>

          {/* Mulch Only Areas */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-xl p-8 border border-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-orange" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-2xl text-foreground tracking-wide">
                Specialty Mulching Service
              </h3>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Premium double-shredded mulch delivery and professional installation.
            </p>
            <div className="flex flex-wrap gap-2">
              {SERVICE_AREAS.mulchOnly.map((city) => (
                <CityBadge key={city} city={city} variant="mulch" />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
