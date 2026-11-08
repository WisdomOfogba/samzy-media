## Objective
Refine the layout structure for the portfolio grid to ensure uniform card presentation, and reinstate the Live Stream management page within the Admin Dashboard using a clean, modern aesthetic.

## 1. Portfolio Grid Refinement (`components/portfolio-grid.tsx`)
- **The Problem:** The "Featured Projects" layout is disjointed because images/videos have varying aspect ratios, causing the grid columns to misalign.
- **The Fix:** Move away from a masonry layout for the main portfolio grid. 
  - Use a strict CSS Grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`).
  - Force all media thumbnails (images and videos) within the cards to maintain a strict `aspect-video` (16:9) ratio with `object-cover`. This guarantees every card is exactly the same height and width, creating a perfectly aligned grid.

## 2. Admin Live Stream Page Restoration (`app/(admin)/dashboard/live/page.tsx`)
- **The Missing Feature:** The admin dashboard must have a dedicated page to manage the live stream.
- **Implementation:**
  - Recreate `app/(admin)/dashboard/live/page.tsx`.
  - Add "Live Broadcast" back to the sidebar navigation in `components/dashboard/sidebar.tsx`.
  - The page should contain a glassmorphic card (matching the new aesthetic) with:
    - A text input for the YouTube URL or Video ID.
    - A toggle switch or button to set the status to "Live" or "Offline".
    - It should communicate with the `SystemSetting` API route to save these states.

## 3. General Admin Polish
- Ensure all admin pages (Portfolio Works, Create New Work, and Live Broadcast) share a consistent layout wrapper with proper padding (`p-6 md:p-10`) and a clear page title heading at the top.