## Overview
This document enforces the frontend layout patterns, micro-interactions, and third-party embeds required for the Creator CMS. The AI must follow these patterns to ensure performance and client satisfaction.

## 1. The Sticky "Picture-in-Picture" Video Player

**Context:** On the Case Study page (`(public)/portfolio/[id]/page.tsx`), the user sees a large video player at the top and the "Story Behind the Design" (Rich Text) below it. As the user scrolls down to read the text, the video must shrink and stick to the bottom corner.

**Implementation Rules (DO NOT use external PiP libraries):**
1. Use React's `IntersectionObserver` via a custom hook (e.g., `useIntersectionObserver`) or `react-intersection-observer`.
2. Wrap the main hero video area in an observable `div` (the "sentinel").
3. When the sentinel scrolls out of the viewport (`isIntersecting === false`), apply Tailwind classes to transition the `<video>` element into a fixed overlay.

**Required Tailwind State Classes:**
- *Default (Top of page):* `relative w-full aspect-video rounded-xl transition-all duration-300 ease-in-out`
- *Sticky (Scrolling down):* `fixed bottom-4 right-4 w-72 md:w-96 aspect-video rounded-lg shadow-2xl z-50 transition-all duration-300 ease-in-out`

## 2. The YouTube Live Stream Embed

**Context:** The live page (`(public)/live/page.tsx`) allows the client to embed their unlisted YouTube broadcasts. 

**Implementation Rules:**
1. Read the `activeYouTubeVideoId` and `isLive` status from the `SystemSetting` API.
2. **Offline State:** If `isLive === false` or `activeYouTubeVideoId` is null, render a beautiful "Next Event Coming Soon" hero section. DO NOT render an empty iframe.
3. **Live State (Side-by-Side Layout):** If live, render a responsive CSS Grid:
   - *Desktop (`md:grid-cols-3`):* The Video Iframe spans 2 columns (left). The Chat Iframe spans 1 column (right).
   - *Mobile (`flex-col`):* The Video Iframe sits on top. The Chat Iframe sits directly below it.

**Required Iframe Structures:**
```tsx
// Video Embed (Main Broadcast)
<iframe
  src={`[https://www.youtube.com/embed/$](https://www.youtube.com/embed/$){activeYouTubeVideoId}?autoplay=1&mute=0`}
  className="w-full aspect-video rounded-xl shadow-lg border-none"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>

// Chat Embed (Interactive Comments)
<iframe
  src={`[https://www.youtube.com/live_chat?v=$](https://www.youtube.com/live_chat?v=$){activeYouTubeVideoId}&embed_domain=${process.env.NEXT_PUBLIC_DOMAIN}`}
  className="w-full h-[500px] md:h-full rounded-xl shadow-lg border-none"
/>

```

*(Note: `embed_domain` is required by YouTube for the chat iframe to work on custom domains).*

## 3. The Portfolio Masonry Grid

**Context:** The homepage and portfolio hub display the client's work in an animated grid.

**Implementation Rules:**

1. **Never use array indices as React keys.** Always use `key={work._id}` to prevent Framer Motion reconciliation bugs when filtering categories.
2. **Media Optimization:** Use Next.js `<Image>` for thumbnails. For looping video previews on hover, use the native `<video>` tag with the attributes: `autoPlay loop muted playsInline preload="none"`.
3. **Layout:** Use standard CSS Columns or a reliable masonry pattern (`columns-1 sm:columns-2 md:columns-3 gap-4`) in Tailwind. Avoid heavy JavaScript masonry calculation libraries.

## 4. The Hero Background Animation

**Context:** The old codebase used an $O(N^2)$ Canvas loop that spiked CPU usage.

**Implementation Rules:**

1. Completely abandon the old `animated-hero.tsx` logic.
2. Replace it with a performant, lightweight CSS-only background (e.g., a slow-moving CSS gradient) OR a highly optimized Framer Motion SVG animation.
3. The background must never calculate particle collisions on the main thread.
