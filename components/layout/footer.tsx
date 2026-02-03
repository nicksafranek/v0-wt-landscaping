"use client"

import Link from "next/link"
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react"
import { BUSINESS_INFO, SERVICE_AREAS, cityToSlug } from "@/lib/constants"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer 
      id="contact" 
      className="bg-charcoal text-white"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Business Info / NAP */}
          <div>
            <h3 className="font-serif text-2xl tracking-wide mb-6">
              {BUSINESS_INFO.name}
            </h3>
            <address className="not-italic space-y-3 text-slate-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  {BUSINESS_INFO.address.street}<br />
                  {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} {BUSINESS_INFO.address.zip}
                </span>
              </div>
              <Link
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>{BUSINESS_INFO.phoneFormatted}</span>
              </Link>
              <Link
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center gap-3 hover:text-white transition-colors"
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
              <Link
                href={BUSINESS_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Areas We Serve */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-xl tracking-wide mb-6">
              Areas We Serve
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[...SERVICE_AREAS.full, ...SERVICE_AREAS.mulchOnly].map((city) => (
                <Link
                  key={city}
                  href={`/services/${cityToSlug(city)}`}
                  className="text-sm text-slate-light hover:text-orange transition-colors"
                >
                  {city}
                </Link>
              ))}
            </div>
          </div>

          {/* Google Maps Embed */}
          <div>
            <h3 className="font-serif text-xl tracking-wide mb-6">
              Find Us
            </h3>
            <div className="aspect-square rounded-lg overflow-hidden bg-white/10">
              {/* Google Maps Embed Placeholder */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95888.58589892!2d-81.42!3d41.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8830d7958b2efab7%3A0x29c96c82f7c0d0e6!2sKent%2C%20OH%2044240!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="WT Landscaping service area map"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-light">
            &copy; {currentYear} {BUSINESS_INFO.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-light">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
