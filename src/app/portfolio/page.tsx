"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Star,
  Sparkles,
  Quote,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { portfolioProjects } from "@/data/portfolio";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const categories = [
  { id: "all", label: "All Projects" },
  { id: "ai", label: "AI & Automation" },
  { id: "web", label: "Web & Apps" },
  { id: "marketing", label: "Creative & Marketing" },
];

const testimonials = [
  {
    quote: "VyomAi Solutions transformed our operational workflow with their custom AI agent. Tasks that used to take 3 full days are now completed in 15 minutes!",
    author: "Meera Krishnan",
    role: "COO, Nexus FinCorp",
  },
  {
    quote: "The Next.js web application built by VyomAi is blazing fast, beautifully designed, and significantly boosted our organic lead conversion rate.",
    author: "David Miller",
    role: "Founder, Apex Athletics",
  },
  {
    quote: "Their legal team simplified our company registration and trademark filings across Dubai and India without any friction.",
    author: "Vikram Singh",
    role: "Managing Director, Global Logistics Pvt Ltd",
  },
];

const ITEMS_PER_PAGE = 9;

export default function PortfolioPage() {
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 on category filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const filteredProjects = filter === "all" ? portfolioProjects : portfolioProjects.filter((p) => p.category === filter);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE) || 1;
  const paginatedProjects = filteredProjects.slice(
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
    <div className="space-y-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto pt-6">
        <Badge variant="primary" icon={<Sparkles className="w-4 h-4 text-sky-600" />}>
          Case Studies & Gallery
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Featured AI & <span className="gradient-text">Growth Projects</span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed text-justify sm:text-center">
          Explore our real-world implementations delivering measurable impact. Click on any project card to view complete architectural details and results.
        </p>

        {/* Filter Buttons */}
        <div className="pt-4 flex flex-wrap justify-center gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all border cursor-pointer ${
                filter === cat.id
                  ? "bg-sky-500 text-white border-sky-600 shadow-md shadow-sky-500/30 scale-105"
                  : "bg-white/90 text-slate-700 border-slate-200 hover:bg-sky-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid linking to single page /portfolio/[slug] */}
      <section className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {paginatedProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/portfolio/${project.slug}`}>
                  <Card
                    colorScheme={project.colorScheme}
                    className="flex flex-col h-full justify-between cursor-pointer group border-2 border-white/90"
                  >
                    <div className="space-y-4">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-inner bg-slate-100 border border-slate-200/60">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-108 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3">
                          <span className="px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                            {project.categoryLabel}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-justify">{project.desc}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> {project.impact}
                      </span>
                      <span className="text-xs font-bold text-sky-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        View Case Study <ArrowRight className="w-3.5 h-3.5" />
                      </span>
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
      </section>

      {/* Testimonials Section */}
      <section className="glass-card rounded-3xl p-8 sm:p-14 border-2 border-white space-y-8 shadow-2xl">
        <div className="text-center space-y-2">
          <Badge variant="accent" icon={<Quote className="w-4 h-4 text-purple-600" />}>
            Client Reviews
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">What Our Partners Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <Card key={idx} hoverEffect className="bg-white/90 p-6 rounded-2xl border border-slate-200/70 space-y-4 flex flex-col justify-between">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic text-justify">"{t.quote}"</p>
              <div className="pt-3 border-t border-slate-100">
                <div className="text-sm font-bold text-slate-900">{t.author}</div>
                <div className="text-xs text-slate-500">{t.role}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
