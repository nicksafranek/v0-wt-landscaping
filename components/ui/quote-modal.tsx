"use client"

import { Phone, MessageCircle } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { QuoteForm } from "./quote-form"
import { BUSINESS_INFO } from "@/lib/constants"

interface QuoteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function QuoteModal({ open, onOpenChange }: QuoteModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl tracking-wide">
            Get Your Free Quote
          </DialogTitle>
          <DialogDescription>
            Fill out the form below and {"we'll"} contact you within 24 hours to discuss your project.
          </DialogDescription>
        </DialogHeader>

        {/* Contact Options */}
        <div className="flex items-center justify-center gap-4 py-3 border-b border-border">
          <span className="text-sm text-muted-foreground">Or contact us directly:</span>
          <div className="flex items-center gap-2">
            <Link
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-lg text-sm text-foreground hover:bg-muted/80 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call
            </Link>
            <Link
              href={`sms:${BUSINESS_INFO.phone}`}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-lg text-sm text-foreground hover:bg-muted/80 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Text
            </Link>
          </div>
        </div>

        <QuoteForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}
