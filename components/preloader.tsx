"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function Preloader() {
  const [loading, setLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => setLoading(false), 500)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500",
        fadeOut && "opacity-0 pointer-events-none"
      )}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated neural network logo */}
        <div className="relative w-20 h-20">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse" />

          {/* Spinning ring */}
          <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '3s' }}>
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="60 140"
              className="text-primary"
            />
          </svg>

          {/* Center favicon icon */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="animate-pulse">
              <Image
                src="/favicon.png"
                alt="Loading Logo"
                width={80}
                height={80}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Floating particles */}
          <div className="absolute -top-1 left-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="absolute top-1/2 -right-1 w-1 h-1 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          <div className="absolute top-1/2 -left-1 w-1 h-1 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.6s' }} />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-lg font-bold text-primary tracking-wide">Master ISI</span>
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Chargement...</span>
        </div>
      </div>
    </div>
  )
}
