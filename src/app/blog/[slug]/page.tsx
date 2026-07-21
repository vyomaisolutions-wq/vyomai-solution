import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { connectToDatabase, isDbConnected } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface PageProps {
  params: {
    slug: string;
  };
}

const fallbackBlogs: any[] = [];

async function getBlogPost(slug: string) {
  try {
    await connectToDatabase();
    if (isDbConnected()) {
      const blog = await Blog.findOne({ slug, isPublished: true });
      if (blog) return JSON.parse(JSON.stringify(blog));
    }
  } catch (err) {
    console.warn("DB query error for blog slug, using fallback:", slug);
  }

  // Fallback search in global memory store
  const memoryBlogs = (globalThis as any)._memoryBlogs || [];
  const memoryMatch = memoryBlogs.find((b: any) => b.slug === slug);
  if (memoryMatch) return memoryMatch;

  const fallback = fallbackBlogs.find((b: any) => b.slug === slug);
  if (fallback) return fallback;

  return null;
}

export async function generateMetadata({ params }: PageProps) {
  const post = await getBlogPost(params.slug);
  if (!post) return { title: "Blog Article Not Found" };

  return {
    title: `${post.title} | VyomAi Blog`,
    description: post.subtitle || post.excerpt,
  };
}

export default async function SingleBlogPage({ params }: PageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-12 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* Back Button */}
      <div>
        <Link href="/blog">
          <Button variant="ghost" size="sm" className="gap-2 text-slate-700 hover:text-sky-600">
            <ArrowLeft className="w-4 h-4" /> Back to All Articles
          </Button>
        </Link>
      </div>

      {/* Article Header */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="primary" icon={<Sparkles className="w-3.5 h-3.5 text-sky-600" />}>
            {post.category}
          </Badge>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-sky-500" />
            {new Date(post.createdAt || Date.now()).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="text-lg font-semibold text-sky-600">
              {post.subtitle}
            </p>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {post.tags.map((tag: string, i: number) => (
              <span
                key={i}
                className="text-xs font-bold px-3 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-card border border-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
              {post.author ? post.author.charAt(0) : "V"}
            </div>
            <div>
              <div className="text-sm font-extrabold text-slate-900">{post.author || "VyomAi Editorial"}</div>
              <div className="text-xs text-slate-500 font-medium">Technical Contributor</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-cyan-500" /> {post.readTime || "5 min read"}
            </span>
          </div>
        </div>
      </section>

      {/* Banner Cover Image */}
      <section>
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
          <Image
            src={post.image || "/images/agency_hero_graphic.png"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Main Content Body */}
      <section className="glass-card rounded-3xl p-8 sm:p-12 border-2 border-white shadow-2xl space-y-6">
        <p className="text-lg font-semibold text-slate-700 leading-relaxed text-justify border-l-4 border-sky-500 pl-4 py-1 italic bg-sky-50/60 rounded-r-xl">
          {post.excerpt}
        </p>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-800 text-sm sm:text-base leading-relaxed text-justify whitespace-pre-wrap font-sans">
          {post.content}
        </div>

        {/* CTA Button Box */}
        <div className="pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-slate-900">Enjoyed this article?</div>
            <div className="text-xs text-slate-500">Explore our custom solutions or book a free strategy consultation call.</div>
          </div>

          <Link href="/contact">
            <Button size="lg" className="gap-2 shadow-sky-500/30">
              {post.buttonText || "Get Started"} <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
