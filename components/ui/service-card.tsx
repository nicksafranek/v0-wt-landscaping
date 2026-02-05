"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { Service } from "@/lib/constants"

interface ServiceCardProps {
  service: Service
  index: number
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const Icon = service.icon

  return (
    <motion.article
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={prefersReducedMotion ? {} : { y: -4 }}
      className="group relative bg-card rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 cursor-default border border-transparent hover:border-forest/20"
    >
      {/* Icon with soft circular glow */}
      <div className="relative w-14 h-14 mb-6">
        <div 
          className="absolute inset-0 rounded-full bg-forest-glow blur-sm group-hover:blur-md transition-all duration-300"
          aria-hidden="true"
        />
        <div className="relative w-full h-full rounded-full bg-forest-glow flex items-center justify-center">
          <Icon 
            className="w-7 h-7 text-forest transition-transform duration-300 group-hover:scale-110" 
            strokeWidth={1.5}
            aria-hidden="true" 
          />
        </div>
      </div>
      
      <h3 className="font-sans text-lg font-semibold text-foreground mb-3 tracking-tight">
        {service.title}
      </h3>
      
      <p className="text-muted-foreground text-sm leading-relaxed">
        {service.description}
      </p>
    </motion.article>
  )
}
