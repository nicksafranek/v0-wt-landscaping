# IMPLEMENTATION_UPDATE_2.md

## WT Landscaping Website Expansion Plan

This document outlines the implementation plan for expanding the WT Landscaping website with five key updates: Service Areas page, content updates, Gallery page, Contact page, and map component recentering.

---

## Overview

| Task | Priority | Estimated Files | Status |
|------|----------|-----------------|--------|
| 1. Service Areas Page | High | 2 new files | Pending |
| 2. Content Update (Service Restrictions) | High | 4 files | Pending |
| 3. Gallery Page | Medium | 1 new file | Pending |
| 4. Contact Page | High | 1 new file | Pending |
| 5. Map Component Update | Medium | 1 file | Pending |

---

## Task 1: Service Areas Page

### Objective
Create a dedicated Service Areas page that clearly distinguishes between two service tiers:
- **Section A:** Kent, Stow, Aurora - "Mulch and Spring/Fall Cleanups" only
- **Section B:** Cleveland Suburbs - Full service areas

### File: `app/service-areas/page.tsx`

### Implementation Details

```tsx
// New page structure
- Hero section with page title and description
- Section A: Kent, Stow, Aurora card
  - Icon: Leaf (from lucide-react)
  - Title: "Mulch & Seasonal Cleanup Service"
  - Description: Services limited to mulch installation and spring/fall cleanups
  - Cities listed: Kent, Stow, Aurora
  - Services included: Mulch Installation, Spring Cleanup, Fall Cleanup
  
- Section B: Cleveland Suburbs card
  - Icon: MapPin (from lucide-react)
  - Title: "Full Service Areas"
  - Description: Complete landscaping and property maintenance
  - Cities listed: North Royalton, Parma, Garfield Heights, Maple Heights, 
                   Strongsville, Brecksville, Broadview Heights, Brooklyn,
                   Old Brooklyn, Middleburg Heights
  - Services included: All services (mowing, edging, mulch, cleanups, snow removal)
```

### Design Requirements
- Match existing Services page aesthetic (clean cards, Lucide icons, professional typography)
- Use existing brand colors (orange accent, charcoal text, ice backgrounds)
- Reuse existing components: Header, Footer, QuoteModal/QuoteDrawer, Button
- Font-serif for headings, Inter for body text
- Responsive grid layout (1 column mobile, 2 columns desktop)

### Navigation Update Required
Update `lib/constants.ts` NAV_LINKS to change:
```tsx
// From:
{ label: "Service Areas", href: "#areas" }

// To:
{ label: "Service Areas", href: "/service-areas" }
```

---

## Task 2: Content Update (Service Restrictions)

### Objective
Update all instances where Kent, Stow, or Aurora are described as "Mulch Only" to say "Mulch and Spring/Fall Cleanups."

### Files to Update

#### 1. `lib/constants.ts`
- Rename `mulchOnly` array key to `limitedService` (optional but recommended for clarity)
- Update any comments referencing "mulch only"

#### 2. `components/ui/city-badge.tsx`
**Current (Line 19-21):**
```tsx
{variant === "mulch" && (
  <span className="ml-1.5 text-xs text-muted-foreground">(Mulch)</span>
)}
```

**Update to:**
```tsx
{variant === "mulch" && (
  <span className="ml-1.5 text-xs text-muted-foreground">(Mulch & Cleanups)</span>
)}
```

#### 3. `components/sections/service-areas.tsx`
**Current (Lines 63-74):**
```tsx
{/* Mulch Only Areas */}
<h3>Specialty Mulching Service</h3>
<p>Premium double-shredded mulch delivery and professional installation.</p>
```

**Update to:**
```tsx
{/* Limited Service Areas */}
<h3>Mulch & Seasonal Cleanup Service</h3>
<p>Premium double-shredded mulch installation and professional spring/fall cleanups.</p>
```

#### 4. `app/services/page.tsx`
**Current (Lines 275-295):**
```tsx
{/* Mulch Only Areas */}
<h3>Specialty Mulching Service</h3>
```

**Update to:**
```tsx
{/* Limited Service Areas */}
<h3>Mulch & Seasonal Cleanup Service</h3>
```

---

## Task 3: Gallery Page

### Objective
Build a responsive gallery page with styled placeholders (no photos yet).

### File: `app/gallery/page.tsx`

### Implementation Details

```tsx
// Page structure
- Header component (with quote modal integration)
- Hero section
  - Title: "Our Work"
  - Subtitle: "Browse our portfolio of completed landscaping projects..."
  
- Gallery Grid
  - Responsive: 1 col mobile, 2 cols tablet, 3 cols desktop
  - Placeholder cards with:
    - Styled empty state (gradient background or icon)
    - Service type label (e.g., "Mulch Installation", "Lawn Mowing")
    - "Coming Soon" badge
    
- CTA Section
  - "Want to see your property transformed?"
  - Get Your Free Quote button

- Footer component
```

### Placeholder Design
Each gallery card should have:
- Aspect ratio: 4:3 or square
- Background: Subtle gradient or `bg-muted` with centered icon
- Icon: Camera or Image icon (from lucide-react)
- Label: Service category
- Border: `border-border`, rounded corners
- Hover effect: Slight scale or border color change

### Navigation
Update `lib/constants.ts` NAV_LINKS:
```tsx
// From:
{ label: "Gallery", href: "#gallery" }

// To:
{ label: "Gallery", href: "/gallery" }
```

---

## Task 4: Contact Page

### Objective
Build a professional contact page with lead capture form and business info.

### File: `app/contact/page.tsx`

### Implementation Details

```tsx
// Page structure
- Header component
- Hero section
  - Title: "Contact Us"
  - Subtitle: "Ready to transform your property? Get in touch..."

- Two-column layout (stacks on mobile)
  - Left: Contact Form
  - Right: Business Info + Map

// Contact Form Fields
- Name (required) - Input component
- Email (required) - Input component  
- Phone (optional) - Input component
- Address/City (required) - Input component
- Service Type (required) - Select component with service options
- Message (optional) - Textarea component
- Submit Button - "Send Message" or "Request Quote"

// Business Info Section
- Company name
- Phone: (440) 429-7313
- Email: info@wtlandscaping.com
- Address: North Royalton, OH
- Business hours (if applicable)
- Social media links

// Map Section
- Embedded Google Map (recentered per Task 5)
```

### Form Handling
- Use existing `quote-form.tsx` patterns for consistency
- Include validation with existing schema patterns from `lib/schemas.ts`
- Success state: Show confirmation message
- Error state: Display validation errors

### Navigation
Update `lib/constants.ts` NAV_LINKS:
```tsx
// From:
{ label: "Contact", href: "#contact" }

// To:
{ label: "Contact", href: "/contact" }
```

---

## Task 5: Map Component Update

### Objective
Update the Google Maps embed to be centered on North Royalton, Ohio (instead of Kent, OH) with a zoom level that shows coverage across Cleveland suburbs down to Kent.

### File: `components/layout/footer.tsx`

### Current Implementation (Line 89-99)
```tsx
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95888.58589892!2d-81.42!3d41.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8830d7958b2efab7%3A0x29c96c82f7c0d0e6!2sKent%2C%20OH%2044240!5e0!3m2!1sen!2sus!4v1"
  ...
/>
```

### Updated Implementation
```tsx
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190000!2d-81.55!3d41.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8830e5b0c4b4d3c7%3A0x8e5f7c7d7a7c7d7a!2sNorth%20Royalton%2C%20OH!5e0!3m2!1sen!2sus!4v1"
  ...
/>
```

### Coordinates Reference
- **North Royalton, OH:** 41.3137° N, 81.7246° W
- **Zoom level:** Wider zoom (~10) to show Cleveland metro down to Kent area

---

## File Summary

### New Files to Create
| File Path | Purpose |
|-----------|---------|
| `app/service-areas/page.tsx` | Service Areas dedicated page |
| `app/gallery/page.tsx` | Gallery page with placeholders |
| `app/contact/page.tsx` | Contact page with lead form |

### Files to Modify
| File Path | Changes |
|-----------|---------|
| `lib/constants.ts` | Update NAV_LINKS hrefs |
| `components/ui/city-badge.tsx` | Update "(Mulch)" to "(Mulch & Cleanups)" |
| `components/sections/service-areas.tsx` | Update section title and description |
| `app/services/page.tsx` | Update section title |
| `components/layout/footer.tsx` | Recenter map to North Royalton |

---

## Implementation Order

1. **Task 2: Content Updates** - Quick text changes, foundational
2. **Task 5: Map Update** - Quick embed URL change
3. **Task 1: Service Areas Page** - New page, depends on updated content
4. **Task 4: Contact Page** - New page with form
5. **Task 3: Gallery Page** - New page with placeholders

---

## Design Tokens Reference

From `globals.css`:
- Primary/CTA: `bg-orange` (#FF6B00)
- Hover: `bg-orange-hover` (#E66000)
- Background: `bg-background` / `bg-ice`
- Text: `text-foreground` / `text-charcoal`
- Muted: `text-muted-foreground` / `text-slate-light`
- Cards: `bg-card border-border rounded-xl`
- Headings: `font-serif tracking-wide`

## Component Reuse

Leverage these existing components:
- `Header` - Site header with quote modal trigger
- `Footer` - Site footer with contact info
- `QuoteModal` / `QuoteDrawer` - Quote form modal/drawer
- `Button` - Styled button component
- `CityBadge` - Clickable city pill component
- `Input`, `Select`, `Textarea`, `Label` - Form components

---

## Ready for Approval

Please review this implementation plan and approve to proceed with development.
