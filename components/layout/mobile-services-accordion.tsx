"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { SERVICES_EXTENDED } from "@/lib/services-data"
import { cn } from "@/lib/utils"

interface MobileServicesAccordionProps {
    onNavigate: () => void
}

export function MobileServicesAccordion({ onNavigate }: MobileServicesAccordionProps) {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const isActive = pathname === "/services" || pathname.startsWith("/services/")

    return (
        <div>
            {/* Accordion Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center justify-between py-3 px-4 text-lg font-medium rounded-lg transition-colors text-left",
                    isActive
                        ? "text-orange bg-orange/10"
                        : "text-foreground hover:bg-muted"
                )}
                aria-expanded={isOpen}
            >
                Services
                <ChevronDown
                    className={cn(
                        "w-5 h-5 transition-transform duration-200",
                        isOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                />
            </button>

            {/* Accordion Content */}
            {isOpen && (
                <div className="mt-1 ml-4 space-y-1">
                    {/* All Services Link */}
                    <Link
                        href="/services"
                        onClick={onNavigate}
                        className={cn(
                            "block py-2.5 px-4 text-base rounded-lg transition-colors",
                            pathname === "/services"
                                ? "text-orange bg-orange/5 font-medium"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                    >
                        View All Services
                    </Link>

                    {/* Individual Services */}
                    {SERVICES_EXTENDED.map((service) => {
                        const Icon = service.icon
                        const isServiceActive = pathname === `/services/${service.slug}`

                        return (
                            <Link
                                key={service.id}
                                href={`/services/${service.slug}`}
                                onClick={onNavigate}
                                className={cn(
                                    "flex items-center gap-3 py-2.5 px-4 rounded-lg transition-colors",
                                    isServiceActive
                                        ? "text-orange bg-orange/5 font-medium"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                                <span className="text-sm">{service.shortTitle || service.title}</span>
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
