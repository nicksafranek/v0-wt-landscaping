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
      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
      className="group bg-card border border-border rounded-lg p-6 shadow-sm transition-colors hover:border-orange cursor-default"
    >
      <div className="w-12 h-12 rounded-lg bg-orange/10 flex items-center justify-center mb-4 group-hover:bg-orange/20 transition-colors">
        <Icon className="w-6 h-6 text-orange" aria-hidden="true" />
      </div>
      
      <h3 className="font-serif text-xl text-foreground tracking-wide mb-2">
        {service.title}
      </h3>
      
      <p className="text-muted-foreground text-sm leading-relaxed">
        {service.description}
      </p>
    </motion.article>
  )
}
