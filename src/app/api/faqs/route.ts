import { NextResponse } from "next/server";
import { connectToDatabase, isDbConnected } from "@/lib/mongodb";
import { FAQ } from "@/models/FAQ";

if (!(globalThis as any)._memoryFAQs) {
  (globalThis as any)._memoryFAQs = [];
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const includeUnpublished = searchParams.get("admin") === "true";

  try {
    await connectToDatabase();
    if (isDbConnected()) {
      const query = includeUnpublished ? {} : { isPublished: true };
      const faqs = await FAQ.find(query).sort({ order: 1, createdAt: -1 });
      return NextResponse.json({ success: true, data: faqs });
    }
  } catch (err) {
    console.warn("DB query error for GET /api/faqs, using memory fallback");
  }

  const memoryFAQs = (globalThis as any)._memoryFAQs || [];
  const result = includeUnpublished ? memoryFAQs : memoryFAQs.filter((f: any) => f.isPublished);
  return NextResponse.json({ success: true, data: result });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, answer, category, order, isPublished } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { success: false, error: "Question and answer are required." },
        { status: 400 }
      );
    }

    const fallbackFaq = {
      _id: `faq-${Date.now()}`,
      question,
      answer,
      category: category || "AI & Automation",
      order: order !== undefined ? Number(order) : 0,
      isPublished: isPublished !== undefined ? isPublished : true,
      createdAt: new Date().toISOString(),
    };

    if (!(globalThis as any)._memoryFAQs) {
      (globalThis as any)._memoryFAQs = [];
    }
    (globalThis as any)._memoryFAQs.unshift(fallbackFaq);

    try {
      await connectToDatabase();
      if (isDbConnected()) {
        const newFaq = await FAQ.create({
          question,
          answer,
          category: category || "AI & Automation",
          order: order !== undefined ? Number(order) : 0,
          isPublished: isPublished !== undefined ? isPublished : true,
        });
        return NextResponse.json({ success: true, data: newFaq }, { status: 201 });
      }
    } catch (dbErr) {
      console.warn("DB save failed, using memory store fallback for POST /api/faqs");
    }

    return NextResponse.json({ success: true, data: fallbackFaq }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create FAQ" }, { status: 500 });
  }
}
