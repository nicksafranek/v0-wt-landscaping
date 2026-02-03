"use client"

import { Phone, MessageCircle } from "lucide-react"
import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { QuoteForm } from "./quote-form"
import { BUSINESS_INFO } from "@/lib/constants"

interface QuoteDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function QuoteDrawer({ open, onOpenChange }: QuoteDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] overflow-y-auto rounded-t-2xl">
        <SheetHeader className="text-left">
          <SheetTitle className="font-serif text-2xl tracking-wide">
            Get Your Free Quote
          </SheetTitle>
          <SheetDescription>
            Fill out the form below and {"we'll"} contact you within 24 hours.
          </SheetDescription>
        </SheetHeader>

        {/* Contact Options */}
        <div className="flex items-center gap-3 py-4 border-b border-border my-4">
          <span className="text-sm text-muted-foreground">Or call/text:</span>
          <div className="flex items-center gap-2">
            <Link
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center gap-1.5 px-3 py-2 bg-muted rounded-lg text-sm text-foreground hover:bg-muted/80 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call
            </Link>
            <Link
              href={`sms:${BUSINESS_INFO.phone}`}
              className="flex items-center gap-1.5 px-3 py-2 bg-muted rounded-lg text-sm text-foreground hover:bg-muted/80 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Text
            </Link>
          </div>
        </div>

        <div className="pb-8">
          <QuoteForm onSuccess={() => onOpenChange(false)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
