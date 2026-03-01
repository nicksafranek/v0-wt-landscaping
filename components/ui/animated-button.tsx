"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { type VariantProps } from "class-variance-authority"

interface AnimatedButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
    wrapperClassName?: string
    gradientColors?: string
    rotateDuration?: number
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
    ({ className, wrapperClassName, gradientColors, rotateDuration = 7, children, ...props }, ref) => {
        return (
            <div
                className={cn(
                    "relative group w-full h-12 rounded-lg overflow-hidden p-[2px] transition-transform hover:scale-[1.02] active:scale-[0.98]",
                    wrapperClassName
                )}
            >
                {/* Rotating Border Gradient (Counter-Clockwise) */}
                <motion.div
                    className="absolute inset-[-100%]"
                    animate={{ rotate: -360 }}
                    transition={{
                        duration: rotateDuration,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        background: gradientColors || "conic-gradient(from 90deg, transparent 0%, transparent 50%, rgba(249, 115, 22, 0.5) 100%)",
                    }}
                />

                {/* Button Content */}
                <Button
                    ref={ref}
                    className={cn(
                        "relative w-full h-full bg-orange hover:bg-orange/90 text-white transition-colors duration-200 font-medium rounded-[6px] z-10",
                        className
                    )}
                    {...props}
                >
                    {children}
                </Button>
            </div>
        )
    }
)
AnimatedButton.displayName = "AnimatedButton"

export { AnimatedButton }
