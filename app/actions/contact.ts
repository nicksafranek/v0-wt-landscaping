"use server"

import { serverContactSchema, type ContactFormData } from "@/lib/schemas"
import { supabase } from "@/lib/supabase"

export type ContactSubmissionResult = {
  success: boolean
  error?: string
}

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactSubmissionResult> {
  try {
    // Validate with server-side schema
    const validated = serverContactSchema.safeParse(data)

    if (!validated.success) {
      return {
        success: false,
        error: "Invalid form data. Please check your inputs.",
      }
    }

    // Check honeypot for bot detection
    if ((validated.data as Record<string, unknown>).honeypot) {
      // Silently fail for bots
      return { success: true }
    }

    // Insert into Supabase
    // Format services array into string
    const selectedServices = validated.data.service.filter(s => s !== 'other')
    let serviceString = selectedServices.map(id => {
      // We need to import SERVICE_OPTIONS here or just capitalize/pass through
      // Since we don't have easy access to SERVICE_OPTIONS in server action without importing constants
      // Let's just pass the ID for now or title case it
      return id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, ' ')
    }).join(", ")

    if (validated.data.service.includes('other') && validated.data.otherService) {
      serviceString += serviceString ? `, Other: ${validated.data.otherService}` : `Other: ${validated.data.otherService}`
    }

    const { error } = await supabase
      .from("leads")
      .insert({
        name: validated.data.name,
        phone: validated.data.phone,
        email: validated.data.email,
        address: validated.data.address,
        service: serviceString,
        city: validated.data.city,
        message: validated.data.message,
        // status will default to 'new'
      })

    if (error) {
      console.error("Supabase error:", error)
      throw error // Re-throw to be caught below
    }

    return { success: true }
  } catch (error: any) {
    console.error("Contact form submission error:", error)
    return {
      success: false,
      error: error.message || JSON.stringify(error) || "An unexpected error occurred. Please try again.",
    }
  }
}
