import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "outline";
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = "primary", className, icon }) => {
  const variantStyles = {
    primary: "bg-sky-500/10 text-sky-900 border-sky-400/30",
    secondary: "bg-cyan-500/10 text-cyan-900 border-cyan-400/30",
    accent: "bg-purple-500/10 text-purple-900 border-purple-400/30",
    outline: "bg-white/60 text-slate-700 border-slate-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border shadow-sm backdrop-blur-sm",
        variantStyles[variant],
        className
      )}
    >
      {icon && <span className="text-sky-600">{icon}</span>}
      {children}
    </span>
  );
};
