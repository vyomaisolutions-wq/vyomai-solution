import { NextResponse } from "next/server";
import { connectToDatabase, isDbConnected } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";

// Global in-memory fallback store
if (!(globalThis as any)._memoryBlogs) {
  (globalThis as any)._memoryBlogs = [];
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const includeUnpublished = searchParams.get("admin") === "true";

  try {
    await connectToDatabase();
    if (isDbConnected()) {
      const query = includeUnpublished ? {} : { isPublished: true };
      const blogs = await Blog.find(query).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, data: blogs });
    }
  } catch (err) {
    console.warn("Using memory store fallback for GET /api/blogs");
  }

  const memoryBlogs = (globalThis as any)._memoryBlogs || [];
  const result = includeUnpublished ? memoryBlogs : memoryBlogs.filter((b: any) => b.isPublished);
  return NextResponse.json({ success: true, data: result });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, subtitle, excerpt, content, category, author, image, buttonText, tags, readTime, isPublished } = body;

    if (!title || !excerpt || !content) {
      return NextResponse.json({ success: false, error: "Title, excerpt, and content are required." }, { status: 400 });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const parsedTags = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
      ? tags.split(",").map((t) => t.trim()).filter(Boolean)
      : ["AI", "Technology"];

    const newBlogData = {
      _id: `b-${Date.now()}`,
      title,
      subtitle: subtitle || "",
      slug,
      excerpt,
      content,
      category: category || "AI & Automation",
      author: author || "VyomAi Editorial",
      image: image || "/images/agency_hero_graphic.png",
      buttonText: buttonText || "Read Article",
      tags: parsedTags,
      readTime: readTime || "5 min read",
      isPublished: isPublished !== undefined ? isPublished : true,
      createdAt: new Date().toISOString(),
    };

    // Always update global memory store for zero-delay instant UI response
    if (!(globalThis as any)._memoryBlogs) {
      (globalThis as any)._memoryBlogs = [];
    }
    (globalThis as any)._memoryBlogs.unshift(newBlogData);

    try {
      await connectToDatabase();
      if (isDbConnected()) {
        const dbBlog = await Blog.create({
          title,
          subtitle: subtitle || "",
          slug,
          excerpt,
          content,
          category: category || "AI & Automation",
          author: author || "VyomAi Editorial",
          image: image || "/images/agency_hero_graphic.png",
          buttonText: buttonText || "Read Article",
          tags: parsedTags,
          readTime: readTime || "5 min read",
          isPublished: isPublished !== undefined ? isPublished : true,
        });
        return NextResponse.json({ success: true, data: dbBlog }, { status: 201 });
      }
    } catch (dbErr) {
      console.warn("DB save failed, using memory store fallback for POST /api/blogs");
    }

    return NextResponse.json({ success: true, data: newBlogData }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create blog" }, { status: 500 });
  }
}
