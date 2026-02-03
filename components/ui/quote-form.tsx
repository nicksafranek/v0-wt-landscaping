"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { quoteFormSchema, type QuoteFormData } from "@/lib/schemas"
import { ALL_CITIES, SERVICE_OPTIONS } from "@/lib/constants"
import { submitQuoteRequest } from "@/app/actions/quote"

interface QuoteFormProps {
  onSuccess?: () => void
}

export function QuoteForm({ onSuccess }: QuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      newsletter: false,
    },
  })

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true)
    setServerError(null)

    try {
      const result = await submitQuoteRequest(data)
      
      if (result.success) {
        setIsSuccess(true)
        setTimeout(() => {
          onSuccess?.()
        }, 3000)
      } else {
        setServerError(result.error || "Something went wrong. Please try again.")
      }
    } catch {
      setServerError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="font-serif text-2xl text-foreground mb-2">Thank You!</h3>
        <p className="text-muted-foreground">
          {"We'll contact you within 24 hours to discuss your project."}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {serverError && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
          {serverError}
        </div>
      )}

      {/* Honeypot field for bot protection */}
      <input
        type="text"
        {...register("honeypot" as keyof QuoteFormData)}
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

      {/* Email (Optional) */}
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

      {/* Service Selection */}
      <div className="space-y-2">
        <Label htmlFor="service">
          Service <span className="text-destructive">*</span>
        </Label>
        <Select onValueChange={(value) => setValue("service", value)}>
          <SelectTrigger id="service" aria-invalid={!!errors.service}>
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.service && (
          <p className="text-sm text-destructive">{errors.service.message}</p>
        )}
      </div>

      {/* City Selection */}
      <div className="space-y-2">
        <Label htmlFor="city">
          City <span className="text-destructive">*</span>
        </Label>
        <Select onValueChange={(value) => setValue("city", value)}>
          <SelectTrigger id="city" aria-invalid={!!errors.city}>
            <SelectValue placeholder="Select your city" />
          </SelectTrigger>
          <SelectContent>
            {ALL_CITIES.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.city && (
          <p className="text-sm text-destructive">{errors.city.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">Property Details (Optional)</Label>
        <Textarea
          id="message"
          placeholder="Property details or special notes..."
          rows={3}
          {...register("message")}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Newsletter Checkbox */}
      <div className="flex items-center gap-3">
        <Checkbox
          id="newsletter"
          checked={watch("newsletter")}
          onCheckedChange={(checked) => setValue("newsletter", !!checked)}
        />
        <Label htmlFor="newsletter" className="text-sm text-muted-foreground cursor-pointer">
          Sign up for Seasonal Tips and exclusive offers
        </Label>
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
            Submitting...
          </>
        ) : (
          "Get Your Free Quote"
        )}
      </Button>
    </form>
  )
}
