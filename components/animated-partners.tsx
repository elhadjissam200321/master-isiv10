"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

const INITIAL_PARTNERS = [
    { id: 1, name: "Partner 1" },
    { id: 2, name: "Partner 2" },
    { id: 3, name: "Partner 3" },
    { id: 4, name: "Partner 4" },
    { id: 5, name: "Partner 5" },
    { id: 6, name: "Partner 6" },
]

export default function AnimatedPartners() {
    const [partners, setPartners] = useState(INITIAL_PARTNERS)
    const [animatingIndices, setAnimatingIndices] = useState<number[]>([])
    const isSwappingRef = useRef(false)

    useEffect(() => {
        const swapTwoImages = () => {
            if (isSwappingRef.current) return
            isSwappingRef.current = true

            let i1 = Math.floor(Math.random() * partners.length)
            let i2 = Math.floor(Math.random() * partners.length)
            while (i2 === i1) i2 = Math.floor(Math.random() * partners.length)

            setAnimatingIndices([i1, i2])

            setTimeout(() => {
                setPartners((prev) => {
                    const next = [...prev]
                    const temp = next[i1]
                    next[i1] = next[i2]
                    next[i2] = temp
                    return next
                })
            }, 400)

            setTimeout(() => {
                setAnimatingIndices([])
                isSwappingRef.current = false
            }, 1000)
        }

        const interval = setInterval(swapTwoImages, 3000)
        return () => clearInterval(interval)
    }, [partners.length])

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {partners.map((p, idx) => (
                <div
                    key={p.id}
                    className="bg-card border border-border rounded-xl p-6 flex items-center justify-center hover:shadow-md hover:border-primary/30 transition-all aspect-[3/2] group overflow-hidden"
                >
                    <div
                        className={`relative w-full h-full flex items-center justify-center transition-all duration-500 ease-in-out ${animatingIndices.includes(idx)
                            ? "blur-md opacity-0 scale-95"
                            : "opacity-70 group-hover:opacity-100 scale-100"
                            }`}
                    >
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
                            <circle cx="50" cy="50" r="40" stroke="#20466A" strokeWidth="8" fill="none" />
                            <line x1="21.7" y1="21.7" x2="78.3" y2="78.3" stroke="#20466A" strokeWidth="8" />
                        </svg>
                    </div>
                </div>
            ))}
        </div>
    )
}
