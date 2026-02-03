"use client"

import { motion, useReducedMotion } from "framer-motion"
import { TESTIMONIALS } from "@/lib/constants"
import { BeforeAfterSlider } from "@/components/ui/before-after-slider"
import { TestimonialCard } from "@/components/ui/testimonial-card"

// Placeholder before/after data
const BEFORE_AFTER_IMAGES = [
  {
    id: "1",
    before: "/images/before-1.webp",
    after: "/images/after-1.webp",
    location: "Strongsville",
  },
  {
    id: "2",
    before: "/images/before-2.webp",
    after: "/images/after-2.webp",
    location: "Parma",
  },
  {
    id: "3",
    before: "/images/before-3.webp",
    after: "/images/after-3.webp",
    location: "Kent",
  },
]

export function SocialProof() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section 
      id="gallery" 
      className="py-20 bg-background"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
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
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real transformations from real Cleveland-area homeowners. 
            See the difference professional landscaping makes.
          </p>
        </motion.div>

        {/* Main Before/After Slider */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <BeforeAfterSlider
            beforeImage={BEFORE_AFTER_IMAGES[0].before}
            afterImage={BEFORE_AFTER_IMAGES[0].after}
            beforeAlt={`Before professional landscaping service in ${BEFORE_AFTER_IMAGES[0].location} Ohio`}
            afterAlt={`After professional landscaping service in ${BEFORE_AFTER_IMAGES[0].location} Ohio`}
          />
        </motion.div>

        {/* Additional Before/After Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {BEFORE_AFTER_IMAGES.slice(1).map((item, index) => (
            <motion.div
              key={item.id}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <BeforeAfterSlider
                beforeImage={item.before}
                afterImage={item.after}
                beforeAlt={`Before professional landscaping service in ${item.location} Ohio`}
                afterAlt={`After professional landscaping service in ${item.location} Ohio`}
              />
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="font-serif text-2xl text-foreground tracking-wide text-center mb-8">
            What Our Customers Say
          </h3>
          <div className="max-w-2xl mx-auto">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
