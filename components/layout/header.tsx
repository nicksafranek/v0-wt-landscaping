"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NAV_LINKS, BUSINESS_INFO } from "@/lib/constants"
import { MobileMenu } from "./mobile-menu"
import { cn } from "@/lib/utils"

interface HeaderProps {
  onOpenQuote: () => void
}

export function Header({ onOpenQuote }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Check if a nav link is active (exact match or nested route)
  const isActiveLink = (href: string) => {
    if (href.startsWith("#")) return false
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-background/80 backdrop-blur-md border-b border-border">
        <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-[180px] h-[48px] bg-muted rounded flex items-center justify-center">
              <span className="font-serif text-xl text-foreground tracking-wider">
                {BUSINESS_INFO.name}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = isActiveLink(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive
                      ? "text-orange"
                      : "text-foreground/80 hover:text-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{BUSINESS_INFO.phoneFormatted}</span>
            </Link>
            <Button
              onClick={onOpenQuote}
              className="bg-orange text-white hover:bg-orange-hover transition-colors font-medium"
            >
              Schedule a Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </header>

      {/* Mobile Menu Sheet */}
      <MobileMenu
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
        onOpenQuote={() => {
          setMobileMenuOpen(false)
          onOpenQuote()
        }}
      />
    </>
  )
}
