"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Zap,
  Code2,
  TrendingUp,
  ShieldCheck,
  Check,
  Calculator,
  ArrowRight,
  HelpCircle,
  Sparkles,
  ChevronDown
} from "lucide-react";
import { Tabs } from "@/components/ui/Tabs";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Modal } from "@/components/ui/Modal";

const serviceCategories = [
  { id: "ai", label: "AI & Agents", icon: <Bot className="w-4 h-4" /> },
  { id: "automation", label: "Automation", icon: <Zap className="w-4 h-4" /> },
  { id: "appdev", label: "Web & Mobile", icon: <Code2 className="w-4 h-4" /> },
  { id: "marketing", label: "Marketing & Growth", icon: <TrendingUp className="w-4 h-4" /> },
  { id: "legal", label: "Legal & Corporate", icon: <ShieldCheck className="w-4 h-4" /> },
];

const serviceDetails: Record<string, {
  title: string;
  subtitle: string;
  features: string[];
  deliverables: string[];
  specs: { title: string; content: string }[];
  colorScheme: "sky" | "cyan" | "purple" | "emerald" | "amber" | "slate";
}> = {
  ai: {
    colorScheme: "sky",
    title: "AI Chatbots & Autonomous Agents",
    subtitle: "Custom fine-tuned LLM agents integrated into WhatsApp, Web applications, Slack, CRM systems, and internal corporate databases.",
    features: [
      "Custom Retrieval-Augmented Generation (RAG) on enterprise knowledge bases",
      "Multi-turn conversational flow with sentiment analysis & lead qualification",
      "Native integrations with HubSpot, Salesforce, Zendesk, and Shopify",
      "Autonomous tool-calling (database updates, email dispatch, booking schedules)",
    ],
    deliverables: ["Custom Model Fine-tuning", "REST API & Webhooks", "Analytics Dashboard", "SLA & 99.9% Uptime Support"],
    specs: [
      { title: "What LLM foundation models do you support?", content: "We support OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Llama 3 open source models hosted on AWS/Azure, and custom embedding vector stores." },
      { title: "Is my corporate data kept confidential?", content: "Yes! We implement zero-data retention policies, private cloud RAG vector databases (Pinecone/Qdrant), and end-to-end encryption." },
    ],
  },
  automation: {
    colorScheme: "cyan",
    title: "Enterprise Workflow & Process Automation",
    subtitle: "Eliminate repetitive manual data entry, streamline multi-app business workflows, and optimize operational velocity.",
    features: [
      "Automated PDF invoice parsing, OCR extraction, and ERP auto-filling",
      "Cross-platform data synchronization across legacy systems and cloud APIs",
      "Custom Python & Node.js automation scripts running 24/7 background jobs",
      "Error alerting and automated retry mechanisms",
    ],
    deliverables: ["N8n / Make / Zapier Workflows", "Custom Python Microservices", "Webhook Middleware", "Documentation & Training"],
    specs: [
      { title: "How much speed increase can we expect?", content: "Most enterprise clients achieve a 70% to 90% reduction in processing time for repetitive tasks like reporting and data entry." },
    ],
  },
  appdev: {
    colorScheme: "sky",
    title: "Full-Stack Web & Mobile App Development",
    subtitle: "Modern, high-speed Next.js web applications and cross-platform React Native mobile applications engineered for high performance.",
    features: [
      "Next.js App Router with React Server Components & Tailwind CSS",
      "Framer Motion micro-interactions and high-converting glassmorphic designs",
      "Scalable REST & GraphQL APIs powered by Node.js, Express, PostgreSQL / MongoDB",
      "SEO optimized, Lighthouse 95+ performance score guaranteed",
    ],
    deliverables: ["Full Source Code (TypeScript)", "Figma UI/UX Mockups", "AWS/Vercel Cloud Setup", "App Store & Play Store Submissions"],
    specs: [
      { title: "Do you deliver responsive cross-browser designs?", content: "Yes! All apps are thoroughly tested across Chrome, Safari, Firefox, Edge, iOS, and Android screens." },
    ],
  },
  marketing: {
    colorScheme: "purple",
    title: "Data-Driven Digital Marketing & Growth",
    subtitle: "Hyper-targeted customer acquisition, performance ad campaigns, social media storytelling, and search engine authority.",
    features: [
      "Technical SEO, programmatic landing pages, and keyword authority building",
      "Google Ads, Meta PPC, LinkedIn B2B lead generation campaigns",
      "Social media brand storytelling and graphic design assets",
      "Conversion Rate Optimization (CRO) and A/B testing matrix",
    ],
    deliverables: ["Monthly Growth Analytics Report", "Ad Copy & Creative Banners", "On-Page SEO Optimization", "CRM Lead Pipelines"],
    specs: [
      { title: "How fast can we see results from PPC campaigns?", content: "PPC ad campaigns generate qualified lead traffic within 48 to 72 hours of going live." },
    ],
  },
  legal: {
    colorScheme: "emerald",
    title: "Legal Corporate & Compliance Services",
    subtitle: "Complete business registration, regulatory compliance, GST/tax filings, trademark protection, and statutory management.",
    features: [
      "Pvt Ltd, LLP, and OPC Company Incorporation & GST Registration",
      "Trademark filing, Patent search, and Copyright protection",
      "Corporate contract drafting (NDAs, MSAs, Founder Agreements, Terms of Service)",
      "ISO Certifications & annual statutory compliance management",
    ],
    deliverables: ["Incorporation Certificate", "Registered Trademark Copy", "Custom Legal Contracts", "Statutory Compliance Records"],
    specs: [
      { title: "Do you provide international corporate setup?", content: "Yes, we facilitate corporate registration and compliance for India, UAE (Dubai), US Delaware/LLC, and Singapore." },
    ],
  },
};

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("ai");
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const currentService = serviceDetails[activeTab];

  // Dynamic FAQs State
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loadingFaqs, setLoadingFaqs] = useState(true);
  const [selectedFaqCat, setSelectedFaqCat] = useState("All");

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const res = await fetch("/api/faqs?t=" + Date.now(), { cache: "no-store" });
        const json = await res.json();
        if (json.success && json.data) {
          setFaqs(json.data);
        }
      } catch (err) {
        console.error("Failed to load FAQs", err);
      } finally {
        setLoadingFaqs(false);
      }
    }
    fetchFaqs();
  }, []);

  // Interactive Estimator state
  const [selectedServiceType, setSelectedServiceType] = useState("ai");
  const [complexity, setComplexity] = useState("medium");
  const [timelineSpeed, setTimelineSpeed] = useState("standard");

  const calculateEstimate = () => {
    let base = selectedServiceType === "ai" ? 1500 : selectedServiceType === "automation" ? 1000 : selectedServiceType === "appdev" ? 2500 : selectedServiceType === "marketing" ? 800 : 600;
    if (complexity === "high") base *= 1.8;
    if (complexity === "enterprise") base *= 2.5;
    if (timelineSpeed === "express") base *= 1.25;
    return Math.round(base);
  };

  const faqCategories = ["All", "AI & Automation", "Web & Mobile", "Legal & Corporate", "Marketing & Growth"];
  const filteredFaqs = faqs.filter(
    (f) => selectedFaqCat === "All" || f.category === selectedFaqCat
  );

  return (
    <div className="space-y-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto pt-6">
        <Badge variant="primary" icon={<Sparkles className="w-4 h-4 text-sky-600" />}>
          End-to-End Solutions
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Comprehensive Services for <span className="gradient-text">High-Growth Enterprises</span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed text-justify sm:text-center">
          Select a category below to explore technical capabilities, tangible deliverables, and service specifications.
        </p>

        {/* Tab Switcher */}
        <div className="pt-4 flex justify-center">
          <Tabs tabs={serviceCategories} activeTab={activeTab} onChange={setActiveTab} />
        </div>
      </section>

      {/* Active Service Showcase */}
      <AnimatePresence mode="wait">
        <motion.section
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
          className="glass-card rounded-3xl p-8 sm:p-14 border-2 border-white shadow-2xl space-y-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-slate-200/60 pb-8">
            <div className="lg:col-span-8 space-y-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{currentService.title}</h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-justify">{currentService.subtitle}</p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Button size="lg" onClick={() => setQuoteModalOpen(true)} className="gap-2 shadow-sky-500/40">
                Request Custom Proposal <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Core Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Check className="w-5 h-5 text-sky-500" /> Key Features & Capabilities
              </h3>
              <div className="space-y-3">
                {currentService.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white/90 border border-slate-200/70 shadow-xs hover:border-sky-300 transition-colors">
                    <div className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0 mt-1.5" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 text-justify">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-500" /> Tangible Deliverables
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentService.deliverables.map((del, i) => (
                  <Card key={i} hoverEffect colorScheme={currentService.colorScheme} className="p-4 bg-white/90 text-slate-900 font-bold text-xs sm:text-sm border border-slate-200/80">
                    ✓ {del}
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Specs FAQ Accordion */}
          <div className="pt-6 border-t border-slate-200/60 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-purple-600" /> Technical Specifications
            </h3>
            <Accordion
              items={currentService.specs.map((s, i) => ({
                id: `spec-${i}`,
                title: s.title,
                content: <p className="text-justify">{s.content}</p>,
              }))}
            />
          </div>
        </motion.section>
      </AnimatePresence>

      {/* Dynamic Frequently Asked Questions (FAQ) Section */}
      <section className="glass-card rounded-3xl p-8 sm:p-14 border-2 border-white space-y-8 shadow-2xl">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="accent" icon={<HelpCircle className="w-4 h-4 text-purple-600" />}>
            Dynamic Knowledge Base
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
          <p className="text-xs sm:text-sm text-slate-600 text-justify sm:text-center">
            Everything you need to know about our AI implementations, web development sprints, and corporate compliance services.
          </p>

          {/* FAQ Category Filters */}
          <div className="pt-2 flex flex-wrap justify-center gap-2">
            {faqCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFaqCat(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                  selectedFaqCat === cat
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-sky-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Accordion Feed */}
        {loadingFaqs ? (
          <div className="text-center py-10 text-slate-500 font-medium">Loading FAQs...</div>
        ) : filteredFaqs.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs font-medium">No FAQs match the selected category.</div>
        ) : (
          <Accordion
            items={filteredFaqs.map((faq) => ({
              id: faq._id,
              title: (
                <div className="flex items-center justify-between w-full pr-4">
                  <span className="font-bold text-slate-900 text-sm sm:text-base">{faq.question}</span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 shrink-0 ml-2">
                    {faq.category}
                  </span>
                </div>
              ),
              content: (
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed text-justify">
                  {faq.answer}
                </p>
              ),
            }))}
          />
        )}
      </section>

      {/* Interactive Project Cost / Scope Estimator */}
      <section className="glass-card rounded-3xl p-8 sm:p-14 border-2 border-white space-y-10 shadow-2xl">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <Badge variant="accent" icon={<Calculator className="w-4 h-4 text-purple-600" />}>
            Interactive Estimator
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Project Scope & Investment Estimator</h2>
          <p className="text-xs sm:text-sm text-slate-600 text-justify sm:text-center">
            Configure your technical requirements to generate an instant budget calculation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                1. Select Service Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {serviceCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedServiceType(cat.id)}
                    className={`p-3.5 rounded-xl text-xs font-bold transition-all border text-center cursor-pointer ${
                      selectedServiceType === cat.id
                        ? "bg-sky-500 text-white border-sky-600 shadow-md shadow-sky-500/30 scale-105"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-sky-50"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                2. Complexity Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: "standard", label: "MVP / Standard" },
                  { id: "medium", label: "Advanced Integration" },
                  { id: "enterprise", label: "Enterprise Scale" },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setComplexity(c.id)}
                    className={`p-3.5 rounded-xl text-xs font-bold transition-all border text-center cursor-pointer ${
                      complexity === c.id
                        ? "bg-slate-900 text-white border-slate-900 shadow-md scale-105"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-sky-50"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                3. Delivery Speed
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "standard", label: "Standard (2 - 4 Weeks)" },
                  { id: "express", label: "Express Sprint (1 - 2 Weeks)" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTimelineSpeed(t.id)}
                    className={`p-3.5 rounded-xl text-xs font-bold transition-all border text-center cursor-pointer ${
                      timelineSpeed === t.id
                        ? "bg-cyan-600 text-white border-cyan-700 shadow-md scale-105"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-sky-50"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-4 text-center shadow-2xl border border-slate-800">
              <span className="text-xs uppercase tracking-widest text-sky-400 font-bold">Estimated Investment</span>
              <div className="text-4xl sm:text-5xl font-black text-white">${calculateEstimate()}<span className="text-sm font-semibold text-slate-400"> USD</span></div>
              <p className="text-xs text-slate-400 text-justify">Includes complete source code ownership, NDA confidentiality, and 30-day post-launch support.</p>
              <Button size="md" className="w-full justify-center shadow-sky-500/40" onClick={() => setQuoteModalOpen(true)}>
                Book Strategy Call
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      <Modal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} title="Request Custom Proposal">
        <form onSubmit={(e) => { e.preventDefault(); setQuoteModalOpen(false); alert("Proposal request sent successfully!"); }} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Company / Organization</label>
            <input type="text" required placeholder="Acme Corp" className="w-full px-4 py-3 rounded-xl border text-sm bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Email Address</label>
            <input type="email" required placeholder="contact@acme.com" className="w-full px-4 py-3 rounded-xl border text-sm bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Estimated Budget Range</label>
            <select className="w-full px-4 py-3 rounded-xl border text-sm bg-white">
              <option>$1,000 - $3,000</option>
              <option>$3,000 - $10,000</option>
              <option>$10,000+</option>
            </select>
          </div>
          <Button type="submit" className="w-full justify-center">Submit Proposal Request</Button>
        </form>
      </Modal>
    </div>
  );
}
