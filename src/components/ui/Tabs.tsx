"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className }) => {
  return (
    <div className={cn("inline-flex p-1.5 gap-1.5 rounded-2xl glass-card backdrop-blur-xl border border-white/80 shadow-inner flex-wrap justify-center", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 z-10 cursor-pointer",
              isActive ? "text-slate-900 shadow-md" : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabBackground"
                className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-200/50 -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {tab.icon && <span className={cn(isActive ? "text-sky-600" : "text-slate-400")}>{tab.icon}</span>}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
