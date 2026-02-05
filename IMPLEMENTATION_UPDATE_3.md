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

## Task 2: Iconography Updates (using react-icons/gi - Game Icons)

### Current Icons (from `lib/constants.ts`)
| Service | Current Icon | Current Import |
|---------|-------------|----------------|
| Lawn Mowing & Edging | Scissors | `Scissors` from lucide-react |
| Mulch Installation | Leaf | `Leaf` from lucide-react |
| Hedge Trimming | TreeDeciduous | `TreeDeciduous` from lucide-react |
| Seasonal Cleanups | Sparkles | `Sparkles` from lucide-react |
| Snow Removal | Snowflake | `Snowflake` from lucide-react |

### New Icons (from react-icons/gi - Game Icons library)
| Service | New Icon | Import | Rationale |
|---------|----------|--------|-----------|
| Lawn Mowing & Edging | GiLawnMower | `import { GiLawnMower } from "react-icons/gi"` | Literal push lawn mower icon |
| Mulch Installation | GiWheelbarrow | `import { GiWheelbarrow } from "react-icons/gi"` | Literal wheelbarrow for hauling mulch |
| Hedge Trimming | GiBush | `import { GiBush } from "react-icons/gi"` | Literal bush/shrub icon |
| Seasonal Cleanups | GiRake | `import { GiRake } from "react-icons/gi"` | Literal rake for leaf cleanup |
| Snow Removal | GiSnowflake2 | `import { GiSnowflake2 } from "react-icons/gi"` | Matching style snowflake |

**Why react-icons/gi (Game Icons)?**
- Provides literal, detailed icons for landscaping tools (lawn mower, wheelbarrow, rake)
- 4,000+ icons with consistent visual style
- Filled/solid style works well with the orange brand color
- All icons share similar visual weight for coherence

### Files to Update
1. **`/lib/constants.ts`**: 
   - Replace lucide-react icon imports with react-icons/gi imports
   - Update Service interface to use `IconType` from react-icons instead of `LucideIcon`
   - Update each service's icon assignment

2. **`/components/ui/service-card.tsx`**:
   - Update icon rendering to work with react-icons (they use `size` prop instead of `className` width/height)
   - May need to adjust `strokeWidth` to `style` props for consistent rendering

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
- import type { LucideIcon } from 'lucide-react'
+ import { GiLawnMower, GiWheelbarrow, GiBush, GiRake, GiSnowflake2 } from 'react-icons/gi'
+ import type { IconType } from 'react-icons'

export interface Service {
  id: string
+ slug: string
  title: string
  description: string
- icon: LucideIcon
+ icon: IconType
}

export const SERVICES: Service[] = [
  {
    id: "mowing",
+   slug: "lawn-mowing",
    title: "Lawn Mowing & Edging",
    description: "...",
-   icon: Scissors,
+   icon: GiLawnMower,
  },
  {
    id: "mulch",
+   slug: "mulch",
    ...
-   icon: Leaf,
+   icon: GiWheelbarrow,
  },
  {
    id: "trimming",
+   slug: "trimming",
    ...
-   icon: TreeDeciduous,
+   icon: GiBush,
  },
  {
    id: "cleanups",
+   slug: "cleanups",
    ...
-   icon: Sparkles,
+   icon: GiRake,
  },
  {
    id: "snow",
+   slug: "snow",
    ...
-   icon: Snowflake,
+   icon: GiSnowflake2,
  },
]
```

### File 2: `/components/ui/service-card.tsx`
```diff
+ import Link from "next/link"

- <motion.article className="... hover:border-forest/20">
+ <Link href={`/services/${service.slug}`} className="block">
+   <motion.article className="... hover:border-orange/30 cursor-pointer">

// Icon container - change from forest to orange
- <div className="... bg-forest-glow ...">
+ <div className="... bg-orange/10 group-hover:bg-orange/20 ...">

// Icon rendering - react-icons use `size` and `className` for color
- <Icon className="w-7 h-7 text-forest ..." strokeWidth={1.5} />
+ <Icon size={28} className="text-orange transition-transform duration-300 group-hover:scale-110" />

+   </motion.article>
+ </Link>
```

**Note on react-icons rendering:**
- react-icons components accept `size` prop (number) instead of className width/height
- They accept `className` for color styling (text-orange works)
- They do NOT have a `strokeWidth` prop (they are filled icons)
- The icons are SVGs that inherit `currentColor` from the parent's text color

---

## Potential Challenges

1. **Icon Style Consistency**: Game Icons are filled/solid style, different from Lucide's outlined style. This actually works well for the orange brand color as filled icons have better visual presence.

2. **Animation with Link**: Wrapping motion.article in Link may require adjusting the motion props or using `motion(Link)` for proper animation inheritance.

3. **Icon Type Change**: The Service interface needs to change from `LucideIcon` to `IconType` from react-icons, which may affect type checking in other files that import SERVICES.

4. **Service Area Text**: Descriptions already correctly mention Kent/Stow/Aurora vs Cleveland Suburbs - no changes needed.

---

## Verification Checklist

- [ ] All 5 service cards display orange icons
- [ ] Hover shows orange border, lift effect, and deeper shadow
- [ ] Icons match the new assignments (Tractor, Shovel, Shrub, Leaf, Snowflake)
- [ ] Each card links to correct `/services/[slug]` route
- [ ] Cards are fully clickable (not just text)
- [ ] Smooth transitions on all hover effects
- [ ] Accessibility: proper aria-labels and focus states
