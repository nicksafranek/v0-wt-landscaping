"use client"

import Link from "next/link"
import { cityToSlug } from "@/lib/constants"

interface CityBadgeProps {
  city: string
  variant?: "default" | "mulch"
}

export function CityBadge({ city, variant = "default" }: CityBadgeProps) {
  const slug = cityToSlug(city)
  const href = `/services/${slug}`

  return (
    <Link
      href={href}
      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-background border border-border text-foreground hover:border-orange hover:text-orange transition-colors"
    >
      {city}
      {variant === "mulch" && (
        <span className="ml-1.5 text-xs text-muted-foreground">(Mulch)</span>
      )}
    </Link>
  )
}
