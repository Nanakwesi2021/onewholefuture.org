# Design System Specification: The High-End Editorial Experience

## 1. Overview & Creative North Star
**Creative North Star: "onewholefuture"**

This design system moves away from the generic, "tech-heavy" look of traditional NGOs and instead adopts an **Editorial Authority** aesthetic. It treats digital content like a premium printed monograph—intentional, spacious, and deeply human. By leveraging "onewholefuture" as our guiding principle, we prioritize storytelling through high-contrast typography scales and an "Organic Asymmetry" that breaks the rigid 12-column grid. We avoid a "template" feel by using overlapping elements, large-scale imagery that bleeds off-canvas, and a sophisticated layering of tonal surfaces.

---

## 2. Colors & Tonal Depth
The palette is rooted in a deep, authoritative forest green (`primary: #17362e`) and warm, earthy accents (`tertiary: #442b06`). These are balanced by a range of nuanced neutrals that provide a "paper-like" tactile quality.

### The "No-Line" Rule
To achieve a premium, seamless feel, **designers are prohibited from using 1px solid borders for sectioning.** Structural boundaries must be defined exclusively through background color shifts or tonal transitions.
- **Sectioning:** A section of `surface_container_low` (#f3f4f1) sitting on a `surface` (#f9faf7) background is the preferred method for defining content blocks.
- **Separation:** Use vertical whitespace from our spacing scale rather than horizontal rules to separate thoughts and sections.

### Surface Hierarchy & Nesting
Think of the UI as physical layers of fine paper. 
- **The Base:** Use `surface` (#f9faf7) for the main page background.
- **The Container:** Use `surface_container` (#edeeeb) for large content areas.
- **The Highlight:** Use `surface_container_lowest` (#ffffff) for cards or interactive elements that need to "lift" off the page. This creates natural depth without the clutter of lines.

### Signature Textures & The "Glass" Rule
- **Gradients:** Use a subtle linear gradient (from `primary` #17362e to `primary_container` #2e4d44) for primary CTAs and Hero backgrounds to add "visual soul" and avoid the flatness of digital-first brands.
- **Glassmorphism:** For floating elements like the Mega-Menu or sticky headers, use `surface_container_lowest` at 85% opacity with a `24px` backdrop-blur. This allows the high-quality photography to peak through, softening the UI’s edges.

---

## 3. Typography
Our typography scale is designed to feel like a modern broadsheet—sophisticated, legible, and authoritative.

- **Display & Headlines (Manrope):** We use Manrope for its geometric clarity and modern warmth. 
    - **Display-LG (3.5rem):** Reserved for "Impact Statements." Use tight letter-spacing (-0.02em) to give it a "locked-in" editorial feel.
    - **Headline-MD (1.75rem):** Use for section headers. Always pair with generous top-margin to let the heading breathe.
- **Body & Labels (Work Sans):** Work Sans provides a functional, highly readable contrast to the headlines.
    - **Body-LG (1rem):** The workhorse for all narrative content.
    - **Label-MD (0.75rem):** Used for metadata, breadcrumbs, and "Overlines" (small caps text above headlines).
- **Hierarchy Strategy:** Create tension by pairing a very large `display-sm` heading with a much smaller `body-md` description. This high-contrast scale is the hallmark of premium design.

---

## 4. Elevation & Depth
Depth is achieved through "Tonal Layering" rather than traditional drop shadows.

- **The Layering Principle:** Stack `surface_container_lowest` cards on a `surface_container_low` background. This creates a soft, natural lift that mimics ambient light hitting a physical surface.
- **Ambient Shadows:** If a "floating" effect is necessary (e.g., for the Mega-Menu), use an extra-diffused shadow:
    - `Y: 20px, Blur: 40px, Color: on_surface (#1a1c1b) at 6% opacity.`
- **The "Ghost Border" Fallback:** If accessibility requirements demand a border, use the "Ghost Border": `outline_variant` (#c1c8c4) at 20% opacity. **Never use 100% opaque borders.**

---

## 5. Components

### Navigation: The Mega-Menu
The mega-menu is a "curated room." Use a 4-column layout:
- **Columns 1-3:** Navigation links using `title-sm`.
- **Column 4:** A "Featured Impact" card using a `primary_container` background and a high-quality thumbnail. 
- Use the **Glassmorphism Rule** for the menu container to maintain a sense of place within the site.

### Buttons
- **Primary:** `primary` (#17362e) background, `on_primary` (#ffffff) text. Use `rounded-md` (0.375rem). Apply a subtle inner-glow on hover.
- **Secondary:** `secondary_container` (#d4e7df) background. This provides a soft, earthy alternative to the heavy primary green.
- **Tertiary:** Text-only with a `primary` underline that is only 2px thick and offset by 4px.

### Cards & Lists
- **Cards:** No borders. Use `surface_container_lowest` (#ffffff) with an `xl` (0.75rem) corner radius. 
- **Lists:** Forbid divider lines. Separate list items using `16px` of vertical padding and a very subtle background shift (`surface_container_low`) on hover.

### Input Fields
- Use a "Soft Fill" approach: `surface_container_highest` (#e2e3e0) background with no border. On focus, transition to a `primary` "Ghost Border" (20% opacity) and a 1px solid bottom stroke.

---

## 6. Do's and Don'ts

### Do:
- **Do** use "Negative Space" as a design element. If a section feels crowded, double the padding.
- **Do** use high-quality photography where subjects look directly at the camera to build trust.
- **Do** use asymmetrical layouts (e.g., a headline on the left, body text shifted to the right column).

### Don't:
- **Don't** use pure black (#000000). Always use `on_surface` (#1a1c1b) for text.
- **Don't** use standard 1px gray dividers. They break the "onewholefuture" editorial flow.
- **Don't** use "default" hover states (like 50% opacity). Use tonal shifts, such as moving from `surface_container` to `surface_container_high`.
- **Don't** use sharp 90-degree corners. Always use at least `sm` (0.125rem) to keep the brand feeling "warm" and "approachable."