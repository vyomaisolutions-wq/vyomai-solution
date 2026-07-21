"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Stethoscope,
  ShoppingBag,
  Landmark,
  GraduationCap,
  Factory,
  TrendingUp,
  Globe2,
  Sparkles
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const industryList = [
  {
    icon: <Stethoscope className="w-8 h-8 text-rose-500" />,
    name: "Healthcare & Life Sciences",
    desc: "HIPAA-compliant patient triage AI agents, automated medical appointment scheduling, and electronic health record (EHR) database synchronization.",
    roi: "85% reduction in patient triage wait time",
    tags: ["HIPAA Compliant", "AI Triage", "EHR Sync"],
    colorScheme: "sky" as const,
  },
  {
    icon: <ShoppingBag className="w-8 h-8 text-sky-500" />,
    name: "E-Commerce & Retail",
    desc: "24/7 WhatsApp AI sales bot, automated inventory reordering, personalized product recommendation engine, and return handling automation.",
    roi: "3.2x increase in conversion rates",
    tags: ["Shopify API", "WhatsApp Bot", "Inventory Sync"],
    colorScheme: "cyan" as const,
  },
  {
    icon: <Landmark className="w-8 h-8 text-emerald-600" />,
    name: "Banking, Finance & Fintech",
    desc: "Automated loan application processing, KYC document OCR verification, fraud detection models, and GST tax compliance automation.",
    roi: "95% faster loan approval processing",
    tags: ["KYC OCR", "Fintech API", "Tax Compliance"],
    colorScheme: "emerald" as const,
  },
  {
    icon: <Building2 className="w-8 h-8 text-purple-600" />,
    name: "Real Estate & Property Management",
    desc: "Virtual property tour booking agents, automated lead qualification, lease agreement generation, and tenant portal web applications.",
    roi: "4x increase in qualified buyer leads",
    tags: ["Property CRM", "Virtual Tour Bot", "Lease Automation"],
    colorScheme: "purple" as const,
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-amber-500" />,
    name: "Education & EdTech",
    desc: "Interactive AI tutor assistants, student enrollment chatbots, automated grading scripts, and mobile learning portal applications.",
    roi: "60% operational overhead saved",
    tags: ["LMS API", "AI Tutor", "Student CRM"],
    colorScheme: "amber" as const,
  },
  {
    icon: <Factory className="w-8 h-8 text-slate-700" />,
    name: "Manufacturing & Supply Chain",
    desc: "Predictive maintenance algorithms, automated vendor communication pipelines, invoice reconciliation, and logistics tracking.",
    roi: "40% reduction in supply chain delays",
    tags: ["Logistics API", "Predictive AI", "Supply Chain"],
    colorScheme: "slate" as const,
  },
];

export default function IndustriesPage() {
  return (
    <div className="space-y-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto pt-6">
        <Badge variant="primary" icon={<Sparkles className="w-4 h-4 text-sky-600" />}>
          Sector Specialization
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Tailored AI Solutions for <span className="gradient-text">Global Industries</span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed text-justify sm:text-center">
          We combine domain expertise with automated workflows to solve complex sector-specific challenges across global markets.
        </p>
      </section>

      {/* Industry Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {industryList.map((ind, idx) => (
          <Card
            key={idx}
            colorScheme={ind.colorScheme}
            className="flex flex-col justify-between space-y-6 h-full border-2 border-white/90"
          >
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-white shadow-md inline-block border border-slate-100">
                {ind.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{ind.name}</h3>
              <p className="text-slate-600 text-sm leading-relaxed text-justify">{ind.desc}</p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200/60">
              <div className="p-3 rounded-xl bg-sky-50 text-sky-900 font-bold text-xs flex items-center gap-2 border border-sky-100">
                <TrendingUp className="w-4 h-4 text-sky-600 shrink-0" />
                <span>{ind.roi}</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {ind.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </section>

      {/* Global Regions Banner */}
      <section className="glass-card rounded-3xl p-8 sm:p-14 border-2 border-white text-center space-y-6 shadow-2xl">
        <div className="max-w-2xl mx-auto space-y-3">
          <Badge variant="secondary" icon={<Globe2 className="w-4 h-4 text-cyan-600" />}>
            Global Compliance & Scale
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Serving Enterprises Across Multiple Regions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base text-justify sm:text-center">
            Our solutions comply with GDPR, HIPAA, SOC2, and regional Indian statutory corporate guidelines.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {["India", "United States", "United Arab Emirates", "United Kingdom", "Singapore", "Canada", "Australia", "Germany & Europe"].map((country, i) => (
            <span key={i} className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs hover:border-sky-300 transition-colors">
              🌐 {country}
            </span>
          ))}
        </div>

        <div className="pt-4">
          <Link href="/contact">
            <Button size="lg" className="shadow-sky-500/40">Discuss Industry-Specific Solution</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
