
## Overview
This document defines the strict data shapes for the MongoDB database (via Mongoose) and the API request validation (via Zod). 
**Rule:** No data is ever written to MongoDB without first passing through a Zod validation schema.

## 1. Mongoose Models

### `Work` (Portfolio & Case Study Items)
This schema handles both the visual portfolio grid and the rich-text case study pages.

```typescript
// models/Work.ts
import mongoose from "mongoose";

const workSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // URL-friendly string (e.g., "church-anniversary-montage")
  description: { type: String, required: true }, // Short summary for portfolio grid
  story: { type: String, required: false }, // Rich text HTML for the case study
  category: { 
    type: String, 
    required: true,
    enum: ["Motion Graphics", "2D/3D Animation", "Logo Montage", "Graphic Design", "E-Card"]
  },
  mediaType: { type: String, required: true, enum: ["image", "video"] },
  mediaUrl: { type: String, required: true }, // Cloudinary URL
  thumbnailUrl: { type: String, required: true }, // Cloudinary URL (used for video poster/grid fallback)
  featured: { type: Boolean, default: false }, // Pin to top of portfolio
}, { timestamps: true });

export const Work = mongoose.models.Work || mongoose.model("Work", workSchema);

```

### `SystemSetting` (Live Stream Control)

A singleton document to hold the active YouTube stream state so the client doesn't have to create a new "Work" post just to go live.

```typescript
// models/SystemSetting.ts
import mongoose from "mongoose";

const systemSettingSchema = new mongoose.Schema({
  type: { type: String, default: "global", unique: true },
  activeYouTubeVideoId: { type: String, default: null }, // e.g., "dQw4w9WgXcQ"
  isLive: { type: Boolean, default: false } // Toggles the live stream page visibility
}, { timestamps: true });

export const SystemSetting = mongoose.models.SystemSetting || mongoose.model("SystemSetting", systemSettingSchema);

```

---

## 2. Zod Validation Schemas

These schemas MUST be used in the `app/api/...` route handlers.

```typescript
// lib/validations.ts
import { z } from "zod";

// 1. Validate Portfolio Creation & Updates
export const workValidationSchema = z.object({
  title: z.string().min(2, "Title is too short").max(100),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  description: z.string().min(10, "Description required for grid").max(300),
  story: z.string().optional(), // Can be empty if no case study exists
  category: z.enum(["Motion Graphics", "2D/3D Animation", "Logo Montage", "Graphic Design", "E-Card"]),
  mediaType: z.enum(["image", "video"]),
  mediaUrl: z.url("Must be a valid Cloudinary URL"),
  thumbnailUrl: z.url("Must be a valid Cloudinary URL"),
  featured: z.boolean().default(false),
});
// CRITICAL FIX: The Zod schema explicitly OMITS `_id`, `createdAt`, and `updatedAt`. 
// When parsing `PUT` requests, only the validated fields are sent to `findByIdAndUpdate`.

// 2. Validate Contact Form Inquiries (Prevent SMTP Relay Abuse)
export const contactValidationSchema = z.object({
  name: z.string().min(2, "Name required").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject required").max(150),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});
// Notice: There is no `to` field here. The server hardcodes the recipient.

// 3. Validate Live Stream Updates
export const liveStreamValidationSchema = z.object({
  activeYouTubeVideoId: z.string().nullable(), // Null when turning stream off
  isLive: z.boolean(),
});

```