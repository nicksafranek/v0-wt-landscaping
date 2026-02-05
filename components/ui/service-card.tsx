"use client"

import Link from "next/link"
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
    <Link 
      href={`/services/${service.slug}`} 
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 rounded-2xl"
    >
      <motion.article
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={prefersReducedMotion ? {} : { y: -4 }}
        className="group relative bg-card rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-transparent hover:border-orange/30"
      >
        {/* Icon with soft circular glow */}
        <div className="relative w-14 h-14 mb-6">
          <div 
            className="absolute inset-0 rounded-full bg-orange/10 blur-sm group-hover:blur-md transition-all duration-300"
            aria-hidden="true"
          />
          <div className="relative w-full h-full rounded-full bg-orange/10 group-hover:bg-orange/20 flex items-center justify-center transition-colors duration-300">
            <Icon 
              size={28}
              className="text-orange transition-transform duration-300 group-hover:scale-110" 
              aria-hidden="true" 
            />
          </div>
        </div>
        
        <h3 className="font-sans text-lg font-semibold text-foreground mb-3 tracking-tight group-hover:text-orange transition-colors duration-300">
          {service.title}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          {service.description}
        </p>
      </motion.article>
    </Link>
  )
}
