"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { QuoteModal } from "@/components/ui/quote-modal"
import { Button } from "@/components/ui/button"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
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
  Loader2,
  CheckCircle,
  MessageCircle
} from "lucide-react"

export default function ContactPage() {
  const prefersReducedMotion = useReducedMotion()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
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
  const handleOpenQuote = () => setIsQuoteOpen(true)

  return (
    <>
      <Header onOpenQuote={handleOpenQuote} />

      <main>
        {/* Hero Section */}
        <section
          className="relative min-h-[60svh] w-full overflow-hidden flex items-center justify-center pt-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 15% 50%, rgba(255, 107, 0, 0.08) 0%, transparent 25%),
              radial-gradient(circle at 85% 30%, rgba(255, 107, 0, 0.05) 0%, transparent 20%)
            `
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

          <div className="relative max-w-7xl 2xl:max-w-[1600px] mx-auto px-6 py-16 md:py-24">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-orange bg-orange/10 rounded-full border border-orange/20">
                Get In Touch
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground tracking-wide mb-6 text-balance">
                Contact Us
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
                Ready to transform your property? Reach out for a free quote or any questions
                about our landscaping and property maintenance services.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Content - Minimalistic Split Layout */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

              {/* Left Column: Contact Info (Clean & Minimal) */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-10"
              >
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-4">
                    Get in Touch
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                    We're here to help with all your property maintenance needs.
                    Reach out directly or send us a message.
                  </p>
                </div>

                <div className="space-y-8">
                  {[
                    {
                      icon: Phone,
                      title: "Phone",
                      content: BUSINESS_INFO.phoneFormatted,
                      link: `tel:${BUSINESS_INFO.phone}`,
                      action: "Call Now"
                    },
                    {
                      icon: Mail,
                      title: "Email",
                      content: BUSINESS_INFO.email,
                      link: `mailto:${BUSINESS_INFO.email}`,
                      action: "Email Us"
                    },
                    {
                      icon: MapPin,
                      title: "Location",
                      content: `${BUSINESS_INFO.address.city}, ${BUSINESS_INFO.address.state}`,
                      link: "/service-areas",
                      action: "View Service Area"
                    },
                    {
                      icon: Clock,
                      title: "Hours",
                      content: BUSINESS_INFO.hours,
                      link: null,
                      action: "Open Today"
                    }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center shrink-0 mt-1 transition-colors group-hover:bg-orange group-hover:text-white">
                        <item.icon className="w-5 h-5 text-orange group-hover:text-white transition-colors" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground text-lg mb-1">{item.title}</h3>
                        <p className="text-muted-foreground mb-2">{item.content}</p>
                        {item.link && (
                          <Link
                            href={item.link}
                            className="text-sm font-medium text-orange hover:text-orange-hover hover:underline underline-offset-4"
                          >
                            {item.action}
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links - Clean */}
                <div className="pt-4 border-t border-border">
                  <h3 className="font-medium text-foreground mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    <Link
                      href={BUSINESS_INFO.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-orange hover:text-white transition-all"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Contact Form (Full Border Animation) */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                {/* Moving Border Gradient Wrapper */}
                <div className="relative rounded-2xl overflow-hidden p-[1px] shadow-sm">
                  <div className="absolute inset-0 bg-border/30" /> {/* Base border color */}
                  <motion.div
                    className="absolute inset-[-100%]"
                    style={{
                      background: "conic-gradient(from 0deg, transparent 0, rgba(249, 115, 22, 0.4) 15%, transparent 30%)",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Content Container */}
                  <div className="relative bg-card rounded-2xl p-6 md:p-10 h-full">
                    <div className="mb-8">
                      <h2 className="font-serif text-2xl md:text-3xl text-foreground tracking-wide mb-2">
                        Send Us a Message
                      </h2>
                      <p className="text-muted-foreground text-sm md:text-base">
                        Fill out the form below and we'll get back to you within 24 hours.
                      </p>
                    </div>

                    {isSuccess ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="font-serif text-2xl text-foreground mb-2">Message Sent!</h3>
                        <p className="text-muted-foreground mb-6">
                          Thank you for reaching out. We will contact you shortly.
                        </p>
                        <Button
                          onClick={() => setIsSuccess(false)}
                          variant="outline"
                          className="w-full"
                        >
                          Send Another Message
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {serverError && (
                          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm text-center">
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

                        <div className="space-y-5">
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
                              className="h-12 bg-muted/30 border-input focus-visible:ring-orange focus-visible:border-orange"
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
                              className="h-12 bg-muted/30 border-input focus-visible:ring-orange focus-visible:border-orange"
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
                              className="h-12 bg-muted/30 border-input focus-visible:ring-orange focus-visible:border-orange"
                              aria-invalid={!!errors.email}
                              aria-describedby={errors.email ? "email-error" : undefined}
                            />
                            {errors.email && (
                              <p id="email-error" className="text-sm text-destructive">
                                {errors.email.message}
                              </p>
                            )}
                          </div>

                          {/* City */}
                          <div className="space-y-2">
                            <Label htmlFor="city">Your City</Label>
                            <Input
                              id="city"
                              type="text"
                              placeholder="Your city"
                              {...register("city")}
                              className="h-12 bg-muted/30 border-input focus-visible:ring-orange focus-visible:border-orange"
                              aria-invalid={!!errors.city}
                              aria-describedby={errors.city ? "city-error" : undefined}
                            />
                            {errors.city && (
                              <p id="city-error" className="text-sm text-destructive">
                                {errors.city.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                          <Label htmlFor="message">
                            Message <span className="text-destructive">*</span>
                          </Label>
                          <Textarea
                            id="message"
                            placeholder="Tell us about your project or ask a question..."
                            rows={5}
                            {...register("message")}
                            className="min-h-[150px] bg-muted/30 border-input focus-visible:ring-orange focus-visible:border-orange resize-none"
                            aria-invalid={!!errors.message}
                            aria-describedby={errors.message ? "message-error" : undefined}
                          />
                          {errors.message && (
                            <p id="message-error" className="text-sm text-destructive">
                              {errors.message.message}
                            </p>
                          )}
                        </div>

                        {/* Submit Button - Standard with Design Fit */}
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-14 bg-orange text-white hover:bg-orange/90 transition-colors font-medium text-lg mt-4 shadow-sm"
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
                </div>
              </motion.div>
            </div>
          </div >
        </section >
      </main >

      <Footer />

      {/* Quote Form - Modal on Desktop, Drawer on Mobile */}
      <QuoteModal
        open={isQuoteOpen}
        onOpenChange={setIsQuoteOpen}
      />
    </>
  )
}
