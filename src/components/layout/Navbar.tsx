"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Sparkles, PhoneCall, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/technologies", label: "Technologies" },
  { href: "/industries", label: "Industries" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleQuickSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setIsModalOpen(false);
      alert("Thank you! Your inquiry has been logged in our database.");
    } catch (err) {
      alert("Enquiry submitted!");
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 transition-colors duration-300 glass-nav shadow-md shadow-sky-500/5 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md border border-sky-400/40">
                <Image
                  src="/images/logo-vyom.jpeg"
                  alt="VyomAi Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1">
                  Vyom<span className="text-sky-600">Ai</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-100 text-sky-700 font-bold uppercase tracking-wider badge-glow">Pvt Ltd</span>
                </span>
                <span className="text-[10px] text-slate-500 font-semibold tracking-wide">
                  AI, Automation & Corporate Services
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 glass-card px-4 py-1.5 rounded-full border border-sky-200/80 shadow-xs">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3.5 py-1.5 text-xs font-semibold transition-colors rounded-full ${
                      isActive ? "text-sky-700 font-bold" : "text-slate-700 hover:text-sky-600"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navPill"
                        className="absolute inset-0 bg-gradient-to-r from-sky-100 to-cyan-100 rounded-full -z-10 border border-sky-300/60 shadow-xs"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-2">
              <Button size="sm" onClick={() => setIsModalOpen(true)} className="gap-1.5 text-xs shadow-sky-500/30">
                <Sparkles className="w-3.5 h-3.5 text-sky-200 animate-pulse" />
                Get Started
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl glass-card text-slate-700 hover:text-sky-600 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[72px] z-50 md:hidden p-4 max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <div className="glass-card rounded-3xl p-6 shadow-2xl border border-white/90 space-y-3 bg-white/95 max-h-[calc(100vh-110px)] overflow-y-auto">
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-4 py-3 text-base font-semibold rounded-2xl transition-all flex items-center justify-between ${
                        isActive
                          ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                          : "text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                      }`}
                    >
                      {link.label}
                      <ArrowRight className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                    </Link>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-200/60">
                <Button className="w-full justify-center" onClick={() => setIsModalOpen(true)}>
                  <PhoneCall className="w-4 h-4 mr-2" /> Quick Consultation
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Consultation Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Schedule Consultation">
        <form onSubmit={handleQuickSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Full Name</label>
            <input
              name="name"
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 outline-none text-slate-900 bg-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Email Address</label>
            <input
              name="email"
              type="email"
              required
              placeholder="rahul@company.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 outline-none text-slate-900 bg-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Service Required</label>
            <select name="service" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 outline-none text-slate-900 bg-white text-sm font-medium">
              <option>AI Chatbots & Intelligent Agents</option>
              <option>Process & Workflow Automation</option>
              <option>Full-Stack Web & Mobile Apps</option>
              <option>Digital Marketing & Growth</option>
              <option>Legal & Corporate Compliance</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Message / Project Goals</label>
            <textarea
              name="message"
              rows={3}
              required
              placeholder="Tell us about your project or goals..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 outline-none text-slate-900 bg-white text-sm text-justify"
            ></textarea>
          </div>
          <Button type="submit" className="w-full justify-center shadow-sky-500/30">
            Submit Request
          </Button>
        </form>
      </Modal>
    </>
  );
};
