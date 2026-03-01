import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Get a Free Estimate | WT Property Maintenance",
    description: "Ready for a sharper property? Contact WT Property Maintenance for a free estimate on lawn mowing, mulch, or snow removal in North Royalton. Reach out today!",
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
