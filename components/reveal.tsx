"use client"

import { useEffect, useRef, useState } from "react"

interface RevealProps {
    children: React.ReactNode
    className?: string
    delay?: number
    direction?: "up" | "left" | "right" | "none"
}

export function Reveal({ children, className = "", delay = 0, direction = "up" }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.12 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    const translate = {
        up: visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        left: visible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0",
        right: visible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0",
        none: visible ? "opacity-100" : "opacity-0",
    }[direction]

    return (
        <div
            ref={ref}
            className={`transition-all ease-out ${translate} ${className}`}
            style={{ transitionDuration: "600ms", transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    )
}

// Grid of children that stagger their reveal
export function RevealGrid({ children, className = "", stagger = 80 }: { children: React.ReactNode[]; className?: string; stagger?: number }) {
    return (
        <div className={className}>
            {children.map((child, i) => (
                <Reveal key={i} delay={i * stagger} direction="up">
                    {child}
                </Reveal>
            ))}
        </div>
    )
}
