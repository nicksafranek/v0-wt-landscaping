"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Loader2, CheckCircle } from "lucide-react"
import { toast } from "sonner"
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
import { supabase } from "@/lib/supabase"

import { SERVICE_OPTIONS } from "@/lib/constants"

interface QuoteFormProps {
  onSuccess?: () => void
  variant?: "default" | "hero"
}

export function QuoteForm({ onSuccess, variant = "default" }: QuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      service: [],
    },
  })

  // Styles based on variant
  const labelStyles = variant === "hero" ? "text-white/90" : ""
  const inputStyles = variant === "hero"
    ? "bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-orange focus:ring-1 focus:ring-orange/50 transition-colors"
    : ""

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true)
    console.log("Submitting form data:", data)

    // Debug: Check if env vars are loaded (do not log full key in prod, but safe here locally for user)
    console.log("Supabase Client Check:", {
      hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    })

    try {
      // Format services array into string
      const selectedServices = data.service.filter(s => s !== 'other')
      let serviceString = selectedServices.map(id =>
        SERVICE_OPTIONS.find(opt => opt.value === id)?.label || id
      ).join(", ")

      if (data.service.includes('other') && data.otherService) {
        serviceString += serviceString ? `, Other: ${data.otherService}` : `Other: ${data.otherService}`
      }

      const { error } = await supabase
        .from("leads")
        .insert({
          name: data.name,
          phone: data.phone,
          email: data.email,
          address: data.address,
          city: data.city,
          service: serviceString,
        })

      if (error) throw error

      toast.success("Quote request sent!", {
        description: "We'll be in touch within 24 hours.",
      })
      setIsSuccess(true)
      reset()
      onSuccess?.()
    } catch (error: any) {
      console.error("Submission Error:", error)
      toast.error("Something went wrong.", {
        description: "Please try again or call us directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className={`font-serif text-2xl mb-2 ${variant === "hero" ? "text-white" : "text-foreground"}`}>Thank You!</h3>
        <p className={variant === "hero" ? "text-white/80" : "text-muted-foreground"}>
          {"We'll contact you within 24 hours to discuss your project."}
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setIsSuccess(false)}
        >
          Send Another Request
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, (errors) => console.log("Form Errors:", errors))} className="space-y-5">

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className={labelStyles}>
          Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Your full name"
          {...register("name")}
          aria-invalid={!!errors.name}
          className={inputStyles}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone" className={labelStyles}>
          Phone
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="(440) 555-0123"
          {...register("phone")}
          aria-invalid={!!errors.phone}
          className={inputStyles}
        />
        {errors.phone && (
          <p className="text-sm text-destructive">{errors.phone.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className={labelStyles}>
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          {...register("email")}
          aria-invalid={!!errors.email}
          className={inputStyles}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Service Selection */}
      {/* Service Selection */}
      <div className="space-y-3">
        <Label className={labelStyles}>
          Services
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SERVICE_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`service-${option.value}`}
                checked={(watch("service") || []).includes(option.value)}
                onCheckedChange={(checked) => {
                  const current = watch("service") || []
                  if (checked) {
                    setValue("service", [...current, option.value], { shouldValidate: true })
                  } else {
                    setValue(
                      "service",
                      current.filter((v) => v !== option.value),
                      { shouldValidate: true }
                    )
                  }
                }}
                className={variant === "hero" ? "border-white/50 data-[state=checked]:bg-orange data-[state=checked]:border-orange text-white" : ""}
              />
              <label
                htmlFor={`service-${option.value}`}
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${variant === "hero" ? "text-white/80" : "text-foreground"}`}
              >
                {option.label}
              </label>
            </div>
          ))}
          {/* Other Option */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="service-other"
              checked={(watch("service") || []).includes("other")}
              onCheckedChange={(checked) => {
                const current = watch("service") || []
                const newVal = checked
                  ? [...current, "other"]
                  : current.filter((v) => v !== "other")

                setValue("service", newVal, { shouldValidate: true })
                if (!checked) {
                  setValue("otherService", "")
                }
              }}
              className={variant === "hero" ? "border-white/50 data-[state=checked]:bg-orange data-[state=checked]:border-orange text-white" : ""}
            />
            <label
              htmlFor="service-other"
              className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${variant === "hero" ? "text-white/80" : "text-foreground"}`}
            >
              Other
            </label>
          </div>
        </div>

        {/* Conditional "Other" Input */}
        {(watch("service") || []).includes("other") && (
          <div className="mt-2">
            <Input
              placeholder="Please specify..."
              {...register("otherService")}
              className={inputStyles}
            />
          </div>
        )}

        {errors.service && (
          <p className="text-sm text-destructive">{errors.service.message}</p>
        )}
        {errors.otherService && (
          <p className="text-sm text-destructive">{errors.otherService.message}</p>
        )}
      </div>



      {/* City */}
      <div className="space-y-2">
        <Label htmlFor="city" className={labelStyles}>
          City
        </Label>
        <Input
          id="city"
          type="text"
          placeholder="Your city"
          {...register("city")}
          aria-invalid={!!errors.city}
          className={inputStyles}
        />
        {errors.city && (
          <p className="text-sm text-destructive">{errors.city.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="relative group w-full h-12 rounded-lg overflow-hidden p-[2px] transition-transform hover:scale-[1.02] active:scale-[0.98]">
        {/* Rotating Border Gradient (Counter-Clockwise) */}
        <motion.div
          className="absolute inset-[-100%]"
          animate={{ rotate: -360 }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background: "conic-gradient(from 90deg, transparent 0%, transparent 50%, rgba(249, 115, 22, 0.5) 100%)",
          }}
        />

        {/* Button Content */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="relative w-full h-full bg-orange hover:bg-orange/90 text-white transition-colors duration-200 font-medium rounded-[6px] z-10"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            "Get Your Free Quote"
          )}
        </Button>
      </div>

      {/* Trust Bar */}
      <div className={`flex items-center justify-center gap-3 text-[11px] font-medium opacity-80 ${variant === "hero" ? "text-white/80" : "text-muted-foreground"}`}>
        <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Free Quote</span>
        <span className="w-0.5 h-3 bg-current opacity-20"></span>
        <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Local Service</span>
        <span className="w-0.5 h-3 bg-current opacity-20"></span>
        <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Professional Team</span>
      </div>
    </form>
  )
}
