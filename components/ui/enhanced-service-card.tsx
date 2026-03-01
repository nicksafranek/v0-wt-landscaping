"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import type { ServiceExtended } from "@/lib/services-data"

interface EnhancedServiceCardProps {
    service: ServiceExtended
    index: number
}

export function EnhancedServiceCard({ service, index }: EnhancedServiceCardProps) {
    const prefersReducedMotion = useReducedMotion()
    const Icon = service.icon

    return (
        <Link
            href={`/services/${service.slug}`}
            className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 rounded-2xl"
        >
            <motion.article
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col h-full bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-orange/30 transition-all duration-300 hover:-translate-y-1"
            >
                {/* Image Section */}
                <div className="relative h-56 w-full overflow-hidden">
                    <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                    {/* Icon Badge */}
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-lg bg-orange/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:bg-orange transition-colors">
                        <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-1 p-6 sm:p-8">
                    <div className="mb-6">
                        <h3 className="font-serif text-2xl font-semibold text-foreground mb-3 group-hover:text-orange transition-colors">
                            {service.shortTitle}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {service.description}
                        </p>
                    </div>

                    {/* Value Proposition Highlight */}
                    <div className="mb-6 p-4 rounded-lg bg-orange/5 border border-orange/10 text-sm text-foreground/80 italic border-l-2 border-l-orange">
                        &ldquo;{service.valueProposition}&rdquo;
                    </div>

                    {/* Features List (Show first 3) */}
                    <ul className="space-y-3 mb-8 flex-1">
                        {service.features.slice(0, 4).map((feature) => (
                            <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                                <div className="mt-0.5 rounded-full bg-orange/10 p-1">
                                    <Check className="w-3 h-3 text-orange" />
                                </div>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Link Action */}
                    <div className="flex items-center text-sm font-bold text-orange mt-auto uppercase tracking-wide group-hover:translate-x-1 transition-transform">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                </div>
            </motion.article>
        </Link>
    )
}
