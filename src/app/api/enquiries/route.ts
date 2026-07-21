import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Enquiry } from "@/models/Enquiry";

// In-memory fallback array initialized empty
const memoryEnquiries: any[] = [];

export async function GET() {
  try {
    await connectToDatabase();
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    if (enquiries && enquiries.length > 0) {
      return NextResponse.json({ success: true, data: enquiries });
    }
  } catch (err) {
    console.warn("Using memory store fallback for GET /api/enquiries");
  }

  return NextResponse.json({ success: true, data: memoryEnquiries });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "Name, email, and message are required." }, { status: 400 });
    }

    try {
      await connectToDatabase();
      const newEnquiry = await Enquiry.create({
        name,
        email,
        phone: phone || "",
        service: service || "General Inquiry",
        message,
        status: "new",
      });
      return NextResponse.json({ success: true, data: newEnquiry }, { status: 201 });
    } catch (dbErr) {
      console.warn("DB save failed, using memory store fallback");
      const fallbackEnquiry = {
        _id: `enq-${Date.now()}`,
        name,
        email,
        phone: phone || "",
        service: service || "General Inquiry",
        message,
        status: "new",
        createdAt: new Date().toISOString(),
      };
      memoryEnquiries.unshift(fallbackEnquiry);
      return NextResponse.json({ success: true, data: fallbackEnquiry }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
