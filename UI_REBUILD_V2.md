## Objective
Execute a complete visual and navigational overhaul of the frontend and admin dashboard. The aesthetic must shift from a generic template to a premium, brutalist Creator CMS inspired by top-tier media agencies (Layr Media, Rescue Media).

## Core Aesthetic Directives
- **Typography:** Integrate the `Clash Display` font for all headings (`h1` through `h6`) to provide a wide, modern, brutalist feel. Use a clean sans-serif (like Inter) for body text.
- **Color Palette:** Strict dark mode. Backgrounds should be deep monochrome (`bg-zinc-950`). Use sharp, high-contrast borders (`border-white/10` or `border-zinc-800`). Avoid soft shadows; use stark borders and solid colors.
- **Component Geometry:** Move away from pill shapes and heavily rounded corners. Use sharp edges or very subtle rounding (`rounded-sm` or `rounded-none`) for cards, buttons, and layout boundaries.

## 1. Landing Page Redesign (`app/(public)/page.tsx`)
- **Hero Background (Crucial):** Replace the static gradient or canvas with a full-screen, looping background video. The source file is `montage.mp4`.
  - Use a native `<video>` tag positioned absolutely behind the hero content: `autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover -z-10 opacity-40"`.
- **Hero Content:** Overlay bold, massive Clash Display typography. Ensure the text is highly legible against the video background (use a subtle dark overlay or text shadows if necessary).

## 2. Picture-in-Picture (PiP) Sync Fix (`components/sticky-video-player.tsx`)
- **The Bug:** The current PiP implementation remounts the video, resetting playback, and shows native browser controls.
- **The Fix:** 
  - Ensure the `<video>` element remains continuously mounted in the DOM. The `IntersectionObserver` must only toggle CSS classes (switching between relative hero positioning and fixed corner positioning) on the *same* element.
  - Add the HTML attribute `disablePictureInPicture` to the `<video>` tag to hide the browser's default, conflicting PiP button.

## 3. Portfolio & Grid Aesthetics (`components/portfolio-grid.tsx`)
- Implement a "bento-box" style grid rather than a traditional masonry layout.
- Cards should have stark `border-zinc-800` borders and `bg-zinc-900` backgrounds.
- Ensure the video thumbnails play seamlessly on hover without layout shifts.

## 4. Admin Dashboard Overhaul
- **The Problem:** The current admin UI and login page look generic and cheap.
- **The Fix (SaaS Vibe):** Redesign the `(admin)` layout to resemble a premium SaaS product (like Vercel).
  - **Login Page (`app/(admin)/login/page.tsx`):** Minimalist centered card, sharp borders, muted text labels, and a high-contrast accent button.
  - **Dashboard Layout:** Clean sidebar with subtle hover states (`hover:bg-zinc-800`).
  - **New Live Stream Page (`app/(admin)/dashboard/live/page.tsx`):** Create this missing page. It must contain a simple form to update the `SystemSetting` model with the `activeYouTubeVideoId` and toggle the `isLive` status.