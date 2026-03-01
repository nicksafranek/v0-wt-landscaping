import { useState, useRef, useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { SERVICES_EXTENDED } from "@/lib/services-data"
import { DetailedServiceCard } from "@/components/ui/detailed-service-card"

export function ServicesGrid() {
  const prefersReducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Triple the services for infinite looping
  const loopedServices = [...SERVICES_EXTENDED, ...SERVICES_EXTENDED, ...SERVICES_EXTENDED]
  const originalLength = SERVICES_EXTENDED.length

  // Initialize scroll position to the middle set
  useEffect(() => {
    if (scrollRef.current && window.innerWidth < 768) {
      const cardWidth = scrollRef.current.offsetWidth * 0.85 + 24 // card width + gap
      scrollRef.current.scrollLeft = cardWidth * originalLength
    }
  }, [originalLength])

  const handleScroll = () => {
    if (scrollRef.current && window.innerWidth < 768) {
      const scrollLeft = scrollRef.current.scrollLeft
      const cardWidth = scrollRef.current.offsetWidth * 0.85 + 24 // width + gap-6

      // Infinite Loop Logic
      const totalWidth = cardWidth * originalLength

      if (scrollLeft <= 0) {
        // Jump to the start of the last set
        scrollRef.current.scrollLeft = totalWidth
      } else if (scrollLeft >= totalWidth * 2) {
        // Jump back to the start of the second set
        scrollRef.current.scrollLeft = totalWidth
      }

      // Update active index for dots (relative to original array)
      const currentScroll = scrollRef.current.scrollLeft
      const relativeIndex = Math.round(currentScroll / cardWidth) % originalLength
      if (relativeIndex !== activeIndex) {
        setActiveIndex(relativeIndex)
      }
    }
  }

  return (
    <section
      id="services"
      className="py-24 md:py-32 bg-background relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right, rgb(148 163 184 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184 / 0.05) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto">
        <div className="px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-sm font-medium text-forest uppercase tracking-widest mb-3">
              What We Offer
            </p>
            <h2
              id="services-heading"
              className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-5"
            >
              Professional Property Services
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              From routine lawn care to emergency snow removal, we deliver reliable,
              high-quality service year-round across Northeast Ohio.
            </p>
          </motion.div>
        </div>

        {/* Mobile Carousel / Desktop Grid Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 overflow-x-auto md:overflow-visible gap-6 md:gap-8 pb-8 px-6 md:px-8 snap-x snap-mandatory hide-scrollbar"
        >
          {/* On Mobile, show looped services. On Desktop, show just original. */}
          {(typeof window !== 'undefined' && window.innerWidth < 768 ? loopedServices : SERVICES_EXTENDED).map((service, index) => (
            <div key={`${service.id}-${index}`} className="flex-shrink-0 md:flex-shrink w-auto md:w-full">
              <DetailedServiceCard
                service={service}
                index={index % originalLength}
              />
            </div>
          ))}
        </div>

        {/* Progress Dots - Mobile Only */}
        <div className="flex md:hidden justify-center gap-2 mt-4">
          {SERVICES_EXTENDED.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeIndex ? "bg-orange w-4" : "bg-orange/20"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
