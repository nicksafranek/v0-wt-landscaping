"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PulseIndicatorProps {
    size?: "default" | "large"
}

export function PulseIndicator({ size = "default" }: PulseIndicatorProps = {}) {
    const isLarge = size === "large"

    return (
        <div className="inline-flex items-center gap-2 mb-1">
            <motion.div
                className={cn("rounded-full bg-red-600 shrink-0", isLarge ? "w-3 h-3" : "w-2.5 h-2.5")}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                aria-hidden="true"
            />
            <span className={cn("text-red-600 font-semibold tracking-wide", isLarge ? "text-[18px]" : "text-[14px]")}>
                Scheduling Now!
            </span>
        </div>
    )
}
