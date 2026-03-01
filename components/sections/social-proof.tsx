import { useState, useRef, useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { TESTIMONIALS } from "@/lib/constants"
import { ComparisonCard } from "@/components/ui/comparison-card"
import { TestimonialCard } from "@/components/ui/testimonial-card"

// Placeholder before/after data
const BEFORE_AFTER_IMAGES = [
  {
    id: "1",
    before: "/images/WT_Landscaping/mulchXb4.webp",
    after: "/images/WT_Landscaping/mulchXA.webp",
    location: "Strongsville",
  },
  {
    id: "2",
    before: "/images/WT_Landscaping/IMG_1539.jpeg",
    after: "/images/WT_Landscaping/IMG_1544.webp",
    location: "Parma",
  },
]

export function SocialProof() {
  const prefersReducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Triple for infinite loop
  const loopedImages = [...BEFORE_AFTER_IMAGES, ...BEFORE_AFTER_IMAGES, ...BEFORE_AFTER_IMAGES]
  const originalLength = BEFORE_AFTER_IMAGES.length

  // Initialize scroll position to the middle set
  useEffect(() => {
    if (scrollRef.current && window.innerWidth < 1024) {
      const cardWidth = scrollRef.current.offsetWidth * 0.85 + 32 // card width + gap-8
      scrollRef.current.scrollLeft = cardWidth * originalLength
    }
  }, [originalLength])

  const handleScroll = () => {
    if (scrollRef.current && window.innerWidth < 1024) {
      const scrollLeft = scrollRef.current.scrollLeft
      const cardWidth = scrollRef.current.offsetWidth * 0.85 + 32 // width + gap-8

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
    <>
      <section
        id="gallery"
        className="py-20 bg-[#FAF9F6] relative overflow-hidden"
        aria-labelledby="gallery-heading"
      >
        {/* Microscopic Grain Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto overflow-visible relative">
          <div className="px-6">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2
                id="gallery-heading"
                className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-4"
              >
                See Our Work
              </h2>
              <p className="text-muted-foreground/80 max-w-2xl mx-auto">
                Real transformations from local homeowners.
                See the difference professional landscaping makes.
              </p>
            </motion.div>
          </div>

          {/* Comparison Cards Carousel (Mobile/Tablet) / Grid (Desktop) */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex lg:grid lg:grid-cols-2 gap-8 overflow-x-auto lg:overflow-visible px-6 lg:px-0 snap-x snap-mandatory hide-scrollbar pb-8"
          >
            {(typeof window !== 'undefined' && window.innerWidth < 1024 ? loopedImages : BEFORE_AFTER_IMAGES).map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <ComparisonCard
                  beforeImage={item.before}
                  afterImage={item.after}
                  location={item.location}
                  beforeAlt={`Before professional landscaping service in ${item.location} Ohio`}
                  afterAlt={`After professional landscaping service in ${item.location} Ohio`}
                />
              </motion.div>
            ))}
          </div>

          {/* Progress Dots - Mobile Only */}
          <div className="flex lg:hidden justify-center gap-2 mt-4">
            {BEFORE_AFTER_IMAGES.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeIndex ? "bg-orange w-4" : "bg-orange/20"
                  }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
