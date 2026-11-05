import { Schema, model, models } from "mongoose"

const PortfolioWorkSchema = new Schema(
  {
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    mediaUrl: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, enum: ["image", "video"], default: "image" },
    featured: { type: Boolean, default: false },
    story: { type: String, required: false }, // Rich text HTML for the case study
  },
  { timestamps: true }
)

export const Work =
  models.Work ||
  models.PortfolioWork ||
  model("PortfolioWork", PortfolioWorkSchema)

export const PortfolioWork = Work
