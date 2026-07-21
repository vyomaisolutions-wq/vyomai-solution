"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Shield,
  Lightbulb,
  HeartHandshake,
  Award,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const values = [
  {
    icon: <Lightbulb className="w-6 h-6 text-sky-500" />,
    title: "AI-First Innovation",
    desc: "We continuously pioneer bleeding-edge AI models, autonomous agents, and automation frameworks to give our clients an unfair competitive advantage.",
    colorScheme: "sky" as const,
  },
  {
    icon: <Shield className="w-6 h-6 text-cyan-500" />,
    title: "Enterprise Trust & Integrity",
    desc: "Uncompromising data security, strict regulatory compliance, and transparent delivery standard across all international markets.",
    colorScheme: "cyan" as const,
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-purple-600" />,
    title: "Client-Centric Growth",
    desc: "Every line of code and marketing strategy is engineered to deliver measurable ROI and sustained operational velocity.",
    colorScheme: "purple" as const,
  },
  {
    icon: <Award className="w-6 h-6 text-emerald-600" />,
    title: "Unmatched Excellence",
    desc: "Rigorous quality assurance, clean architecture, zero technical debt, and continuous post-launch optimization.",
    colorScheme: "emerald" as const,
  }
];

const timeline = [
  { year: "2021", title: "Foundation & Vision", desc: "VyomAi was founded to bridge enterprise software engineering with emerging automation tools and digital growth frameworks.", colorScheme: "sky" as const },
  { year: "2022", title: "Corporate Legal Advisory", desc: "Expanded service portfolio to include full legal corporate advisory, trademark protection, GST, and statutory compliance consulting.", colorScheme: "cyan" as const },
  { year: "2023", title: "Autonomous AI Agents", desc: "Pioneered RAG architectures and custom LLM chatbots for e-commerce, healthcare, finance, and legal enterprise clients.", colorScheme: "purple" as const },
  { year: "2024+", title: "Global Expansion", desc: "Extended operations across 12+ countries serving fast-growing scaleups and global corporate brands.", colorScheme: "emerald" as const },
];

export default function AboutPage() {
  return (
    <div className="space-y-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto pt-6">
        <Badge variant="primary" icon={<Sparkles className="w-4 h-4 text-sky-600" />}>
          About VyomAi Solutions
        </Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
          Empowering Businesses with <span className="gradient-text">Scalable Tech & AI</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-justify sm:text-center">
          We combine cutting-edge artificial intelligence, custom engineering, digital growth strategies, and corporate compliance into one unified growth engine.
        </p>
      </section>

      {/* Vision & Mission Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card colorScheme="sky" className="space-y-4 border-2 border-white/90">
          <div className="p-3.5 rounded-2xl bg-sky-100/90 inline-block shadow-sm">
            <Target className="w-8 h-8 text-sky-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
          <p className="text-slate-600 leading-relaxed text-justify text-sm sm:text-base">
            To democratize state-of-the-art AI technology and automated workflows for organizations worldwide, enabling teams to operate faster, eliminate repetitive manual toil, and achieve exponential long-term growth.
          </p>
        </Card>

        <Card colorScheme="cyan" className="space-y-4 border-2 border-white/90">
          <div className="p-3.5 rounded-2xl bg-cyan-100/90 inline-block shadow-sm">
            <Eye className="w-8 h-8 text-cyan-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
          <p className="text-slate-600 leading-relaxed text-justify text-sm sm:text-base">
            Creating a future of connected business operations where AI agents, full-stack web applications, performance marketing campaigns, and legal frameworks operate in seamless harmony across global markets.
          </p>
        </Card>
      </section>

      {/* Leadership Spotlight Section */}
      <section className="glass-card rounded-3xl p-8 sm:p-14 border-2 border-white overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
              <Image
                src="/images/profile_meenakshi.png"
                alt="Leadership Profile"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <Badge variant="accent">Leadership & Vision</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Driven By Innovation, Grounded In Excellence
            </h2>
            <p className="text-slate-600 leading-relaxed text-justify text-sm sm:text-base">
              At VyomAi Solutions Pvt Ltd, leadership goes beyond executive management—it is about cultivating a culture of relentless problem-solving, architectural precision, and total client empowerment.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/80 border border-slate-200/80">
                <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                <p className="text-slate-700 text-xs sm:text-sm font-semibold text-justify">Cross-disciplinary mastery across software engineering, AI LLMs, digital growth, and legal compliance.</p>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/80 border border-slate-200/80">
                <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                <p className="text-slate-700 text-xs sm:text-sm font-semibold text-justify">Hands-on guidance for every enterprise engagement from discovery to deployment and post-launch SLAs.</p>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/contact">
                <Button className="gap-2 shadow-sky-500/30">
                  Connect With Leadership <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="space-y-10">
        <div className="text-center space-y-2">
          <Badge variant="primary">What Guides Us</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Our Core Values</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {values.map((val, idx) => (
            <Card key={idx} colorScheme={val.colorScheme} className="space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-white shadow-sm inline-block border border-slate-100">
                  {val.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-900">{val.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed text-justify">{val.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Timeline Milestones */}
      <section className="space-y-10">
        <div className="text-center space-y-2">
          <Badge variant="secondary">Company History</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Our Evolution Journey</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {timeline.map((item, idx) => (
            <Card key={idx} colorScheme={item.colorScheme} className="space-y-3">
              <span className="text-3xl font-black gradient-text">{item.year}</span>
              <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed text-justify">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
