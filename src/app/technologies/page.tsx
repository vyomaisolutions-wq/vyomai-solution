"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Terminal,
  Copy,
  Check,
  Zap,
  Server,
  Layers,
  Sparkles
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const techCategories = [
  {
    name: "Artificial Intelligence & LLMs",
    colorScheme: "sky" as const,
    items: [
      { name: "OpenAI GPT-4o", desc: "Multimodal reasoning & computer vision pipelines" },
      { name: "Claude 3.5 Sonnet", desc: "State-of-the-art code generation & deep document analysis" },
      { name: "LangChain / LlamaIndex", desc: "Enterprise RAG framework & vector document pipelines" },
      { name: "Pinecone / Qdrant", desc: "High-speed vector embedding database infrastructure" },
    ],
  },
  {
    name: "Frontend & Mobile Engineering",
    colorScheme: "cyan" as const,
    items: [
      { name: "Next.js 14/15", desc: "React Server Components, App Router & SSR performance" },
      { name: "TypeScript", desc: "End-to-end type safety & modular clean architecture" },
      { name: "Framer Motion", desc: "60fps physics-driven fluid UI animations & layout transitions" },
      { name: "Tailwind CSS", desc: "Utility-first responsive design system tokens" },
    ],
  },
  {
    name: "Backend, Cloud & Infrastructure",
    colorScheme: "purple" as const,
    items: [
      { name: "Node.js & Express", desc: "High-throughput asynchronous API runtime environment" },
      { name: "Python / FastAPI", desc: "Machine learning microservices & async task execution" },
      { name: "PostgreSQL & Prisma", desc: "ACID compliant relational database schemas & ORM" },
      { name: "AWS & Vercel", desc: "Global edge deployment, AWS Lambda & Docker containers" },
    ],
  },
  {
    name: "Workflow & Automation Tools",
    colorScheme: "emerald" as const,
    items: [
      { name: "Make.com & n8n", desc: "Visual multi-app pipeline orchestration & webhooks" },
      { name: "Zapier Enterprise", desc: "Instant SaaS API connector workflows & triggers" },
      { name: "Selenium & Playwright", desc: "Headless web scraping & E2E integration testing" },
      { name: "Docker Containerization", desc: "Isolated environment deployment & microservices" },
    ],
  },
];

const samplePrompts: Record<string, string> = {
  customer_agent: `// Interactive Demo: Autonomous Customer Support Agent
const response = await fetch('/api/ai/agent', {
  method: 'POST',
  body: JSON.stringify({
    prompt: "Qualify lead and check order status for #VYOM-9021",
    tools: ["checkDatabase", "sendWhatsApp"]
  })
});
// Result: Outputting verified status & automated response within 120ms.`,
  workflow: `// Interactive Demo: PDF Invoice Extraction Pipeline
import { parsePDF, syncToERP } from '@vyomai/automation';

const invoiceData = await parsePDF('supplier_invoice.pdf');
await syncToERP({
  vendor: invoiceData.vendor,
  amount: invoiceData.total,
  taxId: invoiceData.gst
});
// Result: 100% automated accounting record created.`,
  app_template: `// Interactive Demo: React Next.js Server Component
export default async function DashboardPage() {
  const analytics = await getLiveAIAnalytics();
  return <AnalyticsChart data={analytics} />;
}`
};

export default function TechnologiesPage() {
  const [selectedDemoKey, setSelectedDemoKey] = useState("customer_agent");
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(samplePrompts[selectedDemoKey]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto pt-6">
        <Badge variant="primary" icon={<Sparkles className="w-4 h-4 text-sky-600" />}>
          Ecosystem & Architecture
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Integrated Technological <span className="gradient-text">Ecosystem</span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed text-justify sm:text-center">
          We leverage enterprise-grade frameworks, modern AI infrastructure, and cloud microservices to build future-proof products.
        </p>
      </section>

      {/* Tech Categories Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {techCategories.map((cat, idx) => (
          <Card key={idx} colorScheme={cat.colorScheme} className="space-y-6 border-2 border-white/90">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200/60 pb-3">
              <Cpu className="w-5 h-5 text-sky-500" /> {cat.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cat.items.map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/90 border border-slate-200/70 space-y-1 hover:border-sky-300 transition-colors shadow-2xs">
                  <div className="text-sm font-bold text-slate-900">{item.name}</div>
                  <div className="text-xs text-slate-600 leading-relaxed text-justify">{item.desc}</div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </section>

      {/* Interactive AI Sandbox Code Component */}
      <section className="glass-card rounded-3xl p-8 sm:p-14 border-2 border-white space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <Badge variant="accent" icon={<Terminal className="w-4 h-4 text-purple-600" />}>
              Live Tech Demo
            </Badge>
            <h2 className="text-2xl font-extrabold text-slate-900">Interactive Architecture Playground</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: "customer_agent", label: "AI Agent API" },
              { id: "workflow", label: "Workflow Bot" },
              { id: "app_template", label: "Next.js SSR" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSelectedDemoKey(btn.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  selectedDemoKey === btn.id
                    ? "bg-sky-500 text-white border-sky-600 shadow-md shadow-sky-500/30 scale-105"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-sky-50"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Code Terminal Box */}
        <div className="relative bg-slate-950 text-slate-100 rounded-3xl p-6 sm:p-8 font-mono text-xs sm:text-sm shadow-2xl border border-slate-800 overflow-x-auto">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4 text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="ml-2 text-xs text-slate-500 font-sans">vyomai-engine.ts</span>
            </div>
            <button
              onClick={copyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy Code"}
            </button>
          </div>

          <pre className="text-sky-300 leading-relaxed whitespace-pre-wrap text-justify">
            {samplePrompts[selectedDemoKey]}
          </pre>
        </div>
      </section>
    </div>
  );
}
