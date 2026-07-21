import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Calendar,
  User,
  TrendingUp,
  Cpu,
  Sparkles,
  Quote,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { portfolioProjects } from "@/data/portfolio";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: PageProps) {
  const project = portfolioProjects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | VyomAi Solutions Case Study`,
    description: project.subtitle,
  };
}

export default function PortfolioDetailPage({ params }: PageProps) {
  const projectIndex = portfolioProjects.findIndex((p) => p.slug === params.slug);
  if (projectIndex === -1) {
    notFound();
  }

  const project = portfolioProjects[projectIndex];
  const prevProject = portfolioProjects[(projectIndex - 1 + portfolioProjects.length) % portfolioProjects.length];
  const nextProject = portfolioProjects[(projectIndex + 1) % portfolioProjects.length];

  return (
    <div className="space-y-16 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* Back Button */}
      <div>
        <Link href="/portfolio">
          <Button variant="ghost" size="sm" className="gap-2 text-slate-700 hover:text-sky-600">
            <ArrowLeft className="w-4 h-4" /> Back to All Projects
          </Button>
        </Link>
      </div>

      {/* Header Info */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="primary" icon={<Sparkles className="w-3.5 h-3.5 text-sky-600" />}>
            {project.categoryLabel}
          </Badge>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Case Study Showcase
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-justify max-w-4xl">
          {project.subtitle}
        </p>

        {/* Quick Meta Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200/80">
          <div className="p-4 rounded-2xl glass-card border border-white">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <User className="w-4 h-4 text-sky-500" /> Client
            </div>
            <div className="text-sm font-extrabold text-slate-900">{project.client}</div>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-white">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <Calendar className="w-4 h-4 text-cyan-500" /> Timeline
            </div>
            <div className="text-sm font-extrabold text-slate-900">{project.timeline}</div>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-white col-span-2 sm:col-span-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <TrendingUp className="w-4 h-4 text-emerald-600" /> Primary Impact
            </div>
            <div className="text-sm font-extrabold text-emerald-600">{project.impact}</div>
          </div>
        </div>
      </section>

      {/* Main Banner Image */}
      <section>
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Detailed Narrative Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Overview, Challenge & Solution */}
        <div className="lg:col-span-8 space-y-8">
          <Card colorScheme={project.colorScheme} className="space-y-4 border-2 border-white">
            <h3 className="text-2xl font-bold text-slate-900">Project Overview</h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-justify">
              {project.overview}
            </p>
          </Card>

          <Card colorScheme="purple" className="space-y-4 border-2 border-white">
            <h3 className="text-2xl font-bold text-slate-900">The Problem & Challenge</h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-justify">
              {project.challenge}
            </p>
          </Card>

          <Card colorScheme="sky" className="space-y-4 border-2 border-white">
            <h3 className="text-2xl font-bold text-slate-900">VyomAi Solution & Architecture</h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-justify">
              {project.solution}
            </p>
          </Card>

          {/* Results Bullet Section */}
          <Card colorScheme="emerald" className="space-y-6 border-2 border-white">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" /> Measurable Business Results & Impact
            </h3>
            <div className="space-y-3">
              {project.results.map((res, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-slate-800 text-justify">{res}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Sidebar: Tech Stack & Testimonial */}
        <div className="lg:col-span-4 space-y-8">
          {/* Tech Stack */}
          <Card colorScheme="cyan" className="space-y-4 border-2 border-white">
            <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-sky-500" /> Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Card>

          {/* Testimonial Quote if present */}
          {project.testimonial && (
            <Card colorScheme="purple" className="space-y-4 border-2 border-white bg-gradient-to-br from-white/90 to-purple-50/80">
              <div className="p-2.5 rounded-xl bg-purple-100/90 text-purple-600 inline-block">
                <Quote className="w-6 h-6" />
              </div>
              <p className="text-slate-700 text-sm italic leading-relaxed text-justify">
                "{project.testimonial.quote}"
              </p>
              <div className="pt-2 border-t border-slate-200/80">
                <div className="text-sm font-extrabold text-slate-900">{project.testimonial.author}</div>
                <div className="text-xs text-slate-500 font-medium">{project.testimonial.role}</div>
              </div>
            </Card>
          )}

          {/* Call to Action Box */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4 text-center shadow-2xl border border-slate-800">
            <h4 className="text-lg font-bold text-white">Need a Similar Solution?</h4>
            <p className="text-xs text-slate-400 text-justify">
              Our engineering team can build a custom high-performance solution tailored to your operational goals.
            </p>
            <Link href="/contact" className="block">
              <Button size="md" className="w-full justify-center shadow-sky-500/40">
                Book Consultation Call
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Prev / Next Project Navigator */}
      <section className="pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href={`/portfolio/${prevProject.slug}`} className="w-full sm:w-auto">
          <Button variant="glass" className="w-full justify-start gap-2 text-slate-700">
            <ChevronLeft className="w-4 h-4" /> Previous: {prevProject.title}
          </Button>
        </Link>

        <Link href={`/portfolio/${nextProject.slug}`} className="w-full sm:w-auto">
          <Button variant="glass" className="w-full justify-end gap-2 text-slate-700">
            Next: {nextProject.title} <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
