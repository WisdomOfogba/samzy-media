import mongoose from "mongoose";

const systemSettingSchema = new mongoose.Schema(
  {
    type: { type: String, default: "global", unique: true },
    activeYouTubeVideoId: { type: String, default: null }, // e.g., "dQw4w9WgXcQ"
    isLive: { type: Boolean, default: false }, // Toggles the live stream page visibility
  },
  { timestamps: true }
);

export const SystemSetting =
  mongoose.models.SystemSetting ||
  mongoose.model("SystemSetting", systemSettingSchema);

