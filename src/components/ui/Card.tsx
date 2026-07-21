"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

export interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  colorScheme?: "sky" | "cyan" | "purple" | "emerald" | "amber" | "slate";
}

export const Card = ({
  children,
  className,
  hoverEffect = true,
  colorScheme = "sky",
  ...props
}: CardProps) => {
  const schemeBorders = {
    sky: "hover:border-sky-400/80 hover:shadow-sky-500/20",
    cyan: "hover:border-cyan-400/80 hover:shadow-cyan-500/20",
    purple: "hover:border-purple-400/80 hover:shadow-purple-500/20",
    emerald: "hover:border-emerald-400/80 hover:shadow-emerald-500/20",
    amber: "hover:border-amber-400/80 hover:shadow-amber-500/20",
    slate: "hover:border-slate-400/80 hover:shadow-slate-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={
        hoverEffect
          ? {
              y: -8,
              scale: 1.015,
              transition: { duration: 0.25, ease: "easeInOut" },
            }
          : undefined
      }
      className={cn(
        "glass-card rounded-3xl p-6 sm:p-8 transition-all duration-300 relative overflow-hidden group shadow-lg shadow-sky-900/5 border border-sky-200/70 bg-white/90",
        hoverEffect && `hover:shadow-2xl ${schemeBorders[colorScheme]}`,
        className
      )}
      {...props}
    >
      {/* Light shimmer line effect */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
