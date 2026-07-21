"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Search,
  Calendar,
  User,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const categories = ["All", "AI & Automation", "Tech & Architecture", "Legal & Growth"];
const ITEMS_PER_PAGE = 9;

export default function BlogIndexPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blogs?t=" + Date.now(), { cache: "no-store" });
        const json = await res.json();
        if (json.success && json.data) {
          setBlogs(json.data);
        }
      } catch (err) {
        console.error("Failed to load blogs", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  // Reset to page 1 on search or category filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const filteredBlogs = blogs.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.subtitle && post.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE) || 1;
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="primary" icon={<Sparkles className="w-4 h-4 text-sky-600" />}>
          Insights & Tech Articles
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          VyomAi <span className="gradient-text">Blog & Knowledge Hub</span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed text-justify sm:text-center">
          In-depth engineering guides, autonomous AI architecture trends, legal corporate compliance, and digital growth strategies.
        </p>

        {/* Search Bar & Category Filters */}
        <div className="space-y-4 pt-4">
          <div className="relative max-w-xl mx-auto">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles by title, subtitle, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl glass-card border border-white text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-300 shadow-md"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-sky-500 text-white border-sky-600 shadow-md shadow-sky-500/30 scale-105"
                    : "bg-white/90 text-slate-700 border-slate-200 hover:bg-sky-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Feed Grid */}
      <section className="space-y-12">
        {loading ? (
          <div className="text-center py-20 text-slate-500 font-medium">Loading articles...</div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-16 space-y-3 glass-card rounded-3xl p-8 max-w-md mx-auto">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">No Articles Found</h3>
            <p className="text-xs text-slate-500">Try clearing your search query or selecting another category.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="wait">
                {paginatedBlogs.map((post) => (
                  <motion.div
                    key={post._id || post.slug}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <Card hoverEffect className="flex flex-col h-full justify-between space-y-6 border-2 border-white/90 group cursor-pointer">
                        <div className="space-y-4">
                          {/* Cover Image */}
                          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-inner border border-slate-200/60 bg-slate-100">
                            <Image
                              src={post.image || "/images/agency_hero_graphic.png"}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3">
                              <span className="px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                                {post.category}
                              </span>
                            </div>
                          </div>

                          {/* Date & Author & Read Time */}
                          <div className="flex flex-wrap items-center justify-between text-xs font-semibold text-slate-500 gap-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-sky-500" />
                              {new Date(post.createdAt || Date.now()).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-cyan-500" /> {post.readTime || "5 min read"}
                            </span>
                          </div>

                          {/* Title & Subtitle */}
                          <div className="space-y-1">
                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                              {post.title}
                            </h3>
                            {post.subtitle && (
                              <p className="text-xs font-semibold text-sky-600 line-clamp-1">
                                {post.subtitle}
                              </p>
                            )}
                          </div>

                          {/* Excerpt */}
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-justify line-clamp-3">
                            {post.excerpt}
                          </p>

                          {/* Tags */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {post.tags.map((tag: string, i: number) => (
                                <span
                                  key={i}
                                  className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200/60"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Custom Button CTA */}
                        <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-slate-400" /> {post.author}
                          </span>
                          <Button variant="primary" size="sm" className="gap-1.5 shadow-sky-500/20 text-xs px-4 py-2">
                            {post.buttonText || "Read Article"} <ArrowRight className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-sky-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 transition-all cursor-pointer"
                  title="Previous Page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 rounded-xl text-xs font-extrabold transition-all border cursor-pointer ${
                        currentPage === pageNum
                          ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white border-sky-500 shadow-md shadow-sky-500/25 scale-105"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-sky-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-sky-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 transition-all cursor-pointer"
                  title="Next Page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
