"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Polygon, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { SERVICE_AREAS } from "@/lib/constants"

// Coordinates for service areas including new boundary points
const CITY_COORDINATES: Record<string, [number, number]> = {
    // Core Service Area (Orange)
    "North Royalton": [41.322, -81.746],
    "Broadview Heights": [41.322, -81.677],
    "Brecksville": [41.310, -81.629],
    "Strongsville": [41.313, -81.832],
    "Parma": [41.384, -81.729],
    "Independence": [41.382, -81.641],
    "Seven Hills": [41.388, -81.675],
    "Middleburg Heights": [41.367, -81.809],
    "Brooklyn": [41.435, -81.744],
    "Old Brooklyn": [41.435, -81.695],
    "Garfield Heights": [41.421, -81.603],
    "Maple Heights": [41.412, -81.560],
}



// Additional Boundary Points for Extended Area (Green)
const BOUNDARY_POINTS: Record<string, [number, number]> = {
    "Bay Village": [41.485, -81.921], // NW Cuyahoga
    "Euclid": [41.593, -81.530],      // NE Cuyahoga edge
    "Ravenna_East": [41.160, -81.240], // East bound (Ravenna)
    "Rootstown_South": [41.080, -81.240], // SE bound
    "Akron_North": [41.080, -81.520],   // Southern bound
    // "West_Limit": [41.080, -81.921], // OLD SW bound (too far south, included Medina)
    "West_Limit_North": [41.220, -81.921], // New SW bound (North of Medina/Brunswick line)
    // Add a point to "notch" out Medina
    "Medina_Notch": [41.220, -81.800], // East of Medina
    // New Eastern Line points
    "Shaker_Heights": [41.480, -81.540], // NE vertex (same lat as Rocky River)
    "Bainbridge": [41.380, -81.330],     // SE vertex for the diagonal cut
}



// Center map on North Royalton
const CENTER: [number, number] = [41.322, -81.746]
const ZOOM_LEVEL = 10

// Helper to expand polygon vertices from their centroid
function scalePolygon(vertices: [number, number][], scale: number): [number, number][] {
    if (vertices.length === 0) return vertices

    // 1. Calculate centroid
    const centroid = vertices.reduce(
        (acc, [lat, lng]) => [acc[0] + lat, acc[1] + lng],
        [0, 0]
    ).map(val => val / vertices.length) as [number, number]

    // 2. Expand points
    return vertices.map(([lat, lng]) => [
        centroid[0] + (lat - centroid[0]) * scale,
        centroid[1] + (lng - centroid[1]) * scale
    ])
}

// Polygon vertices for the Core (Orange) area - Roughly ordered counter-clockwise (HULL ONLY)
const CORE_VERTICES: [number, number][] = [
    CITY_COORDINATES["Brooklyn"],           // NW
    CITY_COORDINATES["Old Brooklyn"],       // North Center
    CITY_COORDINATES["Garfield Heights"],   // NE
    CITY_COORDINATES["Maple Heights"],      // East
    CITY_COORDINATES["Brecksville"],        // SE Tip
    CITY_COORDINATES["Broadview Heights"],  // South
    CITY_COORDINATES["North Royalton"],     // SW
    CITY_COORDINATES["Strongsville"],       // West
    CITY_COORDINATES["Middleburg Heights"], // West/NW
    // Excluded Interior Points: Parma, Seven Hills, Independence (They are inside the hull)
]

// Polygon vertices for the Extended (Green) area - Cuyahoga/Summit/Portage coverage
const EXTENDED_VERTICES: [number, number][] = [
    [41.480, -81.840],                  // NW: Rocky River (Start of horizontal North border)
    // [41.480, -81.240],                  // OLD NE: Intersection of Rocky River Lat and Ravenna Long
    BOUNDARY_POINTS["Shaker_Heights"],  // NE: Shaker Heights (End of North border)
    BOUNDARY_POINTS["Bainbridge"],      // Mid-East: Angle down to Bainbridge
    // From Bainbridge, connect to Rootstown/Ravenna South? 
    // User said "cutoff everything outside... to Bainbridge". 
    // Assuming next point is Rootstown_South to close the loop Southwards.
    BOUNDARY_POINTS["Rootstown_South"], // SE
    BOUNDARY_POINTS["Akron_North"],     // South
    BOUNDARY_POINTS["Medina_Notch"],    // Notch out Medina
    BOUNDARY_POINTS["West_Limit_North"],// SW Limit (North of Medina)
]

// Map expansion factor (1.3 = 30% bigger for "perfect" fit - ensures dots are well inside but view is tight)
const EXPANDED_CORE = scalePolygon(CORE_VERTICES, 1.3)
// Green area is already defined by custom boundaries, arguably don't need scaling but let's keep it consistent or 1.0
const EXPANDED_MULCH = EXTENDED_VERTICES

interface LeafletMapProps {
    hoveredCity: string | null
    onHoverCity: (city: string | null) => void
    showFullServiceArea?: boolean
    showMulchServiceArea?: boolean
}

// Map Controller to fit bounds dynamically
function MapController({ showFullServiceArea, showMulchServiceArea }: { showFullServiceArea?: boolean, showMulchServiceArea?: boolean }) {
    const map = useMap()

    // Calculate bounds based on VISIBLE layers
    let allCoords: [number, number][] = []

    if (showFullServiceArea) {
        // Use EXPANDED_CORE to ensure the whole orange shape is visible
        allCoords = [...allCoords, ...EXPANDED_CORE]
    }

    if (showMulchServiceArea) {
        // Use EXPANDED_MULCH for green shape
        allCoords = [...allCoords, ...EXPANDED_MULCH]
    }

    // If no layers (fallback), use all coords
    if (allCoords.length === 0) {
        allCoords = [
            ...Object.values(CITY_COORDINATES),
            ...Object.values(BOUNDARY_POINTS)
        ]
    }

    const bounds = L.latLngBounds(allCoords)

    useEffect(() => {
        // Just fit bounds once on load, with a small padding to ensure the full highlight
        // shape is reliably visible even with narrower container aspects
        if (allCoords.length > 0) {
            // Added 25px padding so the shapes aren't clipped on the edges
            map.fitBounds(bounds, { padding: [25, 25], animate: false })
        }
    }, [map]) // Removed other dependencies to prevent re-fitting on minor updates

    return null
}

export default function LeafletMap({
    hoveredCity,
    onHoverCity,
    showFullServiceArea = true,
    showMulchServiceArea = true
}: LeafletMapProps) {
    // Use SERVICE_AREAS.full for pins
    const pinCities = SERVICE_AREAS.full

    return (
        <MapContainer
            center={CENTER}
            zoom={ZOOM_LEVEL}
            scrollWheelZoom={false}
            className="w-full h-full bg-ice/50"
            zoomControl={false}
            attributionControl={false}
            zoomSnap={0.1}
            zoomDelta={0.1}
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />

            <MapController showFullServiceArea={showFullServiceArea} showMulchServiceArea={showMulchServiceArea} />

            {/* Extended Service Area Polygon (Green) - Rendered underneath */}
            {showMulchServiceArea && (
                <Polygon
                    positions={EXPANDED_MULCH}
                    pathOptions={{
                        fillColor: "#14532d", // forest
                        fillOpacity: 0.15,
                        color: "transparent",
                        weight: 0,
                        interactive: false,
                    }}
                />
            )}

            {/* Core Service Area Polygon (Orange) */}
            {showFullServiceArea && (
                <Polygon
                    positions={EXPANDED_CORE}
                    pathOptions={{
                        fillColor: "#f97316", // orange
                        fillOpacity: 0.2, // Slightly more opaque to stand out over green
                        color: "transparent", // No visible stroke
                        weight: 0,
                        interactive: false,
                    }}
                />
            )}

            {/* City Markers - Only for Full Service Cities */}
            {showFullServiceArea && pinCities.map((city) => {
                const coords = CITY_COORDINATES[city]
                if (!coords) return null

                const isHovered = hoveredCity === city
                // Check if this city is currently highlighted (hover logic driven by parent for now)

                // Custom Icon
                const customIcon = L.divIcon({
                    className: "custom-marker",
                    html: `
                        <div class="relative flex items-center justify-center w-6 h-6 -ml-3 -mt-3">
                          <div class="w-4 h-4 rounded-full ${isHovered ? "bg-orange scale-125 z-50 ring-4 ring-orange/30" : "bg-orange scale-100 ring-2 ring-white/80"} border-2 border-white shadow-lg transition-transform duration-300"></div>
                          ${isHovered ? `<div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-white dark:bg-charcoal px-2 py-1 rounded text-xs font-bold shadow-md whitespace-nowrap border border-border text-foreground">${city}</div>` : ''}
                        </div>
                      `,
                    iconSize: [24, 24],
                    iconAnchor: [12, 12],
                })

                return (
                    <Marker
                        key={city}
                        position={coords}
                        icon={customIcon}
                        eventHandlers={{
                            mouseover: () => onHoverCity(city),
                            mouseout: () => onHoverCity(null),
                        }}
                    />
                )
            })}


        </MapContainer>
    )
}
