# WT Landscaping - Implementation Kickstart Plan

## Project Overview

**Project Type:** Single-page React Landing Page  
**Framework:** Next.js 15 (App Router)  
**Primary Goal:** Maximize conversions for landscaping quote requests  
**Target Audience:** Cleveland suburbs homeowners (Parma, Strongsville, North Royalton, Kent, Stow, Aurora areas)

---

## Technical Stack

| Technology | Purpose |
|------------|---------|
| Next.js 15 | App Router, Server Actions, Metadata API |
| Tailwind CSS v4 | Styling with custom design tokens |
| shadcn/ui | Base component library |
| Framer Motion | Animations with reduced-motion support |
| React Hook Form + Zod | Form validation (client + server) |
| Lucide React | Icon system |
| next/font/google | Font loading (Inter, Bebas Neue) |

---

## Design System

### Color Palette

```
Primary Brand:
- Orange: #FF6B00 (CTAs, icons, accents)
- Orange Hover: #E66000 (button hover states)

Neutrals:
- Deep Charcoal: #1E293B (primary text, dark mode bg)
- Light Slate Grey: #94A3B8 (secondary text, captions)
- Off-White/Ice: #F8FAFC (alternating section backgrounds)
- Pure White: #FFFFFF (primary backgrounds)

Borders:
- border-slate-200 (cards, dividers)
- border-orange-500 (hover states)
```

### Color Application Rules

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Primary Text | #1E293B | #F8FAFC |
| Secondary Text | #94A3B8 | #94A3B8 |
| Background Primary | #FFFFFF | #1E293B |
| Background Secondary | #F8FAFC | #0F172A |
| CTA Buttons | #FF6B00 bg, white text | #FF6B00 bg, white text |
| Button Hover | #E66000 | #E66000 |
| Disabled States | #94A3B8 @ 50% opacity | #94A3B8 @ 50% opacity |

### Typography

| Element | Font | Weight | Mobile | Desktop |
|---------|------|--------|--------|---------|
| H1 | Bebas Neue | 700 | 2.5rem | 4rem |
| H2 | Bebas Neue | 700 | 2rem | 3rem |
| H3 | Bebas Neue | 600 | 1.5rem | 1.875rem |
| Body | Inter | 400 | 1rem | 1.125rem |
| Captions | Inter | 400 | 0.875rem | 0.875rem |

### Accessibility Requirements

- WCAG AA contrast compliance (4.5:1 minimum)
- White text on orange buttons
- No orange for small body text
- All interactive elements: 48px minimum touch target
- prefers-reduced-motion support for all animations
- Proper ARIA labels on all form fields
- Focus states on all interactive elements

---

## Component Architecture

### File Structure

```
/app
  /layout.tsx          # Root layout with fonts, metadata
  /page.tsx            # Main landing page (orchestrates sections)
  /globals.css         # Tailwind config, design tokens
  /actions/
    /quote.ts          # Server Action for form submission

/components
  /layout/
    /header.tsx        # Sticky navigation (~150 lines)
    /footer.tsx        # Footer with NAP, maps, links (~200 lines)
    /mobile-menu.tsx   # Slide-in sheet menu (~100 lines)
  
  /sections/
    /hero.tsx          # Hero section (~150 lines)
    /services-grid.tsx # 5-card services grid (~200 lines)
    /service-areas.tsx # Dual-column badges (~150 lines)
    /social-proof.tsx  # Before/after + testimonials (~250 lines)
  
  /ui/
    /quote-modal.tsx   # Desktop modal form (~200 lines)
    /quote-drawer.tsx  # Mobile drawer form (~200 lines)
    /before-after-slider.tsx  # Interactive comparison (~150 lines)
    /service-card.tsx  # Individual service card (~80 lines)
    /city-badge.tsx    # Clickable city badge (~50 lines)
    /testimonial-card.tsx    # Review with stars (~100 lines)

/lib
  /constants.ts        # NAP data, cities, services config
  /schemas.ts          # Zod validation schemas
  /utils.ts            # Utility functions (cn, etc.)
```

### Component Size Target

**Maximum ~600 lines per file** to maintain readability and avoid refactoring.

---

## Page Sections Specification

### 1. Header/Navigation

```
Height: 72px fixed
Padding: px-6
Background: white/80 with backdrop-blur-md
Border: border-b border-slate-200
Position: Fixed (always visible)

Desktop Layout:
- Left: Logo placeholder (180px x 48px)
- Right: "Schedule a Quote" orange button

Mobile Layout:
- Left: Logo
- Right: Hamburger icon
- Sheet: Slide-in from right with nav links + prominent CTA
```

### 2. Hero Section

```
Height: 75vh
Background: Darkened image with 40% black overlay
Layout: Centered content

Content:
- H1: "BEST Landscaping & Snow Removal Cleveland Suburbs - Professional Lawn Mowing, Edging, & Mulch"
- Subheading: "WT Landscaping provides elite, year-round property maintenance. Serving North Royalton, Parma, Strongsville, Broadview Heights, and surrounding Cleveland suburbs. Professional mulch delivery available in Kent, Stow, and Aurora."
- CTA Button: "Get Your Free Quote" (opens modal/drawer)
- Secondary: Phone link "Call/Text: 440-429-7313"

Animation: Staggered slide-up entrance (Framer Motion)
Mobile: Stack vertically, center-aligned, scaled H1
```

### 3. Services Grid

```
Background: #F8FAFC (alternating section)
Grid: 
- Desktop: 5 columns
- Tablet: 3 columns  
- Mobile: 1 column

Card Structure:
- Icon (Lucide, #FF6B00)
- Title (H3)
- Description

Card Styling:
- bg-white
- border border-slate-200
- shadow-sm
- Hover: scale-105, border-orange-500

Animation: whileInView with 0.1s stagger

Services Data:
1. Lawn Mowing & Edging: "Precision cuts and crisp edges for a manicured look in the Cleveland suburbs."
2. Mulch Installation: "Premium double-shredded mulch delivered and installed in Kent, Stow, and Aurora."
3. Hedge Trimming: "Professional pruning and shaping to enhance your property's curb appeal and plant health."
4. Seasonal Cleanups: "Comprehensive leaf removal and bed clearing for Spring and Fall readiness."
5. Snow Removal: "Reliable 24/7 driveway and sidewalk clearing for safe winter access in the Cleveland area."
```

### 4. Service Areas Module

```
Background: bg-slate-50
Layout: Two columns (stack on mobile)

Column 1 - "Full Service Areas":
Cities (as badges, linked to /services/[city-name]):
- North Royalton
- Parma
- Garfield Heights
- Maple Heights
- Strongsville
- Brecksville
- Broadview Heights
- Brooklyn
- Old Brooklyn
- Middleburg Heights

Column 2 - "Specialty Mulching Service":
Cities:
- Kent
- Stow
- Aurora

Badge Styling: Clickable, hover state, internal links
Mobile: Stack vertically, Full Service first
```

### 5. Social Proof Section

```
Layout: Before/After slider + Testimonials

Before/After:
- Aspect ratio: 16:9
- Format: WebP optimized
- One interactive slider
- Grid of 3 additional pairs
- Alt tags: "Before and after professional landscaping service in [City] Ohio"
- Animation: 0.6s weighted transition

Testimonial:
- Quote: "WT Landscaping transformed our backyard in Strongsville. They were on time, professional, and the mulch looks incredible. Highly recommend!"
- Author: Sarah M., Strongsville Resident
- Rating: 5 stars
- Photo: Circular placeholder

Carousel:
- 5-second auto-play
- Pause on hover
- Touch swipe enabled
- Navigation arrows + dots
```

### 6. Footer

```
Background: #1E293B (Deep Charcoal)
Text: White primary, #94A3B8 secondary

Sections:
1. NAP Block (in <footer> tag):
   - WT Landscaping
   - [Street Address]
   - Kent, OH 44240
   - Phone: 440-429-7313

2. Areas We Serve:
   - City badges linking to /services/[city-name]

3. Google Maps:
   - Interactive embed placeholder

4. Social Icons:
   - Facebook (minimalist)
   - Instagram (minimalist)

5. Legal:
   - © 2026 WT Landscaping
   - Privacy Policy (placeholder link)
   - Terms of Service (placeholder link)
```

---

## Quote Form Specification

### Form Fields

| Field | Type | Required | Options |
|-------|------|----------|---------|
| Name | text | Yes | - |
| Phone | tel | Yes | - |
| Email | email | No | - |
| Service | select | Yes | Mowing, Mulch, Trimming, Cleanups, Snow |
| City | select | Yes | 13 cities list |
| Message | textarea | No | "Property details or special notes" |
| Newsletter | checkbox | No | "Sign up for Seasonal Tips" |

### Form Behavior

```
Desktop: Centered Modal (shadcn Dialog)
Mobile: Slide-up Drawer (shadcn Sheet / Vaul)

Validation:
- Client: React Hook Form + Zod
- Server: Next.js Server Action

Success UX:
- Message: "We'll contact you within 24 hours"
- Auto-close drawer/modal after 3 seconds

Endpoint: Server Action placeholder in /app/actions/quote.ts
```

### Cities Dropdown Options

```
Full Service:
- North Royalton
- Parma
- Garfield Heights
- Maple Heights
- Strongsville
- Brecksville
- Broadview Heights
- Brooklyn
- Old Brooklyn
- Middleburg Heights

Mulch Only:
- Kent
- Stow
- Aurora
```

---

## SEO Requirements

### Metadata

```typescript
// app/layout.tsx or app/page.tsx
export const metadata = {
  title: "BEST Landscaping & Snow Removal Cleveland Suburbs - WT Landscaping - Professional Lawn Mowing, Edging, Mulch & Cleanup Near Me",
  description: "WT Landscaping offers elite, year-round property care in Strongsville, Parma, & North Royalton. Get expert lawn mowing, mulch installation, & 24/7 snow removal. Schedule your free quote today!",
  robots: "index, follow",
  alternates: {
    canonical: "https://wtlandscaping.com" // Update with actual domain
  },
  openGraph: {
    title: "BEST Landscaping & Snow Removal Cleveland Suburbs - WT Landscaping",
    description: "Elite year-round property care in Cleveland suburbs. Expert lawn mowing, mulch installation, & 24/7 snow removal.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website"
  }
}
```

### Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "WT Landscaping",
  "description": "Professional landscaping and snow removal services",
  "telephone": "440-429-7313",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Street Address]",
    "addressLocality": "Kent",
    "addressRegion": "OH",
    "postalCode": "44240"
  },
  "areaServed": [
    "North Royalton", "Parma", "Garfield Heights", "Maple Heights",
    "Strongsville", "Brecksville", "Broadview Heights", "Brooklyn",
    "Old Brooklyn", "Middleburg Heights", "Kent", "Stow", "Aurora"
  ],
  "serviceType": ["Lawn Mowing", "Mulch Installation", "Hedge Trimming", "Seasonal Cleanups", "Snow Removal"]
}
```

---

## Animation Specifications

### Framer Motion Implementation

```typescript
// Hero: Staggered slide-up
const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" }
  })
}

// Service Cards: whileInView with stagger
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
}

// Card hover
whileHover={{ scale: 1.05 }}
transition={{ duration: 0.2 }}

// Before/After slider
transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
```

### Reduced Motion Support

```typescript
const prefersReducedMotion = usePrefersReducedMotion()

const variants = prefersReducedMotion 
  ? { hidden: {}, visible: {} } 
  : standardVariants
```

---

## Implementation Order

### Phase 1: Foundation
1. Configure globals.css with design tokens (colors, fonts)
2. Update layout.tsx with fonts (Inter, Bebas Neue) and metadata
3. Create /lib/constants.ts with NAP, cities, services data
4. Create /lib/schemas.ts with Zod validation schemas

### Phase 2: Layout Components
5. Build Header component with sticky navigation
6. Build Mobile Menu (Sheet) component
7. Build Footer component with NAP, maps placeholder, links

### Phase 3: Page Sections
8. Build Hero section with animations
9. Build Services Grid with cards
10. Build Service Areas with city badges
11. Build Social Proof (Before/After slider + Testimonials)

### Phase 4: Forms & Interactivity
12. Build Quote Modal (desktop)
13. Build Quote Drawer (mobile)
14. Create Server Action for form submission
15. Implement form validation

### Phase 5: Polish & SEO
16. Add JSON-LD structured data
17. Add GA4 placeholder script
18. Test dark mode
19. Test responsive breakpoints
20. Test accessibility (keyboard nav, screen reader)

---

## Dark Mode Implementation

```css
/* System-based, no manual toggle */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #1E293B;
    --foreground: #F8FAFC;
    --muted: #334155;
    --muted-foreground: #94A3B8;
    /* Orange remains vibrant but slightly desaturated */
    --primary: #FF6B00;
  }
}
```

---

## Placeholder Assets Needed

| Asset | Dimensions | Format | Notes |
|-------|------------|--------|-------|
| Logo | 180x48px | SVG/PNG | Horizontal layout |
| Hero Background | 1920x1080 | WebP | Landscaping/nature theme |
| Before/After Images | 16:9 ratio | WebP | 4 pairs total |
| Testimonial Photo | 80x80px | WebP | Circular crop |
| OG Image | 1200x630 | JPG | Social sharing |

---

## Configuration Object Location

All editable content (NAP, phone, cities) should be centralized in:

```typescript
// /lib/constants.ts
export const BUSINESS_INFO = {
  name: "WT Landscaping",
  phone: "440-429-7313",
  address: {
    street: "[Street Address]",
    city: "Kent",
    state: "OH",
    zip: "44240"
  }
}

export const SERVICE_AREAS = {
  full: ["North Royalton", "Parma", ...],
  mulchOnly: ["Kent", "Stow", "Aurora"]
}

export const SERVICES = [
  { id: "mowing", title: "Lawn Mowing & Edging", description: "...", icon: "Scissors" },
  // ...
]
```

---

## Notes

- **FAQ Section:** Will be added later for SEO purposes
- **Calendar Booking:** Form submission leads to contact; calendar integration TBD
- **Internal Linking:** City badges link to /services/[city-name] routes (for future Rank 2/3 strategy)
- **Images:** Using placeholders initially; will be replaced with actual assets

---

**Ready for Implementation**
