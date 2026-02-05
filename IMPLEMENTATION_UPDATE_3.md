# Implementation Plan: Professional Property Services Section Polish

## Overview
Finalize the "Professional Property Services" section with brand colors, updated icons, hover interactions, and page linking.

---

## Task 1: Visual Polish & Branding Colors

### Current State
- Icons use `text-forest` (green) with `bg-forest-glow` background
- Hover border uses `hover:border-forest/20`
- Cards have `hover:shadow-lg` and `hover:-translate-y-1` (via framer-motion `y: -4`)

### Changes Required

**File: `/components/ui/service-card.tsx`**

1. **Icon Color (Base State)**
   - Change from `text-forest` to `text-orange` (brand orange `#F97316` / Tailwind `orange-500`)
   - Change icon background from `bg-forest-glow` to `bg-orange/10`

2. **Hover State**
   - Change border from `hover:border-forest/20` to `hover:border-orange-500`
   - Keep existing lift effect (`y: -4` via framer-motion)
   - Keep existing shadow transition (`shadow-sm` to `shadow-lg`)
   - Add smooth transition: `transition-all duration-300`

3. **Icon Hover Enhancement**
   - Keep the existing `group-hover:scale-110` for icon growth
   - Update glow background to use orange: `group-hover:bg-orange/20`

---

## Task 2: Iconography Updates

### Current Icons (from `lib/constants.ts`)
| Service | Current Icon | Current Import |
|---------|-------------|----------------|
| Lawn Mowing & Edging | Scissors | `Scissors` |
| Mulch Installation | Leaf | `Leaf` |
| Hedge Trimming | TreeDeciduous | `TreeDeciduous` |
| Seasonal Cleanups | Sparkles | `Sparkles` |
| Snow Removal | Snowflake | `Snowflake` (keep as-is) |

### New Icons (from Lucide React)
| Service | New Icon | New Import | Rationale |
|---------|----------|------------|-----------|
| Lawn Mowing & Edging | Tractor | `Tractor` | Represents lawn equipment/mowing machinery |
| Mulch Installation | Shovel | `Shovel` | Represents digging/garden work (closest to wheelbarrow concept) |
| Hedge Trimming | Shrub | `Shrub` | Direct representation of bushes/hedges |
| Seasonal Cleanups | Leaf | `Leaf` | Represents fallen leaves being raked (moving from Sparkles) |
| Snow Removal | Snowflake | `Snowflake` | Keep unchanged |

**Note:** Lucide doesn't have a "push lawn mower", "wheelbarrow with mulch", or "hand rake" icon. The selected alternatives are the closest literal representations available in the Lucide icon set.

### Files to Update
- **`/lib/constants.ts`**: Update icon imports and assignments in SERVICES array

---

## Task 3: Make Cards Clickable with Links

### Service Routes (from `/lib/services-data.ts`)
| Service | Slug | Full Route |
|---------|------|------------|
| Lawn Mowing & Edging | `lawn-mowing` | `/services/lawn-mowing` |
| Mulch Installation | `mulch` | `/services/mulch` |
| Hedge Trimming | `trimming` | `/services/trimming` |
| Seasonal Cleanups | `cleanups` | `/services/cleanups` |
| Snow Removal | `snow` | `/services/snow` |

### Implementation Approach

**File: `/lib/constants.ts`**
- Add `slug` property to each service in the SERVICES array (matching the slugs in services-data.ts)

**File: `/components/ui/service-card.tsx`**
- Wrap the entire `motion.article` in a Next.js `Link` component
- Change `cursor-default` to `cursor-pointer`
- Ensure the entire card is clickable
- Add appropriate `aria-label` for accessibility

---

## Implementation Order

1. **Update `lib/constants.ts`**
   - Change icon imports (Scissors → Tractor, Leaf → Shovel, TreeDeciduous → Shrub, Sparkles → Leaf)
   - Add `slug` property to each service definition
   - Update the Service interface to include `slug: string`

2. **Update `components/ui/service-card.tsx`**
   - Wrap content in Link component pointing to `/services/${service.slug}`
   - Change icon colors from forest to orange
   - Change hover border to orange
   - Update cursor and accessibility

---

## Code Changes Summary

### File 1: `/lib/constants.ts`
```diff
- import { Scissors, Leaf, TreeDeciduous, Sparkles, Snowflake } from 'lucide-react'
+ import { Tractor, Shovel, Shrub, Leaf, Snowflake } from 'lucide-react'

export interface Service {
  id: string
+ slug: string
  title: string
  description: string
  icon: LucideIcon
}

export const SERVICES: Service[] = [
  {
    id: "mowing",
+   slug: "lawn-mowing",
    title: "Lawn Mowing & Edging",
    description: "...",
-   icon: Scissors,
+   icon: Tractor,
  },
  // ... similar changes for other services
]
```

### File 2: `/components/ui/service-card.tsx`
```diff
+ import Link from "next/link"

- <motion.article className="... hover:border-forest/20">
+ <Link href={`/services/${service.slug}`} className="block">
+   <motion.article className="... hover:border-orange-500 cursor-pointer">

- <div className="... bg-forest-glow ...">
+ <div className="... bg-orange/10 ...">

- <Icon className="... text-forest ..." />
+ <Icon className="... text-orange ..." />

+   </motion.article>
+ </Link>
```

---

## Potential Challenges

1. **Icon Availability**: Lucide doesn't have exact matches for "push lawn mower" or "wheelbarrow". Using closest alternatives (Tractor, Shovel).

2. **Animation with Link**: Wrapping motion.article in Link may require adjusting the motion props or using `motion(Link)` for proper animation inheritance.

3. **Service Area Text**: Descriptions already correctly mention Kent/Stow/Aurora vs Cleveland Suburbs - no changes needed.

---

## Verification Checklist

- [ ] All 5 service cards display orange icons
- [ ] Hover shows orange border, lift effect, and deeper shadow
- [ ] Icons match the new assignments (Tractor, Shovel, Shrub, Leaf, Snowflake)
- [ ] Each card links to correct `/services/[slug]` route
- [ ] Cards are fully clickable (not just text)
- [ ] Smooth transitions on all hover effects
- [ ] Accessibility: proper aria-labels and focus states
