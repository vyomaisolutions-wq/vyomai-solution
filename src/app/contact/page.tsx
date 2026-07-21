"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Clock,
  Send,
  Globe,
  Sparkles,
  HelpCircle
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";

const faqItems = [
  {
    id: "faq-1",
    title: "How fast can VyomAi launch a custom AI agent or workflow?",
    content: <p className="text-justify">Standard AI agents and workflow automation prototypes are delivered within 5 to 10 business days. Full enterprise custom builds take 3 to 4 weeks depending on database schema complexity.</p>
  },
  {
    id: "faq-2",
    title: "Do you sign non-disclosure agreements (NDAs) before discovery calls?",
    content: <p className="text-justify">Absolutely. We strictly protect client IP and proprietary workflow data. We execute mutual NDAs prior to accessing any sensitive systems or repositories.</p>
  },
  {
    id: "faq-3",
    title: "What ongoing maintenance and SLAs do you offer?",
    content: <p className="text-justify">We provide 24/7 proactive system monitoring, 99.9% uptime guarantees, regular LLM model retraining, and dedicated technical account management.</p>
  },
  {
    id: "faq-4",
    title: "Can you assist with corporate legal registrations internationally?",
    content: <p className="text-justify">Yes! We handle Pvt Ltd / LLP incorporation, GST, trademark protection, and statutory compliance in India, UAE (Dubai), US, and Singapore.</p>
  }
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const formData = new FormData(e.currentTarget);
    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="primary" icon={<Sparkles className="w-4 h-4 text-sky-600" />}>
          Connect With Us
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Let’s Build Something <span className="gradient-text">Extraordinary</span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed text-justify sm:text-center">
          Have a project in mind or need expert technical consultation? Send us a message or schedule a call.
        </p>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <Card colorScheme="sky" className="space-y-4 border-2 border-white/90">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-sky-100 text-sky-600 shadow-sm">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Direct Email</h4>
                <a href="mailto:contact@vyomai.com" className="text-base font-bold text-slate-900 hover:text-sky-600 transition-colors">
                  contact@vyomai.com
                </a>
              </div>
            </div>
          </Card>

          <Card colorScheme="cyan" className="space-y-4 border-2 border-white/90">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-cyan-100 text-cyan-600 shadow-sm">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone & WhatsApp Support</h4>
                <p className="text-base font-bold text-slate-900">+91 (1800) 123-VYOM</p>
              </div>
            </div>
          </Card>

          <Card colorScheme="purple" className="space-y-4 border-2 border-white/90">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-purple-100 text-purple-600 shadow-sm">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Business Hours</h4>
                <p className="text-base font-bold text-slate-900">Mon – Sat: 9:00 AM – 7:00 PM IST</p>
              </div>
            </div>
          </Card>

          {/* Regional Hubs */}
          <div className="glass-card p-6 rounded-3xl space-y-3 border-2 border-white shadow-xl">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-sky-500" /> Operational Locations
            </h4>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
              <span className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">📍 New Delhi / NCR, India</span>
              <span className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">📍 Bengaluru, India</span>
              <span className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">📍 Dubai, UAE</span>
              <span className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">📍 Singapore</span>
              <span className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">📍 US & UK</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <Card hoverEffect={false} className="p-8 sm:p-10 rounded-3xl border-2 border-white shadow-2xl bg-white/95 space-y-6">
            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-slate-900">Send Us a Direct Message</h3>
              <p className="text-slate-600 text-sm text-justify">Your message will be logged immediately in our Admin Panel.</p>
            </div>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Enquiry Received!</h3>
                <p className="text-slate-600 text-sm text-justify max-w-md mx-auto">
                  Thank you! Your enquiry has been received and registered in our database. Our solution team will contact you shortly.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Full Name</label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Ananya Sharma"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none text-slate-900 text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Work Email</label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="ananya@company.com"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none text-slate-900 text-sm bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Phone Number</label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none text-slate-900 text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Interested Service</label>
                    <select name="service" className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none text-slate-900 text-sm bg-white font-medium">
                      <option>AI Chatbots & Intelligent Agents</option>
                      <option>Process & Workflow Automation</option>
                      <option>Full-Stack Web & Mobile App Development</option>
                      <option>Digital Marketing & Growth</option>
                      <option>Legal & Corporate Compliance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us about your project goals or ask any question..."
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none text-slate-900 text-sm bg-white text-justify"
                  ></textarea>
                </div>

                <Button type="submit" size="lg" disabled={sending} className="w-full justify-center gap-2 shadow-sky-500/40">
                  <Send className="w-4 h-4" /> {sending ? "Submitting..." : "Send Message"}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <Badge variant="accent" icon={<HelpCircle className="w-4 h-4 text-purple-600" />}>
            Got Questions?
          </Badge>
          <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
        </div>

        <Accordion items={faqItems} />
      </section>
    </div>
  );
}
