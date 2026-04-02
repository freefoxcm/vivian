"use client";

import { type ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function GradientButton({
  children,
  className,
  ...props
}: GradientButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "h-12 w-full cursor-pointer rounded-lg",
        "bg-[#3d5c4a] text-[#f5f0e8] font-semibold",
        "transition-all duration-200 ease-out",
        "hover:bg-[#4a6d58]",
        "active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5f0e8]/50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
