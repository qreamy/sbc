# Design Improvements — Southbase Website

## Executive Summary

**Current State:** Clean, minimal, professional. Strong foundation with consistent spacing and typography.

**Key Opportunities:**
1. **Typography Hierarchy** — Refine scale and contrast between headlines/subheads
2. **Visual Rhythm** — Add intentional variation to break monotony
3. **CTA Clarity** — Strengthen primary vs secondary distinction
4. **Trust Signals** — Add subtle credibility without clutter
5. **Section Differentiation** — Create distinct visual moments while maintaining cohesion

---

## 1. HERO SECTION

### Current Issues
- Subheadline (`— och levererar över tid.`) feels too small relative to main headline
- Secondary CTA too similar to primary (both pill-shaped, similar size)
- Logo marquee could feel more premium
- Paragraph text contrast could be stronger

### Recommendations

#### A. Typography Hierarchy
```tsx
// Current: line2 is text-4xl sm:text-5xl lg:text-6xl
// Recommended: Increase by ~15-20% for better balance

<h1 className="...">
  <span className="text-neutral-900 block">{line1}</span>
  {/* Increase size: text-5xl sm:text-6xl lg:text-7xl */}
  <span className="block text-neutral-500 mt-4 text-5xl sm:text-6xl lg:text-7xl font-medium tracking-[-0.015em] leading-[1.08]">
    {line2}
  </span>
</h1>
```

#### B. CTA Differentiation
```tsx
// Primary: Keep current dark pill (excellent)
// Secondary: Make it a text link with subtle underline, not a button

{/* Secondary CTA - Text link style */}
<a
  href="#vad"
  className="group inline-flex items-center gap-2 text-base font-medium text-neutral-600 transition-colors duration-300 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/50 focus-visible:ring-offset-4"
>
  Se hur vi jobbar
  <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 opacity-60 group-hover:opacity-100" aria-hidden="true">→</span>
  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-neutral-300 origin-left transition-all duration-300 scale-x-0 group-hover:scale-x-100" />
</a>
```

#### C. Paragraph Contrast
```tsx
// Change from text-neutral-700 to text-neutral-800 for better readability
<p className="... text-neutral-800 ...">
```

#### D. Logo Marquee Enhancement
- Add subtle border/divider above marquee
- Increase container padding slightly
- Consider adding "Vi arbetar med" or similar subtle label above

---

## 2. SERVICES SECTION ("Vi bygger försäljning...")

### Current Issues
- Background word "EXECUTION" at 4% opacity might be too subtle or distracting
- Service blocks feel uniform — could use more visual interest on hover
- Left column sticky positioning could be refined
- CTA link feels disconnected from content flow

### Recommendations

#### A. Background Word Treatment
```tsx
// Option 1: Increase opacity slightly (0.04 → 0.06) for subtle texture
// Option 2: Add blur for softer appearance
// Option 3: Use gradient opacity (darker center, lighter edges)

<div 
  className="absolute"
  style={{ 
    left: '50%',
    top: '50%',
    transform: 'translateX(-48%) translateY(-50%)',
    filter: 'blur(1px)', // Add subtle blur
  }}
>
  <span 
    className="..."
    style={{ 
      opacity: 0.06, // Slightly more visible
      letterSpacing: '-0.015em',
      fontWeight: 300,
    }}
  >
    EXECUTION
  </span>
</div>
```

#### B. Service Block Hover States
```tsx
// Add subtle background change and slight scale on hover
<div 
  className="py-10 transition-all duration-300 cursor-default rounded-xl"
  style={{
    backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.6)' : 'transparent',
    transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
    paddingLeft: isHovered ? '72px' : '68px',
  }}
>
```

#### C. CTA Integration
```tsx
// Move CTA to bottom of left column, make it more prominent
// Add subtle divider above it
<div className="pt-8 mt-8 border-t border-neutral-200/50">
  <a href="/services" className="...">
    Läs mer om vårt upplägg
  </a>
</div>
```

#### D. Number Styling Enhancement
```tsx
// Make numbers slightly larger and add subtle background circle on hover
<span 
  className="text-xs font-semibold font-mono tracking-[0.08em] transition-all duration-300"
  style={{
    color: isHovered ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.25)',
    fontSize: '12px', // Increase from 11px
    letterSpacing: '0.12em',
  }}
>
  {service.number}
</span>
```

---

## 3. ABOUT US SECTION ("Vi tar operativt ansvar")

### Current Issues
- Image feels disconnected from text (spacing/alignment)
- Credibility bullets (Mätbar pipeline, etc.) could be more prominent
- CTA at bottom feels like an afterthought
- Text width could be optimized for readability

### Recommendations

#### A. Image-Text Relationship
```tsx
// Add subtle connecting element or adjust spacing
// Consider adding a thin vertical line or divider between image and text on desktop

<div className="grid lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
  {/* Image */}
  <div className="lg:col-span-6 ...">
    ...
  </div>
  
  {/* Subtle divider on desktop */}
  <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-neutral-200/40 -translate-x-1/2" />
  
  {/* Content */}
  <div className="lg:col-span-6 ...">
    ...
  </div>
</div>
```

#### B. Credibility Points Enhancement
```tsx
// Make bullets more prominent with subtle icons or stronger typography
<div className="space-y-4 pt-4">
  <div className="flex items-start gap-4 group">
    {/* Add subtle icon or stronger visual marker */}
    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-100 group-hover:bg-neutral-200 transition-colors flex items-center justify-center mt-0.5">
      <span className="text-[10px] font-semibold text-neutral-600">✓</span>
    </div>
    <p className="text-base sm:text-lg leading-[1.7] font-normal text-neutral-700">
      <strong className="font-semibold text-neutral-900">Mätbar pipeline</strong> – Tydlig uppföljning av leads, konverteringar och resultat.
    </p>
  </div>
  {/* Repeat for other items */}
</div>
```

#### C. CTA Positioning
```tsx
// Move CTA higher, integrate with content flow
// Add subtle background or border to make it feel intentional

<div className="pt-8 mt-8 border-t border-neutral-200/50">
  <a href="/book" className="...">
    Boka ett samtal
  </a>
</div>
```

#### D. Text Width Optimization
```tsx
// Ensure optimal line length (50-65 characters)
// Current max-w-[52ch] is good, but verify on all breakpoints

<p className="text-lg sm:text-xl leading-[1.75] font-normal text-neutral-800 max-w-[56ch]">
  {/* Increase contrast: neutral-700 → neutral-800 */}
</p>
```

---

## 4. TYPOGRAPHY SYSTEM

### Recommended Type Scale

```tsx
// Create a more refined scale in design-tokens.ts

export const TYPOGRAPHY = {
  // Headlines
  h1: {
    mobile: 'text-5xl',      // 48px
    tablet: 'text-6xl',      // 60px
    desktop: 'text-7xl',     // 72px
    large: 'text-8xl',       // 96px
    lineHeight: 'leading-[1.05]',
    tracking: 'tracking-[-0.02em]',
    weight: 'font-semibold',
  },
  h2: {
    mobile: 'text-4xl',      // 36px
    tablet: 'text-5xl',      // 48px
    desktop: 'text-6xl',     // 60px
    large: 'text-7xl',       // 72px
    lineHeight: 'leading-[1.08]',
    tracking: 'tracking-[-0.015em]',
    weight: 'font-semibold',
  },
  h3: {
    mobile: 'text-2xl',      // 24px
    tablet: 'text-3xl',      // 30px
    desktop: 'text-4xl',     // 36px
    lineHeight: 'leading-[1.15]',
    tracking: 'tracking-[-0.01em]',
    weight: 'font-bold',
  },
  // Body
  lead: {
    size: 'text-lg sm:text-xl',
    lineHeight: 'leading-[1.75]',
    weight: 'font-normal',
  },
  body: {
    size: 'text-base sm:text-lg',
    lineHeight: 'leading-[1.75]',
    weight: 'font-normal',
  },
  small: {
    size: 'text-sm',
    lineHeight: 'leading-[1.6]',
    weight: 'font-normal',
  },
};
```

### Contrast Improvements

```tsx
// Update color usage for better readability
// Body text: neutral-700 → neutral-800
// Secondary text: neutral-500 → neutral-600 (slightly darker)
// Muted text: neutral-400 → neutral-500
```

---

## 5. SPACING & RHYTHM

### Section Spacing

```tsx
// Create more intentional vertical rhythm
// Hero → Services: Larger gap (current is good)
// Services → About: Medium gap
// About → Footer: Larger gap

// Add to design-tokens.ts
export const SECTION_SPACING = {
  hero: 'pb-32 sm:pb-40 lg:pb-48',      // Hero bottom padding
  services: 'py-24 sm:py-28 lg:py-32',  // Services padding
  about: 'py-24 sm:py-28 lg:py-36',     // About padding (slightly more)
};
```

### Internal Spacing

```tsx
// Ensure consistent spacing within sections
// Use a spacing scale: 4, 6, 8, 10, 12, 16, 20, 24, 32

// Example: Headline to paragraph
<h2>...</h2>
<p className="mt-6 sm:mt-8">...</p>  // Consistent 6-8 spacing

// Example: Paragraph to CTA
<p>...</p>
<div className="mt-8 sm:mt-10">  // Slightly more space before CTA
  <a>...</a>
</div>
```

---

## 6. CTA HIERARCHY

### Primary CTA (Everywhere)
- **Style:** Dark pill button with white text
- **Size:** `h-12 px-8` (consistent)
- **Location:** Header, Hero, About Us bottom
- **Text:** "Boka ett samtal"

### Secondary CTA
- **Style:** Text link with underline on hover
- **Size:** `text-base font-medium`
- **Location:** Hero (below primary), Services (left column)
- **Variations:** "Se hur vi jobbar", "Läs mer om vårt upplägg"

### Tertiary CTA (Subtle)
- **Style:** Minimal text link, no underline until hover
- **Location:** About Us (if needed)
- **Text:** "Läs mer om teamet"

---

## 7. TRUST & CREDIBILITY

### Logo Marquee Enhancement
```tsx
// Add subtle label above marquee
<div className="mt-16">
  <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider text-center mb-6">
    Vi arbetar med
  </p>
  <div className="mx-auto max-w-5xl rounded-3xl ...">
    {/* Marquee */}
  </div>
</div>
```

### Credibility Metrics (Optional, Subtle)
```tsx
// Add to About Us section, very subtle
<div className="grid grid-cols-3 gap-8 pt-8 mt-8 border-t border-neutral-200/50">
  <div className="text-center">
    <div className="text-3xl font-semibold text-neutral-900">5+</div>
    <div className="text-xs text-neutral-600 mt-1">År erfarenhet</div>
  </div>
  <div className="text-center">
    <div className="text-3xl font-semibold text-neutral-900">20+</div>
    <div className="text-xs text-neutral-600 mt-1">Projekt</div>
  </div>
  <div className="text-center">
    <div className="text-3xl font-semibold text-neutral-900">100%</div>
    <div className="text-xs text-neutral-600 mt-1">Operativt ansvar</div>
  </div>
</div>
```

---

## 8. MICRO-INTERACTIONS

### Hover States
```tsx
// Add subtle scale/translate on interactive elements
// Buttons: translateY(-1px) on hover (already implemented)
// Links: underline animation (already implemented)
// Service blocks: translateX(4px) on hover (recommended above)
```

### Focus States
```tsx
// Ensure all interactive elements have visible focus rings
// Current implementation is good, but verify:
// - Ring color: neutral-900/30
// - Ring offset: 2-4px
// - Ring width: 2px
```

---

## 9. RESPONSIVE REFINEMENTS

### Mobile (< 768px)
- Reduce headline sizes slightly
- Stack CTAs vertically with full width
- Reduce section padding
- Simplify service blocks (remove hover effects)

### Tablet (768px - 1024px)
- Maintain current scaling
- Ensure sticky positioning works correctly
- Test logo marquee performance

### Desktop (> 1024px)
- Optimize for 1440px viewport
- Ensure max-width containers are consistent
- Test hover states and animations

---

## 10. ACCESSIBILITY CHECKLIST

✅ **Current State:**
- Semantic HTML (h1, h2, section, etc.)
- ARIA labels on interactive elements
- Focus states visible
- Alt text on images
- Reduced motion support

🔧 **Improvements:**
- Verify contrast ratios (WCAG AA minimum)
- Ensure all text meets 4.5:1 contrast ratio
- Test keyboard navigation
- Verify screen reader compatibility

---

## IMPLEMENTATION PRIORITY

### High Priority (Immediate Impact)
1. ✅ Typography hierarchy (Hero subheadline size)
2. ✅ CTA differentiation (Secondary as text link)
3. ✅ Text contrast improvements (neutral-700 → neutral-800)
4. ✅ Service block hover states

### Medium Priority (Polish)
1. Background word treatment (Services section)
2. Credibility points enhancement (About Us)
3. Logo marquee label
4. Spacing rhythm consistency

### Low Priority (Nice to Have)
1. Credibility metrics
2. Micro-interactions refinement
3. Advanced hover effects

---

## DESIGN PRINCIPLES TO MAINTAIN

1. **Minimalism** — Every element must have purpose
2. **Consistency** — Use design tokens, maintain spacing scale
3. **Clarity** — Typography hierarchy must be obvious
4. **Premium** — Subtle details, refined interactions
5. **Trust** — Professional, confident, no marketing fluff

---

## NEXT STEPS

1. Review this document and prioritize improvements
2. Implement high-priority items first
3. Test on multiple devices and viewports
4. Gather feedback and iterate
5. Document final design system in design-tokens.ts
