import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Globe, Sparkles, Heart } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-slate-900 text-slate-300 pt-16 pb-12 overflow-hidden border-t border-sky-900/30">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-sky-400/40">
                <Image
                  src="/images/logo-vyom.jpeg"
                  alt="VyomAi Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                Vyom<span className="text-sky-400">Ai</span> Solutions
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Empowering global enterprises with cutting-edge AI Agent automation, custom Web & Mobile platforms, data-driven marketing, and legal corporate compliance services.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="primary" className="bg-sky-950/60 text-sky-300 border-sky-700/50">
                <Globe className="w-3 h-3 mr-1" /> Global Services
              </Badge>
              <Badge variant="secondary" className="bg-cyan-950/60 text-cyan-300 border-cyan-700/50">
                <Sparkles className="w-3 h-3 mr-1" /> AI First
              </Badge>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base tracking-wider uppercase text-xs text-sky-400">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-sky-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-sky-400 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-sky-400 transition-colors">Our Services</Link></li>
              <li><Link href="/technologies" className="hover:text-sky-400 transition-colors">Technologies</Link></li>
              <li><Link href="/industries" className="hover:text-sky-400 transition-colors">Industries</Link></li>
              <li><Link href="/portfolio" className="hover:text-sky-400 transition-colors">Portfolio</Link></li>
              <li><Link href="/contact" className="hover:text-sky-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base tracking-wider uppercase text-xs text-sky-400">
              Solutions
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>AI Chatbots & Agents</li>
              <li>Workflow Automation</li>
              <li>Full-Stack Web Dev</li>
              <li>Mobile App Engineering</li>
              <li>Digital Marketing & Growth</li>
              <li>Legal Corporate Services</li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base tracking-wider uppercase text-xs text-sky-400">
              Global Presence
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-1" />
                <span>Serving Clients in India, USA, UAE, UK, Singapore, Canada, Australia & Europe</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="mailto:contact@vyomai.com" className="hover:text-white transition-colors">contact@vyomai.com</a>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>+91 (1800) 123-VYOM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} VyomAi Solutions Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-1" /> Next.js & Framer Motion
          </div>
        </div>
      </div>
    </footer>
  );
};
