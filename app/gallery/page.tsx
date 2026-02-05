"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { QuoteModal } from "@/components/ui/quote-modal"
import { QuoteDrawer } from "@/components/ui/quote-drawer"
import { Button } from "@/components/ui/button"
import { BUSINESS_INFO } from "@/lib/constants"
import { Phone, Camera, Leaf, Scissors, Snowflake, Sparkles, TreeDeciduous } from "lucide-react"

// Gallery categories with placeholder data
const GALLERY_CATEGORIES = [
  {
    id: "lawn-care",
    title: "Lawn Care",
    description: "Precision mowing and edging for pristine lawns",
    icon: Scissors,
    images: [
      { id: 1, alt: "Freshly mowed lawn in Strongsville" },
      { id: 2, alt: "Precision edging along walkway" },
      { id: 3, alt: "Striped lawn pattern in Parma" },
    ],
  },
  {
    id: "mulch",
    title: "Mulch Installation",
    description: "Premium double-shredded mulch for beautiful beds",
    icon: Leaf,
    images: [
      { id: 4, alt: "Fresh mulch installation in Kent" },
      { id: 5, alt: "Landscape bed with black mulch" },
      { id: 6, alt: "Mulch around trees in Aurora" },
    ],
  },
  {
    id: "trimming",
    title: "Hedge Trimming",
    description: "Expert shaping and pruning services",
    icon: TreeDeciduous,
    images: [
      { id: 7, alt: "Perfectly trimmed hedges" },
      { id: 8, alt: "Boxwood hedge shaping" },
      { id: 9, alt: "Ornamental shrub pruning" },
    ],
  },
  {
    id: "cleanups",
    title: "Seasonal Cleanups",
    description: "Spring and fall property preparation",
    icon: Sparkles,
    images: [
      { id: 10, alt: "Fall leaf cleanup in Brecksville" },
      { id: 11, alt: "Spring bed cleanup" },
      { id: 12, alt: "Gutter clearing service" },
    ],
  },
  {
    id: "snow",
    title: "Snow Removal",
    description: "Reliable winter clearing services",
    icon: Snowflake,
    images: [
      { id: 13, alt: "Cleared driveway after snowstorm" },
      { id: 14, alt: "Commercial lot snow removal" },
      { id: 15, alt: "Sidewalk clearing service" },
    ],
  },
]

export default function GalleryPage() {
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const isMobile = useIsMobile()
  const prefersReducedMotion = useReducedMotion()

  const handleOpenQuote = () => setQuoteOpen(true)

  const filteredCategories = activeCategory
    ? GALLERY_CATEGORIES.filter((cat) => cat.id === activeCategory)
    : GALLERY_CATEGORIES

  return (
    <>
      <Header onOpenQuote={handleOpenQuote} />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-[72px]">
          <div className="bg-ice dark:bg-charcoal/50 py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center"
              >
                <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-orange bg-orange/10 rounded-full">
                  Our Work
                </span>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground tracking-wide mb-6 text-balance">
                  Project Gallery
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                  Browse our portfolio of landscaping and property maintenance projects 
                  across Northeast Ohio. See the quality and care we bring to every job.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    onClick={handleOpenQuote}
                    size="lg"
                    className="bg-orange text-white hover:bg-orange-hover transition-colors font-semibold px-8"
                  >
                    Get Your Free Quote
                  </Button>
                  <Link
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="flex items-center gap-2 text-foreground hover:text-orange transition-colors font-medium"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call {BUSINESS_INFO.phoneFormatted}</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === null
                    ? "bg-orange text-white"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                All Projects
              </button>
              {GALLERY_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? "bg-orange text-white"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            {filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="mb-16 last:mb-0"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-orange" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl text-foreground tracking-wide">
                      {category.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.images.map((image, imageIndex) => (
                    <motion.div
                      key={image.id}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: imageIndex * 0.1 }}
                      className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-muted border border-border"
                    >
                      {/* Placeholder - ready for real images */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                        <Camera className="w-12 h-12 mb-3 opacity-50" />
                        <span className="text-sm text-center px-4">
                          {image.alt}
                        </span>
                      </div>
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-orange/0 group-hover:bg-orange/10 transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Coming Soon Notice */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-16 text-center bg-muted rounded-xl p-8 border border-border"
            >
              <Camera className="w-12 h-12 text-orange mx-auto mb-4" />
              <h3 className="font-serif text-xl text-foreground tracking-wide mb-2">
                More Photos Coming Soon
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We are actively updating our gallery with recent projects. 
                Check back soon for more examples of our work across Northeast Ohio.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-orange">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white tracking-wide mb-6">
                Ready to Transform Your Property?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Let us bring the same quality and attention to detail to your home. 
                Get a free quote and see how we can enhance your outdoor space.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  onClick={handleOpenQuote}
                  size="lg"
                  className="bg-white text-orange hover:bg-ice transition-colors font-semibold px-8 py-6 text-lg"
                >
                  Get Your Free Quote
                </Button>
                <Link
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex items-center gap-2 text-white hover:text-white/80 transition-colors font-medium"
                >
                  <Phone className="w-5 h-5" />
                  <span>Or Call {BUSINESS_INFO.phoneFormatted}</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
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
