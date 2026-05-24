import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "blue" | "purple" | "cyan" | "green" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
}: BadgeProps) {
  const variants = {
    default: "bg-surface-2 border-border text-text-secondary",
    blue: "bg-blue-500/10 border-blue-500/25 text-blue-400",
    purple: "bg-purple-500/10 border-purple-500/25 text-purple-400",
    cyan: "bg-cyan-500/10 border-cyan-500/25 text-cyan-400",
    green: "bg-emerald-500/10 border-emerald-500/25 text-emerald-400",
    outline: "bg-transparent border-border-light text-text-secondary",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-[11px]",
    md: "px-3 py-1 text-xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border font-mono-custom font-medium tracking-wide",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
