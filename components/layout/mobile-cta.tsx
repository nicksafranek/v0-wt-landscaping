"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Phone, Calculator } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { BUSINESS_INFO } from "@/lib/constants"
import { useIsMobile } from "@/hooks/use-mobile"
import { QuoteDrawer } from "@/components/ui/quote-drawer"
import { cn } from "@/lib/utils"

export function MobileCTA() {
    const isMobile = useIsMobile()
    const [quoteOpen, setQuoteOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    // Show after scrolling down slightly
    useEffect(() => {
        const handleScroll = () => {
            // Show when scrolled down 150px
            if (window.scrollY > 150) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Only render on mobile
    if (!isMobile) return null

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed bottom-0 left-0 right-0 z-50 bg-charcoal/95 backdrop-blur-md border-t border-white/10 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-10px_40px_-5px_rgba(0,0,0,0.3)]"
                    >
                        <div className="flex gap-4 max-w-md mx-auto">
                            <Link
                                href={`tel:${BUSINESS_INFO.phone}`}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-2 h-12 rounded-lg font-semibold transition-colors",
                                    "bg-white text-charcoal active:bg-slate-200"
                                )}
                            >
                                <Phone className="w-5 h-5" />
                                <span>Call Now</span>
                            </Link>
                            <button
                                onClick={() => setQuoteOpen(true)}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-2 h-12 rounded-lg font-semibold transition-colors",
                                    "bg-orange text-white active:bg-orange-hover"
                                )}
                            >
                                <Calculator className="w-5 h-5" />
                                <span>Get Quote</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <QuoteDrawer open={quoteOpen} onOpenChange={setQuoteOpen} />
        </>
    )
}
