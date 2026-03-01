"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import type { ServiceExtended } from "@/lib/services-data"

interface ServiceShowcaseProps {
    service: ServiceExtended
    index: number
}

export function ServiceShowcase({ service, index }: ServiceShowcaseProps) {
    const prefersReducedMotion = useReducedMotion()
    const Icon = service.icon
    const isEven = index % 2 === 0

    return (
        <section id={service.slug} className="scroll-mt-24 lg:min-h-[800px] lg:flex lg:items-center py-16 lg:py-20 border-b border-border last:border-b-0 w-full">
            <div className="max-w-7xl mx-auto px-6">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                    {/* Image Section */}
                    <motion.div
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: isEven ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className={`relative ${isEven ? '' : 'lg:col-start-2'}`}
                    >
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={service.image}
                                alt={`${service.title} - Professional landscaping service in Cleveland`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority={index < 2}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                            {/* Floating Icon Badge */}
                            <div className="absolute top-6 left-6 w-16 h-16 rounded-xl bg-orange shadow-lg flex items-center justify-center">
                                <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: isEven ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}
                    >
                        {/* Service Title */}
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground tracking-wide mb-4">
                            {service.title}
                        </h2>

                        {/* Value Proposition */}
                        <div className="mb-6 p-5 rounded-lg bg-orange/5 border-l-4 border-l-orange">
                            <p className="text-foreground/90 text-lg italic leading-relaxed">
                                "{service.valueProposition}"
                            </p>
                        </div>

                        {/* Description */}
                        <p className="text-neutral-600 text-lg leading-relaxed mb-6">
                            {service.servicePageDescription}
                        </p>


                        {/* Key Features */}
                        <div className="mb-6">
                            <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
                                What's Included
                            </h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {service.features.slice(0, 6).map((feature) => (
                                    <li key={feature} className="flex items-start gap-2">
                                        <Check className="w-5 h-5 text-orange shrink-0 mt-0.5" aria-hidden="true" />
                                        <span className="text-foreground text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>



                        {/* CTA Button */}
                        <Link
                            href={`/services/${service.slug}`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-orange text-white rounded-lg font-medium hover:bg-orange/90 transition-colors group"
                        >
                            Learn More About {service.shortTitle}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
