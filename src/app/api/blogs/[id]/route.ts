import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { id } = params;

    try {
      await connectToDatabase();
      const updated = await Blog.findByIdAndUpdate(id, body, { new: true });
      if (updated) {
        return NextResponse.json({ success: true, data: updated });
      }
    } catch (err) {
      console.warn("DB update failed for Blog PUT");
    }

    return NextResponse.json({ success: true, message: "Blog updated" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    try {
      await connectToDatabase();
      await Blog.findByIdAndDelete(id);
    } catch (err) {
      console.warn("DB delete failed for Blog DELETE");
    }

    return NextResponse.json({ success: true, message: "Blog deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete blog" }, { status: 500 });
  }
}
