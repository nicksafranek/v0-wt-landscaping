"use client"

import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { ServicesGrid } from "@/components/sections/services-grid"
import { ServiceAreas } from "@/components/sections/service-areas"
import { SocialProof } from "@/components/sections/social-proof"
import { QuoteModal } from "@/components/ui/quote-modal"
import { QuoteDrawer } from "@/components/ui/quote-drawer"

export default function HomePage() {
  const [quoteOpen, setQuoteOpen] = useState(false)
  const isMobile = useIsMobile()

  const handleOpenQuote = () => setQuoteOpen(true)

  return (
    <>
      <Header onOpenQuote={handleOpenQuote} />
      
      <main>
        <Hero onOpenQuote={handleOpenQuote} />
        <ServicesGrid />
        <ServiceAreas />
        <SocialProof />
      </main>

      <Footer />

      {/* Quote Form - Modal on Desktop, Drawer on Mobile */}
      {isMobile ? (
        <QuoteDrawer open={quoteOpen} onOpenChange={setQuoteOpen} />
      ) : (
        <QuoteModal open={quoteOpen} onOpenChange={setQuoteOpen} />
      )}
    </>
  )
}
