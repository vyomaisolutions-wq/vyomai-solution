"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", children, className, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
    
    const sizeStyles = {
      sm: "px-4 py-2 text-xs gap-1.5",
      md: "px-6 py-3 text-sm gap-2",
      lg: "px-8 py-4 text-base gap-2.5",
    };

    const variantStyles = {
      primary: "bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-700 text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:brightness-105 active:scale-95",
      secondary: "bg-slate-900 text-white hover:bg-slate-800 shadow-md active:scale-95",
      outline: "border-2 border-sky-500/30 text-sky-900 hover:bg-sky-50 hover:border-sky-500 active:scale-95",
      ghost: "text-slate-700 hover:bg-sky-100/50 hover:text-sky-900 active:scale-95",
      glass: "bg-white/70 backdrop-blur-md border border-white/80 text-slate-900 shadow-md hover:bg-white/90 active:scale-95",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
