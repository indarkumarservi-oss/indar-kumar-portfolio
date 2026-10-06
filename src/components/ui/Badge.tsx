"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "destructive"
  size?: "sm" | "md" | "lg"
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center font-medium rounded-full transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          {
            "bg-primary/10 text-primary border border-primary/20": variant === "default",
            "bg-secondary text-secondary-foreground border border-border": variant === "secondary",
            "bg-transparent text-foreground border border-border": variant === "outline",
            "bg-green-500/10 text-green-400 border border-green-500/20": variant === "success",
            "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20": variant === "warning",
            "bg-destructive/10 text-destructive border border-destructive/20": variant === "destructive",
            "px-2 py-0.5 text-xs": size === "sm",
            "px-2.5 py-0.5 text-xs": size === "md",
            "px-3 py-1 text-sm": size === "lg",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge }