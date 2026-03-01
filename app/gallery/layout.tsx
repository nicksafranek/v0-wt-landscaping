import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Our Work Gallery | WT Property Maintenance",
    description: "See the results for yourself. Browse our gallery of picture-perfect mulch beds, precision lawn mowing, and clean landscapes across North Royalton and Northeast Ohio.",
}

export default function GalleryLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
