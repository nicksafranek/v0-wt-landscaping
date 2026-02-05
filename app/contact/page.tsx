"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BUSINESS_INFO, ALL_CITIES, SERVICE_OPTIONS } from "@/lib/constants"
import { contactFormSchema, type ContactFormData } from "@/lib/schemas"
import { submitContactForm } from "@/app/actions/contact"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram,
  Loader2,
  CheckCircle,
  MessageCircle
} from "lucide-react"

export default function ContactPage() {
  const prefersReducedMotion = useReducedMotion()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setServerError(null)

    try {
      const result = await submitContactForm(data)
      
      if (result.success) {
        setIsSuccess(true)
        reset()
      } else {
        setServerError(result.error || "Something went wrong. Please try again.")
      }
    } catch {
      setServerError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Dummy function for header prop
  const handleOpenQuote = () => {}

  return (
    <>
      <Header onOpenQuote={handleOpenQuote} />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-[72px]">
          <div className="bg-ice dark:bg-charcoal/50 py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center"
              >
                <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-orange bg-orange/10 rounded-full">
                  Get In Touch
                </span>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground tracking-wide mb-6 text-balance">
                  Contact Us
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Ready to transform your property? Reach out for a free quote or any questions 
                  about our landscaping and property maintenance services.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              
              {/* Contact Information */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-serif text-3xl text-foreground tracking-wide mb-8">
                  Contact Information
                </h2>

                <div className="space-y-6 mb-10">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-orange/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-orange" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                      <Link 
                        href={`tel:${BUSINESS_INFO.phone}`}
                        className="text-muted-foreground hover:text-orange transition-colors"
                      >
                        {BUSINESS_INFO.phoneFormatted}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        Call or text anytime
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-orange/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-orange" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <Link 
                        href={`mailto:${BUSINESS_INFO.email}`}
                        className="text-muted-foreground hover:text-orange transition-colors"
                      >
                        {BUSINESS_INFO.email}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        We respond within 24 hours
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-orange/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-orange" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Location</h3>
                      <p className="text-muted-foreground">
                        {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} {BUSINESS_INFO.address.zip}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Serving Cleveland suburbs and Northeast Ohio
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-orange/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-orange" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Saturday: 7:00 AM - 7:00 PM
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Emergency snow removal available 24/7
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Buttons */}
                <div className="flex flex-wrap gap-3 mb-10">
                  <Link
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="flex items-center gap-2 px-5 py-3 bg-orange text-white rounded-lg font-medium hover:bg-orange-hover transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
                  </Link>
                  <Link
                    href={`sms:${BUSINESS_INFO.phone}`}
                    className="flex items-center gap-2 px-5 py-3 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Text Us
                  </Link>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
                  <div className="flex items-center gap-3">
                    <Link
                      href={BUSINESS_INFO.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center hover:bg-orange hover:text-white transition-colors text-foreground"
                      aria-label="Follow us on Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </Link>
                    <Link
                      href={BUSINESS_INFO.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center hover:bg-orange hover:text-white transition-colors text-foreground"
                      aria-label="Follow us on Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="bg-card border border-border rounded-xl p-8">
                  <h2 className="font-serif text-2xl text-foreground tracking-wide mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Fill out the form below and we will get back to you within 24 hours.
                  </p>

                  {isSuccess ? (
                    <div className="text-center py-12">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="font-serif text-2xl text-foreground mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for reaching out. We will contact you within 24 hours.
                      </p>
                      <Button
                        onClick={() => setIsSuccess(false)}
                        variant="outline"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      {serverError && (
                        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                          {serverError}
                        </div>
                      )}

                      {/* Honeypot field for bot protection */}
                      <input
                        type="text"
                        {...register("honeypot" as keyof ContactFormData)}
                        className="sr-only"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                      />

                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your full name"
                          {...register("name")}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "name-error" : undefined}
                        />
                        {errors.name && (
                          <p id="name-error" className="text-sm text-destructive">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          Phone <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(440) 555-0123"
                          {...register("phone")}
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? "phone-error" : undefined}
                        />
                        {errors.phone && (
                          <p id="phone-error" className="text-sm text-destructive">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email">Email (Optional)</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          {...register("email")}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        {errors.email && (
                          <p id="email-error" className="text-sm text-destructive">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* Address */}
                      <div className="space-y-2">
                        <Label htmlFor="address">Property Address (Optional)</Label>
                        <Input
                          id="address"
                          type="text"
                          placeholder="123 Main St, City, OH"
                          {...register("address")}
                          aria-describedby={errors.address ? "address-error" : undefined}
                        />
                        {errors.address && (
                          <p id="address-error" className="text-sm text-destructive">
                            {errors.address.message}
                          </p>
                        )}
                      </div>

                      {/* Service Selection */}
                      <div className="space-y-2">
                        <Label htmlFor="service">Service Interested In</Label>
                        <Select onValueChange={(value) => setValue("service", value)}>
                          <SelectTrigger id="service">
                            <SelectValue placeholder="Select a service (optional)" />
                          </SelectTrigger>
                          <SelectContent>
                            {SERVICE_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* City Selection */}
                      <div className="space-y-2">
                        <Label htmlFor="city">Your City</Label>
                        <Select onValueChange={(value) => setValue("city", value)}>
                          <SelectTrigger id="city">
                            <SelectValue placeholder="Select your city (optional)" />
                          </SelectTrigger>
                          <SelectContent>
                            {ALL_CITIES.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <Label htmlFor="message">
                          Message <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your project or ask a question..."
                          rows={4}
                          {...register("message")}
                          aria-invalid={!!errors.message}
                          aria-describedby={errors.message ? "message-error" : undefined}
                        />
                        {errors.message && (
                          <p id="message-error" className="text-sm text-destructive">
                            {errors.message.message}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-orange text-white hover:bg-orange-hover transition-colors font-medium"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 md:py-20 bg-ice dark:bg-charcoal/50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-4">
                Our Service Area
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We serve homeowners throughout the Cleveland suburbs and Northeast Ohio, 
                with specialty mulch services extending to Kent, Stow, and Aurora.
              </p>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-xl overflow-hidden border border-border"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190000!2d-81.55!3d41.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8830e5b0c4b4d3c7%3A0x8e5f7c7d7a7c7d7a!2sNorth%20Royalton%2C%20OH!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="WT Landscaping service area map"
              />
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
