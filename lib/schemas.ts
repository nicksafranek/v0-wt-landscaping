import { z } from "zod"
import { ALL_CITIES, SERVICE_OPTIONS } from "./constants"

// Quote Form Schema
export const quoteFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[\d\s\-\(\)]+$/, "Please enter a valid phone number"),
  email: z
    .string()
    .email("Please enter a valid email")
    .optional()
    .or(z.literal("")),
  service: z.enum(
    SERVICE_OPTIONS.map(s => s.value) as [string, ...string[]],
    { errorMap: () => ({ message: "Please select a service" }) }
  ),
  city: z.enum(
    ALL_CITIES as unknown as [string, ...string[]],
    { errorMap: () => ({ message: "Please select your city" }) }
  ),
  message: z
    .string()
    .max(1000, "Message must be less than 1000 characters")
    .optional()
    .or(z.literal("")),
  newsletter: z.boolean().default(false),
})

export type QuoteFormData = z.infer<typeof quoteFormSchema>

// Server-side validation (can add additional checks)
export const serverQuoteSchema = quoteFormSchema.extend({
  // Add any server-only validation here
  honeypot: z.string().max(0, "Bot detected").optional(),
})

export type ServerQuoteData = z.infer<typeof serverQuoteSchema>

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[\d\s\-\(\)]+$/, "Please enter a valid phone number"),
  email: z
    .string()
    .email("Please enter a valid email")
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .max(200, "Address must be less than 200 characters")
    .optional()
    .or(z.literal("")),
  service: z
    .string()
    .optional()
    .or(z.literal("")),
  city: z
    .string()
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Server-side contact validation
export const serverContactSchema = contactFormSchema.extend({
  honeypot: z.string().max(0, "Bot detected").optional(),
})

export type ServerContactData = z.infer<typeof serverContactSchema>
