"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bot,
  Zap,
  Code2,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Globe,
  Award,
  Send,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const stats = [
  { label: "AI & Automation Workflows", value: "250+", color: "from-sky-500 to-cyan-500" },
  { label: "Global Corporate Clients", value: "98%", color: "from-blue-600 to-sky-500" },
  { label: "Avg Efficiency Increase", value: "3.5x", color: "from-purple-600 to-indigo-500" },
  { label: "Countries Served", value: "12+", color: "from-emerald-500 to-teal-500" },
];

const mainServices = [
  {
    icon: <Bot className="w-8 h-8 text-sky-500" />,
    title: "AI Chatbots & Intelligent Agents",
    description: "Deploy autonomous LLM agents fine-tuned on your enterprise data to handle 24/7 support, execute complex workflows, qualify sales leads, and provide instant predictive insights across all channels.",
    tags: ["GPT-4o", "Claude 3.5", "RAG Pipeline", "LangChain"],
    href: "/services",
    colorScheme: "sky" as const,
  },
  {
    icon: <Zap className="w-8 h-8 text-cyan-500" />,
    title: "Process & Workflow Automation",
    description: "Streamline repetitive enterprise operations, invoice parsing, cross-platform CRM synchronization, automated report generation, and robust 24/7 background Python script execution.",
    tags: ["Make.com", "n8n", "Zapier", "Python Bots"],
    href: "/services",
    colorScheme: "cyan" as const,
  },
  {
    icon: <Code2 className="w-8 h-8 text-blue-600" />,
    title: "Full-Stack Web & Mobile Apps",
    description: "Build high-speed Next.js web platforms, React Native mobile applications, scalable cloud microservices, and glassmorphic UI designs engineered for maximum speed and conversion.",
    tags: ["Next.js 14", "TypeScript", "Node.js", "AWS Cloud"],
    href: "/services",
    colorScheme: "sky" as const,
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
    title: "Digital Marketing & Growth",
    description: "Drive multi-channel customer acquisition using programmatic technical SEO, precision Google/Meta PPC campaigns, high-converting social media creative assets, and funnel analytics.",
    tags: ["Technical SEO", "Performance PPC", "Content AI", "Analytics"],
    href: "/services",
    colorScheme: "purple" as const,
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
    title: "Legal & Corporate Compliance",
    description: "End-to-end corporate registration, Pvt Ltd / LLP incorporation, statutory tax filings, ISO certifications, trademark protection, and custom commercial contract drafting.",
    tags: ["GST & Tax", "ISO Certified", "IP Rights", "Incorporation"],
    href: "/services",
    colorScheme: "emerald" as const,
  },
];

const processSteps = [
  { step: "01", title: "Strategic Discovery", desc: "We map out your business goals, audit current technical infrastructure, and architect a customized solution roadmap.", color: "sky" },
  { step: "02", title: "Architecture & UX", desc: "Designing responsive glassmorphic UI components, scalable database schemas, and AI agent workflow blueprints.", color: "cyan" },
  { step: "03", title: "Rapid Agile Sprint", desc: "Engineering clean, type-safe Next.js code with Framer Motion physics, unit testing, and API integration.", color: "purple" },
  { step: "04", title: "Launch & Optimization", desc: "Continuous automated CI/CD deployment, SLA monitoring, and data-driven performance tuning for sustained ROI.", color: "emerald" },
];

export default function HomePage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <div className="space-y-28 pb-24 overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 sm:pt-12">
        {/* Floating Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-gradient-to-tr from-sky-400/25 via-cyan-400/20 to-purple-400/25 rounded-full blur-3xl -z-10 floating-bg-blur" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl -z-10 floating-bg-blur" style={{ animationDelay: "4s" }} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            <Badge variant="primary" icon={<Sparkles className="w-4 h-4 text-sky-600" />}>
              AI-First Enterprise Solutions
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Transform Your Business With <span className="gradient-text">Next-Gen AI & Automation</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-justify max-w-2xl">
              VyomAi Solutions delivers autonomous AI agents, enterprise workflow automation, custom full-stack web platforms, performance digital marketing, and corporate legal compliance services designed to accelerate your growth.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link href="/contact">
                <Button size="lg" className="gap-2 shadow-sky-500/40 hover:shadow-sky-500/60">
                  Get Free Consultation <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="glass" size="lg" className="gap-2 border-sky-200 hover:border-sky-400">
                  Explore Portfolio
                </Button>
              </Link>
            </div>

            {/* Quick Proof Badges */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-4 sm:gap-8 text-xs sm:text-sm font-semibold text-slate-700">
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 shadow-sm border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-sky-500" /> Enterprise Ready
              </span>
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 shadow-sm border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-sky-500" /> 24/7 Autonomous AI
              </span>
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 shadow-sm border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-sky-500" /> Global Standards
              </span>
            </div>
          </motion.div>

          {/* Hero Image / Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="glass-card rounded-3xl p-4 sm:p-6 shadow-2xl relative border-2 border-white/90">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-inner">
                <Image
                  src="/images/agency_hero_graphic.png"
                  alt="VyomAi Hero Graphic"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>

              {/* Floating Stat Widget */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-4 sm:-left-6 glass-card p-4 rounded-2xl shadow-2xl border border-white flex items-center gap-3.5 bg-white/95 backdrop-blur-xl"
              >
                <div className="p-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-bold shadow-md shadow-sky-500/30">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">AI Accuracy Rate</div>
                  <div className="text-lg font-black text-slate-900">99.4% Precision</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, idx) => (
            <Card key={idx} hoverEffect colorScheme="sky" className="text-center space-y-2 py-8">
              <div className={`text-4xl sm:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-700 tracking-wide">{stat.label}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Main Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="secondary">Integrated Ecosystem</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Services Engineered for Modern Enterprises
          </h2>
          <p className="text-slate-600 text-base sm:text-lg text-justify sm:text-center leading-relaxed">
            From autonomous AI LLM models to full statutory corporate compliance, we manage your entire operational and digital technology stack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainServices.map((service, idx) => (
            <Card
              key={idx}
              colorScheme={service.colorScheme}
              className="flex flex-col justify-between space-y-6 h-full border-2 border-white/90"
            >
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white shadow-md inline-block border border-slate-100">
                  {service.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed text-justify">
                  {service.description}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-200/60">
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100/90 text-slate-700 border border-slate-200/60 shadow-2xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={service.href}
                  className="inline-flex items-center text-sm font-bold text-sky-600 hover:text-sky-800 gap-1.5 group/link pt-2"
                >
                  Explore Solution{" "}
                  <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Process Methodology Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-14 space-y-12 border-2 border-white shadow-2xl">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="accent">Proven Methodology</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Clear Process From Discovery To Delivery
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A structured agile approach built to eliminate risks and ensure rapid turnarounds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {processSteps.map((p, idx) => (
              <Card
                key={idx}
                hoverEffect
                className="bg-white/90 p-6 rounded-2xl border border-slate-200/80 space-y-3 flex flex-col justify-between shadow-md"
              >
                <div className="space-y-2">
                  <span className="text-4xl font-black text-sky-500 group-hover:text-cyan-600 transition-colors">
                    {p.step}
                  </span>
                  <h4 className="text-lg font-bold text-slate-900">{p.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed text-justify">{p.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Contact Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-6">
            <Badge variant="primary">Get In Touch</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Ready to elevate your systems and growth?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-justify">
              Schedule a free 30-minute strategic consultation with our lead AI architects and software engineering directors.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl glass-card border border-white">
                <div className="p-3 rounded-xl bg-sky-500 text-white font-bold shadow-md">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Global Operations</div>
                  <div className="text-sm font-bold text-slate-900">India, USA, UAE, Singapore & Europe</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl glass-card border border-white">
                <div className="p-3 rounded-xl bg-cyan-500 text-white font-bold shadow-md">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Guaranteed SLAs</div>
                  <div className="text-sm font-bold text-slate-900">100% Confidentiality & Dedicated PM</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Card hoverEffect={false} className="p-8 sm:p-10 rounded-3xl border-2 border-white shadow-2xl bg-white/95">
              {formSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Message Received!</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto text-justify">
                    Thank you for reaching out. Our solution team will review your inquiry and contact you within 4 hours.
                  </p>
                  <Button variant="outline" onClick={() => setFormSubmitted(false)}>
                    Send Another Inquiry
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none text-slate-900 text-sm bg-white shadow-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none text-slate-900 text-sm bg-white shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Primary Objective
                    </label>
                    <select className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none text-slate-900 text-sm bg-white shadow-xs font-medium">
                      <option>AI Chatbot / Custom LLM Agent</option>
                      <option>Enterprise Process Automation</option>
                      <option>Full-Stack Application Development</option>
                      <option>Digital Marketing & SEO Campaign</option>
                      <option>Legal & Corporate Registration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Project Details
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Briefly describe your requirements or challenge..."
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none text-slate-900 text-sm bg-white shadow-xs text-justify"
                    ></textarea>
                  </div>

                  <Button type="submit" size="lg" className="w-full justify-center gap-2 shadow-sky-500/40">
                    <Send className="w-4 h-4" /> Send Request
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
