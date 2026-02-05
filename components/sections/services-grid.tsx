"use client"

import { motion, useReducedMotion } from "framer-motion"
import { SERVICES } from "@/lib/constants"
import { ServiceCard } from "@/components/ui/service-card"

export function ServicesGrid() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section 
      id="services" 
      className="py-24 md:py-32 bg-background"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-forest uppercase tracking-widest mb-3">
            What We Offer
          </p>
          <h2 
            id="services-heading"
            className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-5"
          >
            Professional Property Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            From routine lawn care to emergency snow removal, we deliver reliable, 
            high-quality service year-round across Northeast Ohio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}
