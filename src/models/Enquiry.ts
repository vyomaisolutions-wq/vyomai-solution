import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  status: "new" | "reviewed" | "resolved";
  createdAt: Date;
}

const EnquirySchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, default: "" },
  service: { type: String, required: true, default: "General Inquiry" },
  message: { type: String, required: true },
  status: { type: String, enum: ["new", "reviewed", "resolved"], default: "new" },
  createdAt: { type: Date, default: Date.now },
});

export const Enquiry: Model<IEnquiry> =
  mongoose.models.Enquiry || mongoose.model<IEnquiry>("Enquiry", EnquirySchema);
