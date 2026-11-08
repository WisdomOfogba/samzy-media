## Objective
Revert the stark, brutalist UI back to the brand's original vibrant, creative aesthetic. We are restoring the purple/fuchsia gradients, rounded corners, and glassmorphism, but implementing them with high-fidelity, modern Tailwind patterns. 

## 1. Global Aesthetics & Typography
- **Colors:** Restore the deep purple and dark backgrounds. Primary accents should be vibrant gradients (e.g., `bg-gradient-to-r from-purple-600 to-pink-500`). 
- **Shapes:** Revert sharp corners back to smooth, friendly radii. Use `rounded-2xl` or `rounded-3xl` for cards, buttons, and video players.
- **Typography:** Keep the `Clash Display` font for headings, but restore the gradient text clipping on the main hero headline (e.g., `text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400`).

## 2. Hero Section & Video Background (`app/(public)/page.tsx`)
- **The Missing Video:** The `montage.mp4` video is failing to render properly behind the hero.
- **The Fix:** Ensure the hero container has `relative overflow-hidden w-full min-h-screen`. Place the `<video>` tag as the very first child with `src="/montage.mp4"`, `autoPlay`, `loop`, `muted`, `playsInline`, and the exact classes: `absolute inset-0 w-full h-full object-cover z-0 opacity-30`. 
- **Z-Index:** Ensure the text and CTA buttons sit inside a `relative z-10` container so they appear above the video.

## 3. The New PiP Animation Logic (`components/sticky-video-player.tsx`)
- **The Bug:** Shrinking the relative video into a fixed position is jarring and restarts the video.
- **The Fix:** Do NOT transition the main video. 
  - Keep the main hero video rendering normally in the document flow.
  - When the `IntersectionObserver` detects the main video has scrolled out of view, use Framer Motion to slide in a *fixed* PiP container from the right side of the screen (`initial={{ x: '100%' }} animate={{ x: 0 }}`). 
  - This creates a smooth "slide-in" effect from the right rather than a clunky scale-down.

## 4. Admin Dashboard UI Overhaul
- **Remove Feature:** Delete `app/(admin)/dashboard/live/page.tsx`. The live stream page is no longer needed in the admin dashboard.
- **Login Page (`app/(admin)/login/page.tsx`):** Redesign this to be a beautiful, modern glassmorphic card centered on a dark animated gradient background. Use soft `box-shadow` and `backdrop-blur-xl`.
- **Dashboard Layout:** Replace the current horrible admin UI with a soft, modern SaaS layout. Use a slightly lighter dark background for the sidebar (`bg-zinc-900/50`) and soft, rounded borders for the main content area. Forms should have smooth input fields (`bg-zinc-800/50 border-zinc-700 rounded-xl focus:ring-purple-500`).