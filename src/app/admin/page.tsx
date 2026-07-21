"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  HelpCircle,
  Plus,
  Trash2,
  Eye,
  Filter,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Lock,
  LogOut,
  KeyRound,
  Mail,
  ShieldCheck,
  UserCheck,
  Globe,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Edit3,
  UploadCloud,
  ImageIcon
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export default function AdminDashboardPage() {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [currentAdmin, setCurrentAdmin] = useState<any | null>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Active View State
  const [activeNav, setActiveNav] = useState<"dashboard" | "enquiries" | "blogs" | "faqs">("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Enquiries State
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);
  const [enquiryFilter, setEnquiryFilter] = useState("all");

  // Blogs State
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [blogForm, setBlogForm] = useState({
    title: "",
    subtitle: "",
    category: "AI & Automation",
    author: "VyomAi Editorial",
    image: "/images/agency_hero_graphic.png",
    buttonText: "Read Article",
    tags: "AI, Automation, Tech",
    readTime: "5 min read",
    excerpt: "",
    content: "",
    isPublished: true,
  });
  const [imageMode, setImageMode] = useState<"file" | "url">("file");

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setBlogForm((prev) => ({ ...prev, image: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // FAQs State
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loadingFaqs, setLoadingFaqs] = useState(true);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [faqForm, setFaqForm] = useState({
    question: "",
    answer: "",
    category: "AI & Automation",
    order: 0,
    isPublished: true,
  });

  // Check Session
  const checkAuthSession = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const json = await res.json();
      if (json.success && json.authenticated) {
        setIsAuthenticated(true);
        setCurrentAdmin(json.admin);
        loadEnquiries();
        loadBlogs();
        loadFaqs();
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthSession();
  }, []);

  // Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const json = await res.json();

      if (json.success) {
        setIsAuthenticated(true);
        setCurrentAdmin(json.admin);
        if (json.token) {
          localStorage.setItem("admin_token", json.token);
        }
        loadEnquiries();
        loadBlogs();
        loadFaqs();
      } else {
        setLoginError(json.error || "Authentication failed.");
      }
    } catch (err) {
      setLoginError("Failed to connect to authentication server.");
    } finally {
      setLoggingIn(false);
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      localStorage.removeItem("admin_token");
      setIsAuthenticated(false);
      setCurrentAdmin(null);
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  // Load Enquiries
  const loadEnquiries = async () => {
    setLoadingEnquiries(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch("/api/enquiries", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const json = await res.json();
      if (json.success && json.data) {
        setEnquiries(json.data);
      }
    } catch (err) {
      console.error("Failed loading enquiries", err);
    } finally {
      setLoadingEnquiries(false);
    }
  };

  // Load Blogs
  const loadBlogs = async () => {
    setLoadingBlogs(true);
    try {
      const res = await fetch("/api/blogs?admin=true");
      const json = await res.json();
      if (json.success && json.data) {
        setBlogs(json.data);
      }
    } catch (err) {
      console.error("Failed loading blogs", err);
    } finally {
      setLoadingBlogs(false);
    }
  };

  // Load FAQs
  const loadFaqs = async () => {
    setLoadingFaqs(true);
    try {
      const res = await fetch("/api/faqs?admin=true");
      const json = await res.json();
      if (json.success && json.data) {
        setFaqs(json.data);
      }
    } catch (err) {
      console.error("Failed loading FAQs", err);
    } finally {
      setLoadingFaqs(false);
    }
  };

  // Update Enquiry Status
  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status } : e))
      );
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status });
      }
    } catch (err) {
      console.error("Failed status update", err);
    }
  };

  // Delete Enquiry
  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry(null);
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // Create Blog Post
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogForm),
      });
      const json = await res.json();
      if (json.success) {
        setIsBlogModalOpen(false);
        setBlogForm({
          title: "",
          subtitle: "",
          category: "AI & Automation",
          author: "VyomAi Editorial",
          image: "/images/agency_hero_graphic.png",
          buttonText: "Read Article",
          tags: "AI, Automation, Tech",
          readTime: "5 min read",
          excerpt: "",
          content: "",
          isPublished: true,
        });
        loadBlogs();
        alert("Blog article published successfully!");
      }
    } catch (err) {
      console.error("Failed creating blog", err);
    }
  };

  // Delete Blog
  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Delete blog failed", err);
    }
  };

  // Create or Update FAQ
  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingFaqId ? `/api/faqs/${editingFaqId}` : "/api/faqs";
      const method = editingFaqId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(faqForm),
      });
      const json = await res.json();
      if (json.success) {
        setIsFaqModalOpen(false);
        setEditingFaqId(null);
        setFaqForm({
          question: "",
          answer: "",
          category: "AI & Automation",
          order: 0,
          isPublished: true,
        });
        loadFaqs();
        alert(editingFaqId ? "FAQ updated successfully!" : "New FAQ created successfully!");
      }
    } catch (err) {
      console.error("Failed saving FAQ", err);
    }
  };

  // Open Edit FAQ Modal
  const handleEditFaqClick = (faq: any) => {
    setEditingFaqId(faq._id);
    setFaqForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || "AI & Automation",
      order: faq.order || 0,
      isPublished: faq.isPublished !== undefined ? faq.isPublished : true,
    });
    setIsFaqModalOpen(true);
  };

  // Delete FAQ
  const handleDeleteFaq = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      await fetch(`/api/faqs/${id}`, { method: "DELETE" });
      setFaqs((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error("Delete FAQ failed", err);
    }
  };

  const filteredEnquiries = enquiries.filter((e) =>
    enquiryFilter === "all" ? true : e.status === enquiryFilter
  );

  const newCount = enquiries.filter((e) => e.status === "new").length;
  const resolvedCount = enquiries.filter((e) => e.status === "resolved").length;

  // Render Session Loading State
  if (isAuthenticated === null) {
    return (
      <div className="py-32 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-slate-600 text-sm font-semibold">Verifying Admin Session...</p>
      </div>
    );
  }

  // Render Glassmorphic Login Form if Unauthenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen py-12 sm:py-24 max-w-md mx-auto px-4 flex flex-col justify-center">
        <Card hoverEffect={false} className="p-6 sm:p-10 rounded-3xl border-2 border-white shadow-2xl space-y-6 bg-white/95">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-gradient-to-tr from-sky-500 to-cyan-500 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md shadow-sky-500/30">
              <Lock className="w-7 h-7" />
            </div>
            <Badge variant="primary" icon={<ShieldCheck className="w-4 h-4 text-sky-600" />}>
              MongoDB Atlas Secured
            </Badge>
            <h1 className="text-2xl font-extrabold text-slate-900">Admin Portal Login</h1>
            <p className="text-xs text-slate-500 text-justify">
              Enter your registered administrator email and password to access customer enquiries and dynamic blog controls.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@vyomai.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none text-slate-900 text-sm bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none text-slate-900 text-sm bg-white"
                />
              </div>
            </div>

            <Button type="submit" size="lg" disabled={loggingIn} className="w-full justify-center shadow-sky-500/40">
              {loggingIn ? "Verifying Credentials..." : "Authenticate Admin Session"}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  // Render Full Responsive Sidebar Admin Layout
  return (
    <div className="min-h-screen flex bg-slate-100/80">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Responsive Sidebar Navigation Drawer */}
      <aside
        className={`fixed lg:sticky top-0 left-0 bottom-0 z-50 w-72 min-w-[280px] shrink-0 h-screen bg-slate-900 text-slate-300 p-5 sm:p-6 flex flex-col justify-between transition-transform duration-300 shadow-2xl overflow-y-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="space-y-6 sm:space-y-8">
          {/* Sidebar Brand Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 lg:border-none">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="relative w-9 h-9 shrink-0 rounded-xl overflow-hidden border border-sky-400/40">
                <Image src="/images/logo-vyom.jpeg" alt="VyomAi" fill className="object-cover" />
              </div>
              <div>
                <span className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-none">
                  Vyom<span className="text-sky-400">Ai</span> Admin
                </span>
                <span className="text-[9px] sm:text-[10px] block text-sky-400 font-bold tracking-wider uppercase mt-0.5">
                  Control Center
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 sm:space-y-2">
            {[
              { id: "dashboard", label: "Dashboard Overview", icon: <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" /> },
              {
                id: "enquiries",
                label: "Contact",
                icon: <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />,
                badge: newCount > 0 ? `${newCount} New` : undefined,
              },
              {
                id: "blogs",
                label: "Blog",
                icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />,
                badge: `${blogs.length}`,
              },
              {
                id: "faqs",
                label: "Faqs",
                icon: <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />,
                badge: `${faqs.length}`,
              },
            ].map((nav) => {
              const isActive = activeNav === nav.id;
              return (
                <button
                  key={nav.id}
                  onClick={() => {
                    setActiveNav(nav.id as any);
                    setSidebarOpen(false);
                  }}
                  className={`w-full px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-between cursor-pointer gap-2 ${
                    isActive
                      ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {nav.icon}
                    <span className="truncate text-left leading-tight">{nav.label}</span>
                  </div>
                  {nav.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 ${
                        isActive
                          ? "bg-white text-sky-700"
                          : nav.id === "enquiries" && newCount > 0
                          ? "bg-amber-500 text-slate-950"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {nav.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Live Website Link */}
          <div className="pt-4 border-t border-slate-800">
            <Link
              href="/"
              target="_blank"
              className="px-4 py-3 rounded-2xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-between group transition-colors"
            >
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-400 shrink-0" /> View Live Website
              </span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </Link>
          </div>
        </div>

        {/* Sidebar Footer User Info & Logout */}
        <div className="pt-6 border-t border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-sky-500 text-white flex items-center justify-center font-extrabold text-xs shrink-0">
              {currentAdmin?.name ? currentAdmin.name.charAt(0) : "A"}
            </div>
            <div className="overflow-hidden min-w-0">
              <div className="text-xs font-bold text-white truncate">{currentAdmin?.name || "Admin"}</div>
              <div className="text-[10px] text-slate-400 truncate">{currentAdmin?.email || "admin@vyomai.com"}</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border border-rose-500/20"
          >
            <LogOut className="w-4 h-4 shrink-0" /> Log Out Session
          </button>
        </div>
      </aside>

      {/* Main Right Content Panel */}
      <div className="flex-grow flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-3 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-sky-600 shrink-0"
              aria-label="Toggle Sidebar Menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 truncate">
              {activeNav === "dashboard" && "Dashboard Overview"}
              {activeNav === "enquiries" && "Contact"}
              {activeNav === "blogs" && "Blog"}
              {activeNav === "faqs" && "Faqs"}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={() => { loadEnquiries(); loadBlogs(); loadFaqs(); }} className="gap-1.5 text-xs px-3 py-1.5 sm:px-4 sm:py-2">
              <RefreshCw className="w-3.5 h-3.5 text-sky-600 shrink-0" /> <span className="hidden sm:inline">Refresh Data</span>
            </Button>
            {activeNav === "blogs" && (
              <Button size="sm" onClick={() => setIsBlogModalOpen(true)} className="gap-1.5 text-xs px-3 py-1.5 sm:px-4 sm:py-2 shadow-sky-500/30">
                <Plus className="w-3.5 h-3.5 shrink-0" /> <span className="hidden sm:inline">Create Blog</span><span className="sm:hidden">Create</span>
              </Button>
            )}
            {activeNav === "faqs" && (
              <Button size="sm" onClick={() => {
                setEditingFaqId(null);
                setFaqForm({ question: "", answer: "", category: "AI & Automation", order: 0, isPublished: true });
                setIsFaqModalOpen(true);
              }} className="gap-1.5 text-xs px-3 py-1.5 sm:px-4 sm:py-2 shadow-purple-500/30 bg-purple-600 hover:bg-purple-700">
                <Plus className="w-3.5 h-3.5 shrink-0" /> <span className="hidden sm:inline">Create FAQ</span><span className="sm:hidden">Create</span>
              </Button>
            )}
          </div>
        </header>

        {/* Dashboard Content Container */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 flex-grow">
          {/* VIEW 1: Dashboard Overview */}
          {activeNav === "dashboard" && (
            <div className="space-y-6 sm:space-y-8">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card hoverEffect colorScheme="sky" className="p-5 sm:p-6 space-y-1 bg-white">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Total Enquiries</span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">{enquiries.length}</div>
                </Card>

                <Card hoverEffect colorScheme="amber" className="p-5 sm:p-6 space-y-1 bg-white">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">New Leads</span>
                  <div className="text-2xl sm:text-3xl font-black text-amber-500">{newCount}</div>
                </Card>

                <Card hoverEffect colorScheme="purple" className="p-5 sm:p-6 space-y-1 bg-white">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Published Articles</span>
                  <div className="text-2xl sm:text-3xl font-black text-purple-600">{blogs.length}</div>
                </Card>

                <Card hoverEffect colorScheme="emerald" className="p-5 sm:p-6 space-y-1 bg-white">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Active FAQs</span>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-600">{faqs.length}</div>
                </Card>
              </div>

              {/* Recent Activity Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                {/* Recent Enquiries */}
                <div className="lg:col-span-6 glass-card rounded-3xl p-5 sm:p-6 border border-white space-y-4 bg-white/90">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-sky-500" /> Recent Submissions
                    </h3>
                    <button
                      onClick={() => setActiveNav("enquiries")}
                      className="text-xs font-bold text-sky-600 hover:underline flex items-center gap-1"
                    >
                      View All <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {enquiries.slice(0, 4).map((enq) => (
                      <div
                        key={enq._id}
                        onClick={() => setSelectedEnquiry(enq)}
                        className="p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50/60 border border-slate-200/60 transition-colors cursor-pointer flex items-center justify-between gap-2"
                      >
                        <div className="space-y-0.5 min-w-0">
                          <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">{enq.name}</div>
                          <div className="text-[11px] text-slate-500 truncate">{enq.service}</div>
                        </div>
                        <span
                          className={`px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                            enq.status === "new"
                              ? "bg-amber-100 text-amber-800"
                              : enq.status === "reviewed"
                              ? "bg-sky-100 text-sky-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {enq.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active FAQs Summary */}
                <div className="lg:col-span-6 glass-card rounded-3xl p-5 sm:p-6 border border-white space-y-4 bg-white/90">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-emerald-600" /> Dynamic Service FAQs
                    </h3>
                    <button
                      onClick={() => setActiveNav("faqs")}
                      className="text-xs font-bold text-sky-600 hover:underline flex items-center gap-1"
                    >
                      Manage FAQs <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {faqs.slice(0, 4).map((f) => (
                      <div key={f._id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1">
                        <div className="text-xs font-bold text-slate-900 line-clamp-1">{f.question}</div>
                        <div className="text-[10px] text-slate-500 flex items-center justify-between">
                          <span className="font-semibold text-sky-600">{f.category}</span>
                          <span>{f.isPublished ? "Published" : "Draft"}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: Enquiries Management View */}
          {activeNav === "enquiries" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-slate-600">
                  <Filter className="w-4 h-4 text-sky-500 shrink-0" /> Filter:
                  {["all", "new", "reviewed", "resolved"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setEnquiryFilter(st)}
                      className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition-all border cursor-pointer ${
                        enquiryFilter === st
                          ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {loadingEnquiries ? (
                <div className="py-12 text-center text-slate-500 font-medium">Loading enquiries...</div>
              ) : filteredEnquiries.length === 0 ? (
                <div className="glass-card rounded-3xl p-8 text-center space-y-2 bg-white">
                  <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">No Enquiries Found</h4>
                  <p className="text-xs text-slate-500">No submission records match the selected status filter.</p>
                </div>
              ) : (
                <div className="glass-card rounded-3xl overflow-hidden border border-white shadow-xl bg-white">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm text-slate-700 min-w-[600px]">
                      <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
                        <tr>
                          <th className="p-4">Contact</th>
                          <th className="p-4">Service</th>
                          <th className="p-4">Date</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/60 bg-white">
                        {filteredEnquiries.map((enq) => (
                          <tr key={enq._id} className="hover:bg-sky-50/50 transition-colors">
                            <td className="p-4">
                              <div className="font-bold text-slate-900">{enq.name}</div>
                              <div className="text-xs text-slate-500">{enq.email}</div>
                            </td>
                            <td className="p-4 font-semibold text-slate-800">{enq.service}</td>
                            <td className="p-4 text-xs text-slate-500 font-medium">
                              {new Date(enq.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-4">
                              <select
                                value={enq.status}
                                onChange={(e) => handleUpdateStatus(enq._id, e.target.value)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold border outline-none cursor-pointer ${
                                  enq.status === "new"
                                    ? "bg-amber-100 text-amber-800 border-amber-300"
                                    : enq.status === "reviewed"
                                    ? "bg-sky-100 text-sky-800 border-sky-300"
                                    : "bg-emerald-100 text-emerald-800 border-emerald-300"
                                }`}
                              >
                                <option value="new">New</option>
                                <option value="reviewed">Reviewed</option>
                                <option value="resolved">Resolved</option>
                              </select>
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => setSelectedEnquiry(enq)}
                                className="p-2 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-600 transition-colors cursor-pointer"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteEnquiry(enq._id)}
                                className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIEW 3: Blog Management View */}
          {activeNav === "blogs" && (
            <div className="space-y-6">
              {loadingBlogs ? (
                <div className="py-12 text-center text-slate-500 font-medium">Loading articles...</div>
              ) : blogs.length === 0 ? (
                <div className="glass-card rounded-3xl p-8 text-center space-y-3 bg-white">
                  <FileText className="w-8 h-8 text-slate-400 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">No Articles Yet</h4>
                  <Button size="sm" onClick={() => setIsBlogModalOpen(true)}>Create First Blog Post</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogs.map((b) => (
                    <Card key={b._id} hoverEffect className="space-y-4 border-2 border-white/90 bg-white p-5 sm:p-6">
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant={b.isPublished ? "primary" : "outline"}>
                          {b.isPublished ? "Published" : "Draft"}
                        </Badge>
                        <span className="text-xs text-slate-500 font-bold">{b.category}</span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">{b.title}</h3>
                        {b.subtitle && (
                          <p className="text-xs font-semibold text-sky-600 line-clamp-1">{b.subtitle}</p>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 text-justify">{b.excerpt}</p>

                      {b.tags && (
                        <div className="flex flex-wrap gap-1">
                          {(Array.isArray(b.tags) ? b.tags : [b.tags]).map((t: string, i: number) => (
                            <span key={i} className="text-[9px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700">
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">{b.readTime || "5 min read"}</span>
                        <div className="flex items-center gap-2">
                          <Link href={`/blog/${b.slug}`} target="_blank" className="text-sky-600 font-bold hover:underline">
                            Preview Post
                          </Link>
                          <button
                            onClick={() => handleDeleteBlog(b._id)}
                            className="p-1.5 rounded bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* VIEW 4: FAQ Management View */}
          {activeNav === "faqs" && (
            <div className="space-y-6">
              {loadingFaqs ? (
                <div className="py-12 text-center text-slate-500 font-medium">Loading FAQs...</div>
              ) : faqs.length === 0 ? (
                <div className="glass-card rounded-3xl p-8 text-center space-y-3 bg-white">
                  <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">No FAQs Found</h4>
                  <Button size="sm" onClick={() => {
                    setEditingFaqId(null);
                    setFaqForm({ question: "", answer: "", category: "AI & Automation", order: 0, isPublished: true });
                    setIsFaqModalOpen(true);
                  }}>Create First FAQ</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {faqs.map((f) => (
                    <Card key={f._id} hoverEffect className="p-5 sm:p-6 space-y-3 bg-white border-2 border-white/90">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant={f.isPublished ? "primary" : "outline"}>
                            {f.isPublished ? "Published" : "Draft"}
                          </Badge>
                          <span className="text-xs font-bold text-sky-600 px-2.5 py-0.5 rounded-full bg-sky-50">
                            {f.category}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditFaqClick(f)}
                            className="p-1.5 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteFaq(f._id)}
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-slate-900">{f.question}</h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-justify">{f.answer}</p>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Enquiry Details Modal */}
      <Modal isOpen={!!selectedEnquiry} onClose={() => setSelectedEnquiry(null)} title="Enquiry Details">
        {selectedEnquiry && (
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50">
              <div>
                <span className="font-bold text-slate-500 block text-xs">Name</span>
                <span className="font-bold text-slate-900">{selectedEnquiry.name}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-xs">Email</span>
                <a href={`mailto:${selectedEnquiry.email}`} className="font-bold text-sky-600 hover:underline">
                  {selectedEnquiry.email}
                </a>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-xs">Phone</span>
                <span className="font-bold text-slate-900">{selectedEnquiry.phone || "N/A"}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-xs">Service Requested</span>
                <span className="font-bold text-slate-900">{selectedEnquiry.service}</span>
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-500 block text-xs mb-1">Message Content</span>
              <p className="p-4 rounded-xl bg-white border text-slate-800 leading-relaxed text-justify">
                {selectedEnquiry.message}
              </p>
            </div>

            <div className="pt-4 border-t flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedEnquiry(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Create Blog Post Modal */}
      <Modal isOpen={isBlogModalOpen} onClose={() => setIsBlogModalOpen(false)} title="Publish New Blog Article">
        <form onSubmit={handleCreateBlog} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Article Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Next-Gen Enterprise AI Architectures"
              value={blogForm.title}
              onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Subtitle / Tagline</label>
            <input
              type="text"
              placeholder="A brief tagline summarizing the main takeaway..."
              value={blogForm.subtitle}
              onChange={(e) => setBlogForm({ ...blogForm, subtitle: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border text-sm bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Category</label>
              <select
                value={blogForm.category}
                onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border text-sm bg-white font-medium"
              >
                <option>AI & Automation</option>
                <option>Tech & Architecture</option>
                <option>Legal & Growth</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Read Time</label>
              <input
                type="text"
                value={blogForm.readTime}
                onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border text-sm bg-white"
              />
            </div>
          </div>

          {/* Cover Image Uploader & Live Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase text-slate-700">Article Cover Image</label>
              <div className="flex items-center gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => setImageMode("file")}
                  className={`font-bold transition-colors cursor-pointer ${imageMode === "file" ? "text-sky-600 underline" : "text-slate-400"}`}
                >
                  Upload File
                </button>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={() => setImageMode("url")}
                  className={`font-bold transition-colors cursor-pointer ${imageMode === "url" ? "text-sky-600 underline" : "text-slate-400"}`}
                >
                  Paste URL
                </button>
              </div>
            </div>

            {imageMode === "file" ? (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileUpload}
                  id="blog-image-input"
                  className="hidden"
                />
                <label
                  htmlFor="blog-image-input"
                  className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-sky-300 hover:border-sky-500 rounded-2xl bg-sky-50/50 hover:bg-sky-50 transition-all cursor-pointer text-center"
                >
                  <UploadCloud className="w-6 h-6 text-sky-600 mb-1" />
                  <span className="text-xs font-bold text-slate-900">Click to upload image file from computer</span>
                  <span className="text-[10px] text-slate-500">Supports PNG, JPG, WEBP, SVG</span>
                </label>
              </div>
            ) : (
              <input
                type="text"
                placeholder="https://images.unsplash.com/photo..."
                value={blogForm.image}
                onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border text-sm bg-white"
              />
            )}

            {/* Live Thumbnail Preview */}
            {blogForm.image && (
              <div className="flex items-center gap-3 p-2 rounded-xl border bg-slate-50">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                  <Image src={blogForm.image} alt="Preview" fill className="object-cover" />
                </div>
                <div className="overflow-hidden min-w-0">
                  <span className="text-xs font-bold text-slate-900 block truncate">Cover Image Selected</span>
                  <span className="text-[10px] text-slate-500 block truncate">{blogForm.image.slice(0, 45)}...</span>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">CTA Button Text</label>
            <input
              type="text"
              placeholder="Read Article"
              value={blogForm.buttonText}
              onChange={(e) => setBlogForm({ ...blogForm, buttonText: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Tags (Comma Separated)</label>
            <input
              type="text"
              placeholder="e.g. AI Agents, LLM, Next.js, Automation"
              value={blogForm.tags}
              onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Short Excerpt</label>
            <textarea
              rows={2}
              required
              placeholder="A 2-sentence summary of the article..."
              value={blogForm.excerpt}
              onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border text-sm bg-white text-justify"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Full Article Content (Markdown/Text)</label>
            <textarea
              rows={6}
              required
              placeholder="Write the full article body..."
              value={blogForm.content}
              onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border text-sm bg-white text-justify font-mono"
            ></textarea>
          </div>

          <Button type="submit" className="w-full justify-center shadow-sky-500/30">
            Publish Article
          </Button>
        </form>
      </Modal>

      {/* Create / Edit FAQ Modal */}
      <Modal
        isOpen={isFaqModalOpen}
        onClose={() => {
          setIsFaqModalOpen(false);
          setEditingFaqId(null);
        }}
        title={editingFaqId ? "Edit FAQ Item" : "Create New FAQ Item"}
      >
        <form onSubmit={handleSaveFaq} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Question</label>
            <input
              type="text"
              required
              placeholder="e.g. What custom AI models do you support?"
              value={faqForm.question}
              onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Answer</label>
            <textarea
              rows={4}
              required
              placeholder="Provide a clear, detailed answer..."
              value={faqForm.answer}
              onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border text-sm bg-white text-justify"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Category</label>
              <select
                value={faqForm.category}
                onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border text-sm bg-white font-medium"
              >
                <option>AI & Automation</option>
                <option>Web & Mobile</option>
                <option>Legal & Corporate</option>
                <option>Marketing & Growth</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Display Order</label>
              <input
                type="number"
                value={faqForm.order}
                onChange={(e) => setFaqForm({ ...faqForm, order: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border text-sm bg-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isPublishedFaq"
              checked={faqForm.isPublished}
              onChange={(e) => setFaqForm({ ...faqForm, isPublished: e.target.checked })}
              className="w-4 h-4 text-sky-600 rounded cursor-pointer"
            />
            <label htmlFor="isPublishedFaq" className="text-xs font-bold text-slate-800 cursor-pointer">
              Publish immediately on website
            </label>
          </div>

          <Button type="submit" className="w-full justify-center shadow-purple-500/30 bg-purple-600 hover:bg-purple-700">
            {editingFaqId ? "Save FAQ Changes" : "Create FAQ"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
