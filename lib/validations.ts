import { z } from "zod";

// 1. Validate Portfolio Creation & Updates
export const workValidationSchema = z.object({
  title: z.string().min(2, "Title is too short").max(100),
  category: z.string().min(1, "Category is required"),
  type: z.enum(["image", "video"]).default("image"),
  mediaUrl: z.string().url("Must be a valid media URL"),
  thumbnail: z.string().optional(),
  featured: z.boolean().default(false),
  story: z.string().optional(), // Can be empty if no case study exists
  description: z.string().optional(),
  slug: z.string().optional(),
});

export type WorkInput = z.infer<typeof workValidationSchema>;

// 2. Validate Contact Form Inquiries (Prevent SMTP Relay Abuse)
export const contactValidationSchema = z.object({
  name: z.string().min(2, "Name required").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject required").max(150),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export type ContactFormData = z.infer<typeof contactValidationSchema>;

// 3. Validate Live Stream Updates
export const liveStreamValidationSchema = z.object({
  activeYouTubeVideoId: z.string().nullable(), // Null when turning stream off
  isLive: z.boolean(),
});

export type LiveStreamInput = z.infer<typeof liveStreamValidationSchema>;
