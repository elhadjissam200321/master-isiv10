"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const HERO_IMAGES = [
  "/images/hero/50026440483_14f41f4fb9_b.jpg",
  "/images/hero/50027015626_8909ffb5f5_b.jpg",
  "/images/hero/50027342156_2ef765f31f_b.jpg",
  "/images/hero/50033103667_44df2e79d0_b.jpg",
]

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length)
        setNextIndex((prev) => (prev + 1) % HERO_IMAGES.length)
        setIsTransitioning(false)
      }, 2000) // Transition duration matching CSS
    }, 6000) // Total time per image

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Current Image */}
      <div 
        className={cn(
          "absolute inset-0 w-full h-full transition-all duration-[2000ms] ease-in-out",
          isTransitioning ? "opacity-0 scale-110 blur-sm" : "opacity-30 scale-100 blur-0"
        )}
      >
        <Image
          src={HERO_IMAGES[currentIndex]}
          alt="Master ISI Hero"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Next Image (Pre-loading and fading in) */}
      <div 
        className={cn(
          "absolute inset-0 w-full h-full transition-all duration-[2000ms] ease-in-out",
          isTransitioning ? "opacity-30 scale-100 blur-0" : "opacity-0 scale-110 blur-sm"
        )}
      >
        <Image
          src={HERO_IMAGES[nextIndex]}
          alt="Master ISI Hero Next"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-primary/40 backdrop-brightness-75" />
    </div>
  )
}
