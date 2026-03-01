"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { QuoteModal } from "@/components/ui/quote-modal"
import { QuoteDrawer } from "@/components/ui/quote-drawer"
import { Button } from "@/components/ui/button"
import { AnimatedButton } from "@/components/ui/animated-button"
import { BUSINESS_INFO } from "@/lib/constants"
import { Phone, Camera } from "lucide-react"
import { GiFarmTractor, GiWheelbarrow, GiShears, GiRake } from "react-icons/gi"
import { BsSnow } from "react-icons/bs"

// Gallery types
interface GalleryImage {
  id: number
  alt: string
  src?: string
}

interface GalleryCategory {
  id: string
  title: string
  description: string
  icon: any
  images: GalleryImage[]
}

// Gallery categories with placeholder data
const GALLERY_CATEGORIES: GalleryCategory[] = [
  {
    id: "mulch",
    title: "Mulch Installation",
    description: "Premium mulch for beautiful beds",
    icon: GiWheelbarrow,
    images: [
      { id: 4, alt: "Fresh mulch installation in Kent", src: "/images/WT_Landscaping/IMG_1450.webp" },
      { id: 16, alt: "Premium mulch installation", src: "/images/WT_Landscaping/Mulch-2.webp" },
    ],
  },
  {
    id: "lawn-care",
    title: "Lawn Care",
    description: "Precision mowing and edging for pristine lawns",
    icon: GiFarmTractor,
    images: [
      { id: 2, alt: "Precision edging along walkway", src: "/images/WT_Landscaping/IMG_1372.webp" },
      { id: 3, alt: "Striped lawn pattern in Parma", src: "/images/WT_Landscaping/IMG_0277.webp" },
    ],
  },
  {
    id: "trimming",
    title: "Hedge Trimming",
    description: "Expert shaping and pruning services",
    icon: GiShears,
    images: [
      { id: 7, alt: "Perfectly trimmed hedges", src: "/images/WT_Landscaping/IMG_1544.webp" },
      { id: 8, alt: "Professional shrub trimming and shaping", src: "/images/WT_Landscaping/content-shrub-trimming-1.webp" },
    ],
  },
  {
    id: "cleanups",
    title: "Seasonal Cleanups",
    description: "Spring and fall property preparation",
    icon: GiRake,
    images: [
      { id: 10, alt: "Fall leaf cleanup in Brecksville", src: "/images/WT_Landscaping/Cleanup-1.webp" },
      { id: 11, alt: "Spring bed cleanup", src: "/images/WT_Landscaping/image001.webp" },
    ],
  },
  {
    id: "snow",
    title: "Snow Removal",
    description: "Reliable winter clearing services",
    icon: BsSnow,
    images: [
      { id: 13, alt: "Cleared driveway after snowstorm", src: "/images/WT_Landscaping/snow-clearing-screenshot.webp" },
      { id: 14, alt: "Commercial lot snow removal", src: "/images/WT_Landscaping/IMG_0074_2.webp" },
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
        {/* Hero Section */}
        <section
          className="relative min-h-[60svh] w-full overflow-hidden flex items-center justify-center pt-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 15% 50%, rgba(255, 107, 0, 0.08) 0%, transparent 25%),
              radial-gradient(circle at 85% 30%, rgba(255, 107, 0, 0.05) 0%, transparent 20%)
            `
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

          <div className="relative max-w-7xl 2xl:max-w-[1600px] mx-auto px-6 py-16 md:py-24">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-orange bg-orange/10 rounded-full border border-orange/20">
                Our Work
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground tracking-wide mb-6 text-balance">
                Project Gallery
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 leading-relaxed mb-8">
                Browse our portfolio of landscaping and property maintenance projects
                across Northeast Ohio. See the quality and care we bring to every job.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <AnimatedButton
                  onClick={handleOpenQuote}
                  className="px-8"
                  wrapperClassName="w-full sm:w-auto"
                >
                  Get Your Free Quote
                </AnimatedButton>
                <Link
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex items-center gap-2 text-foreground hover:text-orange transition-colors font-medium px-6 py-3"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call {BUSINESS_INFO.phoneFormatted}</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-background border-b border-border">
          <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === null
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category.id
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
        <section
          className="relative py-16 md:py-24 bg-white overflow-hidden"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 0% 0%, rgba(249, 115, 22, 0.08) 0%, transparent 60%),
              radial-gradient(ellipse at 100% 100%, rgba(249, 115, 22, 0.05) 0%, transparent 60%),
              url("data:image/svg+xml,%3Csvg width='800' height='800' viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M800 584.2C787 581 773.8 578.4 760 577.2c-29-2.5-56 3.7-81.6 13.3-25.5 9.7-47.5 23-66.5 38.8-19 15.8-35.3 32.8-49 51-13.6 18.2-24.8 37.3-33.6 57.3-1.6 4-3 8-4.3 12h32c9.5-26.6 23.4-51.5 41-73.4 17.6-22 38.6-41.4 62-57.5 23.4-16.2 49-28.5 76-36.4 14.5-4.2 29.5-6.5 45-7.7V584.2zM0 318c15.5 1.2 30.5 3.5 45 7.7 27 8 52.6 20.2 76 36.4C144.4 378 165.4 397.5 183 419.5c17.6 22 31.5 46.8 41 73.4 1.3 3.6 2.5 7.3 3.6 11h32.7c-13.7-42.3-36.4-80.4-66.7-111.4C163.3 361.5 125.2 338.8 83 325.2c-26.2-8.5-53.7-11.7-81.5-9.2C-1.5 316.2-3 316.4-4.5 316.7L0 318zM0 457.7c28.3-2.6 56.5 0.5 83.2 9.2 42.2 13.6 80.3 36.3 111.4 66.6 30.3 30.3 53 68.4 66.6 110.6 8.7 26.6 11.8 54.8 9.3 83.2l0 .7h32.3c3.2-38-2.6-76-17.5-111.2-15-35-37.5-66.4-66.2-92.4-28.8-26-62.5-45.6-100-58-37.5-12.4-77.5-16.7-117.6-12.7V457.7zM800 242.3V104.5c-40 4-80 8.3-117.6 20.7-37.5 12.4-71.2 32-100 58-28.7 26-51.2 57.2-66.2 92.4C501.3 311 495.5 349 498.7 387h32.3c-2.4-28.4 0.7-56.6 9.3-83.2 13.6-42.2 36.3-80.3 66.6-110.6C638.2 163 676.3 140.2 718.5 126.7c26.7-8.7 54.9-11.7 83.2-9.2L800 242.3z' fill='%23F97316' fill-opacity='0.04' fill-rule='evenodd'/%3E%3C/svg%3E")
            `,
            backgroundSize: '100% 100%, 100% 100%, 800px 800px',
            backgroundRepeat: 'no-repeat, no-repeat, repeat'
          }}
        >
          <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-6">
            {filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="mb-16 pb-16 border-b border-border last:mb-0 last:pb-0 last:border-b-0"
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

                {/* Mobile Carousel / Desktop Grid */}
                <CategoryCarousel
                  images={category.images}
                  prefersReducedMotion={prefersReducedMotion}
                />
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
          <div className="max-w-[1440px] mx-auto px-6">
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
                <AnimatedButton
                  onClick={handleOpenQuote}
                  className="bg-white text-orange hover:bg-white/90 hover:text-orange"
                  wrapperClassName="w-full sm:w-auto"
                  gradientColors="conic-gradient(from 90deg, transparent 0%, transparent 50%, rgba(255, 255, 255, 0.8) 100%)"
                >
                  Get Your Free Quote
                </AnimatedButton>
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

function CategoryCarousel({ images, prefersReducedMotion }: { images: GalleryImage[], prefersReducedMotion: boolean | null }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const loopedImages = [...images, ...images, ...images]
  const originalLength = images.length

  useEffect(() => {
    if (scrollRef.current && window.innerWidth < 1024) {
      const cardWidth = scrollRef.current.offsetWidth * 0.85 + 24 // width + gap
      scrollRef.current.scrollLeft = cardWidth * originalLength
    }
  }, [originalLength])

  const handleScroll = () => {
    if (scrollRef.current && window.innerWidth < 1024) {
      const scrollLeft = scrollRef.current.scrollLeft
      const cardWidth = scrollRef.current.offsetWidth * 0.85 + 24
      const totalWidth = cardWidth * originalLength

      if (scrollLeft <= 0) {
        scrollRef.current.scrollLeft = totalWidth
      } else if (scrollLeft >= totalWidth * 2) {
        scrollRef.current.scrollLeft = totalWidth
      }

      const currentScroll = scrollRef.current.scrollLeft
      const relativeIndex = Math.round(currentScroll / cardWidth) % originalLength
      if (relativeIndex !== activeIndex) {
        setActiveIndex(relativeIndex)
      }
    }
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex lg:grid lg:grid-cols-2 gap-6 overflow-x-auto lg:overflow-visible px-0 lg:px-0 snap-x snap-mandatory hide-scrollbar pb-6"
      >
        {(typeof window !== 'undefined' && window.innerWidth < 1024 ? loopedImages : images).map((image, index) => (
          <motion.div
            key={`${image.id}-${index}`}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="group relative aspect-[3/2] rounded-xl overflow-hidden bg-muted border border-border shadow-sm snap-center shrink-0 w-[85vw] lg:w-full"
          >
            {image.src ? (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-all duration-500 brightness-110 saturate-150 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <Camera className="w-12 h-12 mb-3 opacity-50" />
                <span className="text-sm text-center px-4">{image.alt}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Dots indicator - Mobile only */}
      <div className="flex lg:hidden justify-center gap-2 mt-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === activeIndex ? "bg-orange w-3" : "bg-orange/20"
              }`}
          />
        ))}
      </div>
    </div>
  )
}
