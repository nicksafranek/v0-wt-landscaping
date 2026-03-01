"use client"

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
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-6">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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

          {/* Comparison Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {BEFORE_AFTER_IMAGES.map((item, index) => (
              <motion.div
                key={item.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
        </div>
      </section>


    </>
  )
}
