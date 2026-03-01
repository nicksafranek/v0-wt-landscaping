import { motion, useReducedMotion } from "framer-motion"
import { SERVICES_EXTENDED } from "@/lib/services-data"
import { DetailedServiceCard } from "@/components/ui/detailed-service-card"

export function ServicesGrid() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="services"
      className="py-24 md:py-32 bg-background relative"
      style={{
        backgroundImage: `linear-gradient(to right, rgb(148 163 184 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184 / 0.05) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
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

        {/* First Row - 3 Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr mb-8">
          {SERVICES_EXTENDED.slice(0, 3).map((service, index) => (
            <DetailedServiceCard
              // @ts-ignore - Temporary fix for TS complexity until we standardize service types fully
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>

        {/* Second Row - 2 Services Centered */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-fr max-w-4xl w-full">
            {SERVICES_EXTENDED.slice(3, 5).map((service, index) => (
              <DetailedServiceCard
                // @ts-ignore - Temporary fix for TS complexity until we standardize service types fully
                key={service.id}
                service={service}
                index={index + 3}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
