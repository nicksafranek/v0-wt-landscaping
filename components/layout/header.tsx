"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NAV_LINKS, BUSINESS_INFO } from "@/lib/constants"
import { MobileMenu } from "./mobile-menu"
import { ServicesDropdown } from "./services-dropdown"
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
      <header className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-white/95 backdrop-blur-md border-b border-black/5 shadow-sm">
        <div className="h-full max-w-7xl 2xl:max-w-[1600px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* Desktop Logo (Full) */}
            <div className="hidden md:block relative w-[180px] h-[48px]">
              <Image
                src="/images/logo/logo-full2.svg"
                alt="WT Property Maintenance Full Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* Mobile Logo (Full Horizontal) */}
            <div className="block md:hidden relative w-[140px] h-[40px]">
              <Image
                src="/images/logo/logo-full2.svg"
                alt="WT Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              // Special handling for Services dropdown
              if (link.label === "Services") {
                return <ServicesDropdown key={link.href} />
              }

              const isActive = isActiveLink(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive
                      ? "text-orange"
                      : "text-neutral-600 hover:text-neutral-900"
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
              className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{BUSINESS_INFO.phoneFormatted}</span>
            </Link>
            <div>
              <Button
                onClick={onOpenQuote}
                className="bg-orange text-white hover:bg-orange-hover transition-all duration-300 font-medium btn-glow hover:scale-110"
              >
                Schedule a Quote
              </Button>
            </div>
          </div>

          {/* Mobile Actions & Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-orange/10 text-orange"
              aria-label="Call Now"
            >
              <Phone className="w-5 h-5" />
            </Link>
            <Button
              onClick={onOpenQuote}
              className="h-10 px-4 bg-orange text-white text-xs font-bold rounded-full"
            >
              Quote
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-neutral-900 h-10 w-10"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
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
