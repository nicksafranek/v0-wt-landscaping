"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { MapPin, Leaf } from "lucide-react"
import { SERVICE_AREAS } from "@/lib/constants"
import { CityBadge } from "@/components/ui/city-badge"
import { ServiceAreaMap } from "@/components/ui/service-area-map"

export function ServiceAreas() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="areas"
      className="relative py-24 bg-white overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 0% 0%, rgba(249, 115, 22, 0.15) 0%, transparent 60%),
          radial-gradient(ellipse at 100% 100%, rgba(34, 197, 94, 0.12) 0%, transparent 60%),
          radial-gradient(circle at 50% 10%, rgba(249, 115, 22, 0.08) 0%, transparent 40%),
          url("data:image/svg+xml,%3Csvg width='800' height='800' viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M800 584.2C787 581 773.8 578.4 760 577.2c-29-2.5-56 3.7-81.6 13.3-25.5 9.7-47.5 23-66.5 38.8-19 15.8-35.3 32.8-49 51-13.6 18.2-24.8 37.3-33.6 57.3-1.6 4-3 8-4.3 12h32c9.5-26.6 23.4-51.5 41-73.4 17.6-22 38.6-41.4 62-57.5 23.4-16.2 49-28.5 76-36.4 14.5-4.2 29.5-6.5 45-7.7V584.2zM0 318c15.5 1.2 30.5 3.5 45 7.7 27 8 52.6 20.2 76 36.4C144.4 378 165.4 397.5 183 419.5c17.6 22 31.5 46.8 41 73.4 1.3 3.6 2.5 7.3 3.6 11h32.7c-13.7-42.3-36.4-80.4-66.7-111.4C163.3 361.5 125.2 338.8 83 325.2c-26.2-8.5-53.7-11.7-81.5-9.2C-1.5 316.2-3 316.4-4.5 316.7L0 318zM0 457.7c28.3-2.6 56.5 0.5 83.2 9.2 42.2 13.6 80.3 36.3 111.4 66.6 30.3 30.3 53 68.4 66.6 110.6 8.7 26.6 11.8 54.8 9.3 83.2l0 .7h32.3c3.2-38-2.6-76-17.5-111.2-15-35-37.5-66.4-66.2-92.4-28.8-26-62.5-45.6-100-58-37.5-12.4-77.5-16.7-117.6-12.7V457.7zM800 242.3V104.5c-40 4-80 8.3-117.6 20.7-37.5 12.4-71.2 32-100 58-28.7 26-51.2 57.2-66.2 92.4C501.3 311 495.5 349 498.7 387h32.3c-2.4-28.4 0.7-56.6 9.3-83.2 13.6-42.2 36.3-80.3 66.6-110.6C638.2 163 676.3 140.2 718.5 126.7c26.7-8.7 54.9-11.7 83.2-9.2L800 242.3z' fill='%23000000' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")
        `,
        backgroundSize: '100% 100%, 100% 100%, 100% 100%, 800px 800px',
        backgroundRepeat: 'no-repeat, no-repeat, no-repeat, repeat'
      }}
      aria-labelledby="areas-heading"
    >
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-6">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2
            id="areas-heading"
            className="font-serif text-3xl md:text-4xl text-neutral-900 tracking-wide mb-4"
          >
            Areas We Serve
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Proudly serving homeowners across the Cleveland suburbs and Northeast Ohio
            with professional landscaping and property maintenance services.
          </p>
        </motion.div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-12 items-stretch">
          {/* Top Row: Cards (Mobile Only Grid) */}
          <div className="lg:col-span-5 lg:order-1 grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-col gap-3 lg:gap-6">
            {/* Full Service Areas */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative h-full"
            >
              {/* Pulsing Gradient Border Overlay */}
              <motion.div
                className="absolute -inset-[1px] rounded-lg lg:rounded-[13px] z-0 opacity-50"
                style={{
                  backgroundImage: 'linear-gradient(45deg, #F97316, #EAB308, #F97316)',
                  backgroundSize: '200% 200%'
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="relative z-10 bg-white/95 backdrop-blur-2xl rounded-lg lg:rounded-xl p-3 md:p-8 border border-white/20 h-full shadow-sm lg:shadow-lg">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-6">
                  <div className="w-7 h-7 md:w-10 md:h-10 rounded-lg bg-orange/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-orange" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-base md:text-2xl text-neutral-900 tracking-wide">
                    Full Service
                  </h3>
                </div>
                <p className="hidden md:block text-neutral-600 text-sm mb-4 md:mb-6">
                  Complete landscaping and snow removal services.
                </p>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {SERVICE_AREAS.full.map((city) => (
                    <CityBadge
                      key={city}
                      city={city}
                      onMouseEnter={() => setHoveredCity(city)}
                      onMouseLeave={() => setHoveredCity(null)}
                      className="bg-white/90 border-neutral-200 text-sm py-0.5 px-2"
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Mulch Only Areas */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-full"
            >
              {/* Pulsing Gradient Border Overlay - Green Theme */}
              <motion.div
                className="absolute -inset-[1px] rounded-lg lg:rounded-[13px] z-0 opacity-50"
                style={{
                  backgroundImage: 'linear-gradient(45deg, #10B981, #059669, #10B981)',
                  backgroundSize: '200% 200%'
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2 // Offset second card for variety
                }}
              />
              <div className="relative z-10 bg-white/95 backdrop-blur-2xl rounded-lg lg:rounded-xl p-3 md:p-8 border border-white/20 h-full shadow-sm lg:shadow-lg">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-6">
                  <div className="w-7 h-7 md:w-10 md:h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Leaf className="w-4 h-4 md:w-5 md:h-5 text-green-600" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-base md:text-2xl text-neutral-900 tracking-wide">
                    Cleanups
                  </h3>
                </div>
                <p className="hidden md:block text-neutral-600 text-sm mb-4 md:mb-6">
                  Premium mulch & seasonal cleanups.
                </p>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {SERVICE_AREAS.mulchOnly.map((city) => (
                    <CityBadge
                      key={city}
                      city={city}
                      variant="mulch"
                      onMouseEnter={() => setHoveredCity(city)}
                      onMouseLeave={() => setHoveredCity(null)}
                      className="bg-white/95 border-neutral-200 text-sm py-0.5 px-2"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Row: Map (Mobile Only Bottom) */}
          <motion.div
            className="lg:col-span-7 lg:order-2 lg:sticky lg:top-24"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full h-[300px] lg:h-full rounded-lg lg:rounded-2xl overflow-hidden border border-neutral-200 shadow-sm bg-white">
              <ServiceAreaMap
                hoveredCity={hoveredCity}
                onHoverCity={setHoveredCity}
                showFullServiceArea={true}
                showMulchServiceArea={true}
                className="w-full h-full lg:min-h-[600px] 2xl:min-h-[750px]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
