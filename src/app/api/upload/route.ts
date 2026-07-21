import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    // Support base64 payload upload
    if (formData.fileData) {
      return NextResponse.json({ success: true, url: formData.fileData });
    }

    return NextResponse.json({ success: false, error: "No image file provided" }, { status: 400 });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: "Failed to upload image" }, { status: 500 });
  }
}
