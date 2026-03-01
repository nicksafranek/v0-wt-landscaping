"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import type { ElementType } from "react"
import { SERVICES_EXTENDED as CONSTANTS_SERVICES } from "@/lib/constants"
import { SERVICES_EXTENDED } from "@/lib/services-data"
import { PulseIndicator } from "@/components/ui/pulse-indicator"

type ExtendedService = typeof SERVICES_EXTENDED[number]

interface DetailedServiceCardProps {
    service: ExtendedService
    index: number
}

export function DetailedServiceCard({ service, index }: DetailedServiceCardProps) {
    const prefersReducedMotion = useReducedMotion()
    const Icon = service.icon as ElementType

    return (
        <motion.article
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="group bg-white/90 md:backdrop-blur-2xl border border-white/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-orange/50 md:transition-all md:duration-700 flex flex-col h-full md:hover:-translate-y-1 snap-center w-[85vw] md:w-full shrink-0"
        >
            {/* Service Image */}
            <div className="relative h-48 overflow-hidden bg-muted">
                <Image
                    src={service.image || "/placeholder.svg"}
                    alt={`${service.title} service in Cleveland suburbs`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4">
                    <div className="w-10 h-10 rounded-lg bg-orange flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                    </div>
                </div>
            </div>

            {/* Service Content */}
            <div className="p-5 sm:p-6 flex flex-col flex-1">
                {(service.slug === "mulch-installation" || service.slug === "lawn-mowing" || service.slug === "seasonal-cleanups") && (
                    <div className="mb-[10px] flex justify-start">
                        <PulseIndicator />
                    </div>
                )}
                <h3 className="font-serif text-2xl text-foreground tracking-wide mb-2 whitespace-nowrap md:whitespace-normal">
                    {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                    {CONSTANTS_SERVICES[index]?.valueProposition || service.valueProposition}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                            <Check className="w-4 h-4 text-orange shrink-0" aria-hidden="true" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-orange font-medium hover:gap-3 transition-all mt-auto"
                >
                    Explore Service
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.article>
    )
}
