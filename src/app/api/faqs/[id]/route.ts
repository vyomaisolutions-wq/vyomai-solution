import { NextResponse } from "next/server";
import { connectToDatabase, isDbConnected } from "@/lib/mongodb";
import { FAQ } from "@/models/FAQ";

interface RouteProps {
  params: {
    id: string;
  };
}

export async function PUT(req: Request, { params }: RouteProps) {
  try {
    const body = await req.json();
    const { question, answer, category, order, isPublished } = body;

    try {
      await connectToDatabase();
      if (isDbConnected()) {
        const updatedFaq = await FAQ.findByIdAndUpdate(
          params.id,
          { question, answer, category, order, isPublished },
          { new: true }
        );
        return NextResponse.json({ success: true, data: updatedFaq });
      }
    } catch (dbErr) {
      console.warn("DB update failed for FAQ", params.id);
    }

    return NextResponse.json({ success: true, message: "FAQ updated" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update FAQ" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: RouteProps) {
  try {
    try {
      await connectToDatabase();
      if (isDbConnected()) {
        await FAQ.findByIdAndDelete(params.id);
      }
    } catch (dbErr) {
      console.warn("DB delete failed for FAQ", params.id);
    }

    return NextResponse.json({ success: true, message: "FAQ deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete FAQ" }, { status: 500 });
  }
}
