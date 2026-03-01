"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Facebook, Phone, Mail, MapPin } from "lucide-react"
import { BUSINESS_INFO, SERVICE_AREAS, cityToSlug, SERVICES } from "@/lib/constants"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()

  const handleNavLinkClick = (e: React.MouseEvent, href: string) => {
    // If we're already on the link's destination page
    if (pathname === href) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <footer
      id="contact"
      className="bg-charcoal text-white"
      aria-label="Site footer"
    >
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Business Info / NAP */}
          <div className="lg:col-span-4">
            <div className="bg-white p-2 rounded-lg w-fit mb-6">
              <div className="relative w-[200px] h-[50px]">
                <Image
                  src="/images/logo/logo-full2.svg"
                  alt="WT Property Maintenance Full Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>
            <address className="not-italic space-y-3 text-slate-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} {BUSINESS_INFO.address.zip}
                </span>
              </div>
              <Link
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center gap-3 py-2 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>{BUSINESS_INFO.phoneFormatted}</span>
              </Link>
              <Link
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center gap-3 py-2 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>{BUSINESS_INFO.email}</span>
              </Link>
            </address>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              <Link
                href={BUSINESS_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-xl tracking-wide mb-6">
              Quick Links
            </h3>
            <div className="flex flex-col gap-0">
              <Link
                href="/"
                onClick={(e) => handleNavLinkClick(e, "/")}
                className="block py-2 text-sm text-slate-light hover:text-orange transition-colors"
              >
                Home
              </Link>
              <Link
                href="/services"
                onClick={(e) => handleNavLinkClick(e, "/services")}
                className="block py-2 text-sm text-slate-light hover:text-orange transition-colors"
              >
                Our Services
              </Link>
              <Link
                href="/service-areas"
                onClick={(e) => handleNavLinkClick(e, "/service-areas")}
                className="block py-2 text-sm text-slate-light hover:text-orange transition-colors"
              >
                Service Areas
              </Link>
              <Link
                href="/gallery"
                onClick={(e) => handleNavLinkClick(e, "/gallery")}
                className="block py-2 text-sm text-slate-light hover:text-orange transition-colors"
              >
                Our Work
              </Link>
              <Link
                href="/contact"
                onClick={(e) => handleNavLinkClick(e, "/contact")}
                className="block py-2 text-sm text-slate-light hover:text-orange transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 lg:justify-self-center">
            <h3 className="font-serif text-xl tracking-wide mb-6">
              Our Services
            </h3>
            <div className="flex flex-col gap-0">
              {SERVICES.map((service) => {
                const serviceHref = `/services/${service.slug}`
                return (
                  <Link
                    key={service.id}
                    href={serviceHref}
                    onClick={(e) => handleNavLinkClick(e, serviceHref)}
                    className="block py-2 text-sm text-slate-light hover:text-orange transition-colors line-clamp-1"
                  >
                    {service.title}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="lg:col-span-3 lg:justify-self-end w-full max-w-[300px] lg:max-w-none">
            <h3 className="font-serif text-xl tracking-wide mb-6">
              Find Us
            </h3>
            <div className="h-[220px] rounded-lg overflow-hidden bg-white/10 w-full">
              {/* Google Maps Embed Placeholder */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190000!2d-81.55!3d41.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8830e5b0c4b4d3c7%3A0x8e5f7c7d7a7c7d7a!2sNorth%20Royalton%2C%20OH!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="WT Property Maintenance service area map centered on North Royalton"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-light">
            &copy; {currentYear} {BUSINESS_INFO.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-light">
            {/* Links temporarily removed */}
          </div>
        </div>
      </div>
    </footer>
  )
}
