import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Landscaping Service Areas | WT Property Maintenance",
    description: "WT Property Maintenance proudly serves Cuyahoga County, Summit County, and Portage County. View our service map and schedule your free estimate today!",
}

export default function ServiceAreasLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
