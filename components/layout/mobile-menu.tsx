"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Phone, MessageCircle } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { NAV_LINKS, BUSINESS_INFO } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onOpenQuote: () => void
}

export function MobileMenu({ open, onOpenChange, onOpenQuote }: MobileMenuProps) {
  const pathname = usePathname()

  // Check if a nav link is active (exact match or nested route)
  const isActiveLink = (href: string) => {
    if (href.startsWith("#")) return false
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-sm bg-background">
        <SheetHeader className="text-left">
          <SheetTitle className="font-serif text-2xl tracking-wider text-foreground">
            {BUSINESS_INFO.name}
          </SheetTitle>
        </SheetHeader>

        <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => {
            const isActive = isActiveLink(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => onOpenChange(false)}
                className={cn(
                  "py-3 px-4 text-lg font-medium rounded-lg transition-colors",
                  isActive
                    ? "text-orange bg-orange/10"
                    : "text-foreground hover:bg-muted"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="mt-8 space-y-4">
          {/* Primary CTA */}
          <Button
            onClick={onOpenQuote}
            className="w-full h-12 bg-orange text-white hover:bg-orange-hover transition-colors font-medium text-lg"
          >
            Schedule a Quote
          </Button>

          {/* Contact Options */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-muted rounded-lg text-foreground hover:bg-muted/80 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="text-sm font-medium">Call</span>
            </Link>
            <Link
              href={`sms:${BUSINESS_INFO.phone}`}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-muted rounded-lg text-foreground hover:bg-muted/80 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Text</span>
            </Link>
          </div>

          {/* Phone Number Display */}
          <p className="text-center text-muted-foreground text-sm">
            {BUSINESS_INFO.phoneFormatted}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}
