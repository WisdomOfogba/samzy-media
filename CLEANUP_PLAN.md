# CLEANUP_PLAN.md

## Purpose
This document outlines the systematic teardown of legacy code and the patching of critical security/architectural flaws in the Next.js 15 application. The AI agent MUST follow these phases in chronological order. Do not proceed to a new phase until the current phase is fully executed and tested.

---

## Phase 1: The Purge (Legacy Code & Build Config)
**Goal:** Remove all orphaned files from the old Vite/Create-React-App architecture and reinstate strict compilation gates.

- [ ] **Delete legacy component files:** 
  - `components/Layout.tsx` (Note the capital 'L')
  - `components/FileUpload.tsx`
- [ ] **Delete legacy service files:** 
  - `services/authService.ts`
  - `services/cloudinaryService.ts`
  - `services/portfolioService.ts`
- [ ] **Deduplicate Hooks:** 
  - Delete `components/ui/use-mobile.tsx` and `hooks/use-mobile.tsx`. 
  - Retain ONLY `hooks/use-mobile.ts` as the single source of truth.
- [ ] **Reinstate Build Gates:** 
  - In `next.config.mjs`, REMOVE `ignoreBuildErrors: true` (TypeScript) and `ignoreDuringBuilds: true` (ESLint). 
  - Run `pnpm tsc --noEmit` and resolve any residual missing import errors.

---

## Phase 2: Secure the Perimeter (Critical Security Patches)
**Goal:** Close all open relays, authentication bypasses, and unbounded upload vectors.

- [ ] **Patch Total Auth Bypass (`lib/auth.ts`):** 
  - Replace the flawed `.startsWith("auth-token=")` check.
  - Implement real JWT verification (e.g., using `jose` and `AUTH_SECRET`) or NextAuth/Auth.js. 
  - Remove hardcoded `"admin123"` credentials from `app/api/auth/login/route.ts`.
- [ ] **Close Open SMTP Relay (`app/api/contact/route.ts`):** 
  - Do NOT accept the `to` field from the client payload.
  - Hardcode the recipient to `process.env.ADMIN_EMAIL` on the server.
  - Add HTML sanitization to user inputs (`name`, `email`, `message`) before injecting them into the email template to prevent XSS.
- [ ] **Secure Upload Proxy (`app/api/upload/route.ts`):** 
  - Enforce authentication on the route.
  - Add a 50MB file size ceiling.
  - Whitelist acceptable MIME types (e.g., `image/jpeg`, `image/webp`, `video/mp4`, `video/webm`).

---

## Phase 3: Database & State Resiliency
**Goal:** Stop the application from crashing during MongoDB mutations or transient network failures.

- [ ] **Fix MongoDB Connection Lockout (`lib/mongodb.ts`):** 
  - Add a `.catch()` block to the connection promise. If the connection fails, set `cached.promise = null` so the server can attempt to reconnect on the next request instead of permanently hanging.
- [ ] **Fix `_id` Immutability Crash (`app/api/portfolio/[id]/route.ts`):** 
  - When parsing the `PUT` request body, explicitly destructure and remove `_id`, `__v`, `createdAt`, and `updatedAt` before passing the payload to `findByIdAndUpdate()`.
- [ ] **Fix Unhandled UI Crash (`context/ProjectsContext.tsx`):** 
  - When fetching `/api/portfolio`, check `res.ok` and ensure `Array.isArray(data)` is true before calling `setProjects()`. Fallback to an empty array `[]` on failure instead of an error object.

---

## Phase 4: Zod Integration & CMS Refactor
**Goal:** Enforce strict data typing and implement the new client requirements (Rich Text + YouTube Live).

- [ ] **Introduce Zod (`lib/validations.ts`):** 
  - Create Zod schemas for the Contact Form, Portfolio Creation, and Portfolio Update.
  - Implement Zod validation inside `app/api/contact/route.ts` and `app/api/portfolio/route.ts`.
- [ ] **Extend MongoDB Schema (`models/Work.ts`):** 
  - Add a `story` (String) field to store the rich text case study.
  - Add a `youtubeStreamId` (String, optional) field for the live stream feature.
- [ ] **Update Admin Forms (`components/dashboard/work-form.tsx`):** 
  - Integrate a Rich Text Editor (like TipTap) for the `story` field.
  - Add a text input for the `youtubeStreamId`.

---

## Phase 5: UI/UX Optimization
**Goal:** Address performance bottlenecks and implement the new sticky player.

- [ ] **Enable Next.js Image Optimization:** 
  - In `next.config.mjs`, remove `images: { unoptimized: true }`.
  - Configure `remotePatterns` to allow images from `res.cloudinary.com`.
- [ ] **Fix React Hydration/Reconciliation (`components/portfolio-grid.tsx`):** 
  - Replace `key={index}` with `key={portfolioItem._id}` to fix Framer Motion animation glitches.
- [ ] **Implement Sticky Picture-in-Picture Player:** 
  - Build the `IntersectionObserver` logic on the Case Study detail page to dock the video player to the bottom-right corner when the user scrolls down to read the `story`.
- [ ] **Optimize Hero Canvas (`components/animated-hero.tsx`):** 
  - Refactor the $O(N^2)$ particle loop to prevent CPU spikes, or replace it entirely with a performant Framer Motion or WebGL alternative.