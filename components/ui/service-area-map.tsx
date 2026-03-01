"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"
import { motion } from "framer-motion"

interface ServiceAreaMapProps {
    hoveredCity: string | null
    onHoverCity: (city: string | null) => void
    highlightedCities?: string[]
    showFullServiceArea?: boolean
    showMulchServiceArea?: boolean
    className?: string
}

const LeafletMap = dynamic(() => import("@/components/ui/leaflet-map"), {
    loading: () => <MapSkeleton />,
    ssr: false
})

function MapSkeleton() {
    return (
        <div className="w-full h-full bg-muted/20 animate-pulse flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
                <div className="w-8 h-8 border-2 border-current rounded-full animate-ping" />
                <span className="text-xs font-medium uppercase tracking-wider">Loading Map...</span>
            </div>
        </div>
    )
}

export function ServiceAreaMap({
    hoveredCity,
    onHoverCity,
    showFullServiceArea = true,
    showMulchServiceArea = true,
    className
}: ServiceAreaMapProps) {
    // Memoize the map to prevent re-renders unless props change
    const MapComponent = useMemo(() => (
        <LeafletMap
            hoveredCity={hoveredCity}
            onHoverCity={onHoverCity}
            showFullServiceArea={showFullServiceArea}
            showMulchServiceArea={showMulchServiceArea}
        />
    ), [hoveredCity, onHoverCity, showFullServiceArea, showMulchServiceArea])

    return (
        <motion.div
            className={`relative w-full aspect-square md:aspect-[4/3] bg-ice/50 dark:bg-charcoal/30 rounded-3xl overflow-hidden border border-border shadow-inner isolate z-0 ${className || ''}`}
            role="application"
            aria-label="Interactive map of service areas"
        >
            {MapComponent}

            {/* Attribution overlay (subtle) */}
            <div className="absolute bottom-1 right-1 text-[10px] text-muted-foreground/40 pointer-events-none z-[1000] px-2 bg-white/50 backdrop-blur-sm rounded">
                © OpenStreetMap
            </div>
        </motion.div>
    )
}
