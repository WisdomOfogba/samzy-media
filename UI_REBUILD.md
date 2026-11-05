# UI_REBUILD.md

## Objective
Execute a complete visual and navigational overhaul of the frontend, transforming the application from a generic template into a premium Creator CMS and Media Portfolio. The design language must be cinematic, modern, and dark-mode default, heavily utilizing Tailwind CSS and Framer Motion.

## 1. Routing & Navigation Refactor
The current routing is broken or inaccessible. Restructure the public navigation and routing to match the new architecture.

- **Navbar (`components/navbar.tsx`):**
  - Update all navigation links to point to the correct Next.js App Router paths:
    - Home -> `/`
    - Portfolio -> `/portfolio`
    - Live Stream -> `/live`
    - Contact -> `#contact` (or `/contact` if a separate page)
  - Ensure the Navbar uses a glassmorphism effect (`bg-background/80 backdrop-blur-md`) and remains sticky at the top of the viewport.
  - Implement a mobile hamburger menu that correctly navigates to these new routes.

- **Create Missing Pages:**
  - Ensure `app/(public)/live/page.tsx` exists and renders the `LiveStreamPlayer` component.
  - Ensure `app/(public)/portfolio/[id]/page.tsx` exists and renders the case study layout, utilizing the `StickyVideoPlayer` component.

## 2. The "Cinematic" Landing Page (`app/(public)/page.tsx`)
Completely redesign the root landing page. 

- **Hero Section (`components/animated-hero.tsx` & `components/cinematic-logo.tsx`):**
  - Remove the CPU-heavy $O(N^2)$ particle canvas.
  - Replace it with a sleek, full-screen hero section. 
  - Use a highly optimized looping background video (if available in assets) or a sophisticated CSS radial gradient (`bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-black`).
  - Overlay bold, stark typography (e.g., "Visual Storytelling & Motion Design") with a Framer Motion fade-up entrance animation.
  - Add a primary CTA button ("View Portfolio") that smoothly scrolls to the portfolio section or navigates to `/portfolio`.

## 3. The Masonry Portfolio Grid (`components/portfolio-grid.tsx`)
Refine the visual presentation of the portfolio items.

- **Grid Layout:** Ensure the layout is a true masonry grid (`columns-1 sm:columns-2 lg:columns-3 gap-6`) or a highly responsive CSS grid.
- **Card Design:** 
  - Remove heavy borders or box-shadows. Favor a flat, minimalist aesthetic with slight rounded corners (`rounded-xl`).
  - Implement a Framer Motion hover effect: when a user hovers over a video thumbnail, it should slightly scale up (`hover:scale-[1.02]`) and seamlessly begin playing the muted preview video.
  - Overlay the title and category category at the bottom of the card using a smooth gradient fade (`bg-gradient-to-t from-black/80 to-transparent`).

## 4. Admin Dashboard Aesthetics (`app/(admin)/dashboard/page.tsx`)
The CMS needs to feel like a modern professional tool, not an afterthought.

- **Layout:** Implement a clean sidebar navigation and a spacious main content area.
- **Data Table/Grid:** Present the portfolio items in a clean list or grid view with easy-to-access Edit and Delete actions.
- **Typography & Spacing:** Use consistent Tailwind spacing and ensure all forms (`components/dashboard/work-form.tsx`) use modern input styles (subtle borders, focus rings).

## 5. Global Styling (`app/globals.css`)
- Enforce a strict dark mode aesthetic.
- Define a cohesive color palette utilizing Tailwind's `zinc` or `slate` scales for backgrounds and typography, with a single high-contrast accent color (e.g., a vibrant blue or subtle gold) for active states and primary buttons.