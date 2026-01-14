import { Schema, model, models } from "mongoose"

const PortfolioWorkSchema = new Schema(
  {
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    mediaUrl: String,
    category: { type: String },
    type: { type: String, enum: ["image", "video"]},
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const PortfolioWork =
  models.PortfolioWork ||
  model("PortfolioWork", PortfolioWorkSchema)
