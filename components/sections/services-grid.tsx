"use client"

import { motion, useReducedMotion } from "framer-motion"
import { SERVICES } from "@/lib/constants"
import { ServiceCard } from "@/components/ui/service-card"

export function ServicesGrid() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section 
      id="services" 
      className="py-20 bg-ice dark:bg-secondary"
      aria-labelledby="services-heading"
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
            id="services-heading"
            className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-4"
          >
            Our Professional Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From routine lawn care to emergency snow removal, we deliver reliable, 
            high-quality service year-round across the Cleveland suburbs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
