"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { SERVICES_EXTENDED } from "@/lib/services-data"
import { cn } from "@/lib/utils"

interface ServicesDropdownProps {
    onNavigate?: () => void
}

export function ServicesDropdown({ onNavigate }: ServicesDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const isActive = pathname === "/services" || pathname.startsWith("/services/")

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {/* Trigger Button */}
            <Link
                href="/services"
                className={cn(
                    "flex items-center gap-1 text-sm font-medium transition-colors",
                    isActive
                        ? "text-orange"
                        : "text-neutral-600 hover:text-neutral-900"
                )}
                aria-current={isActive ? "page" : undefined}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                Services
                <ChevronDown
                    className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        isOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                />
            </Link>

            {/* Dropdown Menu - pt-2 creates padding that keeps hover active */}
            {isOpen && (
                <div className="absolute top-full left-0 pt-2 w-64 z-50">
                    <div className="bg-white rounded-lg shadow-xl border border-border overflow-hidden">
                        <div className="py-2">
                            {/* All Services Link */}
                            <Link
                                href="/services"
                                onClick={onNavigate}
                                className="block px-4 py-2.5 text-sm font-medium text-foreground hover:bg-orange/5 hover:text-orange transition-colors border-b border-border"
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
                                            "flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                                            isServiceActive
                                                ? "bg-orange/10 text-orange"
                                                : "text-foreground hover:bg-orange/5 hover:text-orange"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                            isServiceActive ? "bg-orange/20" : "bg-muted"
                                        )}>
                                            <Icon className={cn(
                                                "w-4 h-4",
                                                isServiceActive ? "text-orange" : "text-muted-foreground"
                                            )} aria-hidden="true" />
                                        </div>
                                        <span className="font-medium">{service.shortTitle || service.title}</span>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
