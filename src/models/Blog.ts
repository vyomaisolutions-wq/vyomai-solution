import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  subtitle?: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image: string;
  buttonText: string;
  tags: string[];
  isPublished: boolean;
  readTime: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: "" },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true, default: "AI & Automation" },
    author: { type: String, required: true, default: "VyomAi Editorial" },
    image: { type: String, default: "/images/agency_hero_graphic.png" },
    buttonText: { type: String, default: "Read Article" },
    tags: { type: [String], default: ["AI", "Automation", "Technology"] },
    isPublished: { type: Boolean, default: true },
    readTime: { type: String, default: "5 min read" },
  },
  { timestamps: true }
);

export const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
