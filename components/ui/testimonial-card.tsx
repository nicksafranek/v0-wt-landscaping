"use client"

import { Star } from "lucide-react"
import Image from "next/image"
import type { Testimonial } from "@/lib/constants"

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="bg-card rounded-xl p-6 border border-border">
      {/* Stars */}
      <div className="flex gap-1 mb-4" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < testimonial.rating ? "fill-orange text-orange" : "text-muted"}`}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-foreground leading-relaxed mb-6">
        {`"${testimonial.quote}"`}
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
          {testimonial.image ? (
            <Image
              src={testimonial.image || "/placeholder.svg"}
              alt={testimonial.author}
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground font-medium">
              {testimonial.author.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <p className="font-medium text-foreground">{testimonial.author}</p>
          <p className="text-sm text-muted-foreground">{testimonial.location}</p>
        </div>
      </div>
    </article>
  )
}
