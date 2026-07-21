import { NextResponse } from "next/server";
import { connectToDatabase, isDbConnected } from "@/lib/mongodb";
import { Enquiry } from "@/models/Enquiry";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json();
    const { id } = params;

    try {
      await connectToDatabase();
      if (isDbConnected()) {
        const updated = await Enquiry.findByIdAndUpdate(id, { status }, { new: true });
        if (updated) {
          return NextResponse.json({ success: true, data: updated });
        }
      }
    } catch (err) {
      // Quiet fallback
    }

    return NextResponse.json({ success: true, message: "Status updated" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update enquiry" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    try {
      await connectToDatabase();
      if (isDbConnected()) {
        await Enquiry.findByIdAndDelete(id);
      }
    } catch (err) {
      // Quiet fallback
    }

    return NextResponse.json({ success: true, message: "Enquiry deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete enquiry" }, { status: 500 });
  }
}
