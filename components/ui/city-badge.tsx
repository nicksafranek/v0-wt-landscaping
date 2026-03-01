"use client"

import { cn } from "@/lib/utils"

interface CityBadgeProps {
  city: string
  variant?: "default" | "mulch"
  className?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function CityBadge({ city, variant = "default", className, onMouseEnter, onMouseLeave }: CityBadgeProps) {
  return (
    <span
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-background border border-border text-foreground transition-colors",
        variant === "default"
          ? "hover:border-orange hover:text-orange"
          : "hover:border-green-600 hover:text-green-600",
        className
      )}
    >
      {city}
    </span>
  )
}
