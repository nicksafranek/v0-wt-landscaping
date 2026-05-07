"use client"

import { motion } from "framer-motion"
import { TESTIMONIALS } from "@/lib/constants"
import { TestimonialCard } from "@/components/ui/testimonial-card"

export function Testimonials() {
  return (
    <section 
      id="testimonials" 
      className="py-24 bg-white relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            id="testimonials-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground tracking-tight mb-4"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground/80 max-w-2xl mx-auto text-lg"
          >
            Don&apos;t just take our word for it. Hear from local homeowners about their experience with WT Property Maintenance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
