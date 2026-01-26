"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface GlassButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: "dark" | "light";
}

export default function GlassButton({ 
  href, 
  children, 
  className = "", 
  style = {},
  variant = "dark" 
}: GlassButtonProps) {
  const baseStyles = variant === "dark" 
    ? {
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      }
    : {
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
      };

  const hoverStyles = variant === "dark"
    ? {
        background: 'rgba(0, 0, 0, 0.75)',
        borderColor: 'rgba(255, 255, 255, 0.15)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
      }
    : {
        background: 'rgba(255, 255, 255, 0.95)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
      };

  return (
    <Link
      href={href}
      className={className}
      style={{ ...baseStyles, ...style }}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, hoverStyles);
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, baseStyles);
      }}
    >
      {children}
    </Link>
  );
}
