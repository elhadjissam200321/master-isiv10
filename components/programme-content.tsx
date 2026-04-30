"use client"

import { useState } from "react"
import {
    ChevronRight, Clock, Award, BookOpen, Users, GraduationCap,
    Globe, Cpu, Database, Brain, Network, Code, Shield, Cloud, BarChart, Star
} from "lucide-react"

const ICON_MAP: Record<string, any> = {
    Clock, Award, BookOpen, Users, GraduationCap, Globe,
    Cpu, Database, Brain, Network, Code, Shield, Cloud, BarChart, Star
}

export default function ProgrammeContent({ data }: { data: any }) {
    const [selectedSemester, setSelectedSemester] = useState<string>("s1")
    const [selectedOption, setSelectedOption] = useState("crs")

    const semesterKeys = Object.keys(data.semesterModules)
    const currentSemester = data.semesterModules[selectedSemester]

    return (
        <>
            {/* Quick info */}
            <section className="py-10 bg-secondary border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-8 justify-center md:justify-start">
                        {data.quickInfo.map((item: any) => {
                            const Icon = ICON_MAP[item.icon] || Award
                            return (
                                <div key={item.label} className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                        <Icon className="w-4.5 h-4.5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-muted-foreground font-serif uppercase tracking-wider font-bold">{item.label}</div>
                                        <div className="text-sm font-semibold text-foreground">{item.value}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Objectives */}
            <section className="py-16 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <span className="text-accent text-sm font-semibold uppercase tracking-widest">🔹 Compétences visées</span>
                            <h2 className="font-serif text-3xl font-bold text-foreground mt-2 mb-6">Objectifs de la formation</h2>
                            <ul className="space-y-3">
                                {data.objectives.map((obj: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                                            {i + 1}
                                        </span>
                                        <span className="text-sm text-foreground leading-relaxed">{obj}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <span className="text-accent text-sm font-semibold uppercase tracking-widest">🔹 Perspectives</span>
                            <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Débouchés professionnels</h2>
                            {data.careerOutcomes.map((d: any) => (
                                <div key={d.role} className="flex flex-col p-4 rounded-lg bg-secondary border border-border">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="font-bold text-sm text-foreground">{d.role}</div>
                                        <GraduationCap className="w-5 h-5 text-primary shrink-0" />
                                    </div>
                                    <div className="text-xs text-muted-foreground">{d.sectors}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Modules Section */}
            <section className="py-16 bg-secondary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <span className="text-accent text-sm font-semibold uppercase tracking-widest">Structure du programme</span>
                        <h2 className="font-serif text-3xl font-bold text-foreground mt-2">Modules par semestre</h2>
                        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Découvrez les modules enseignés durant les 4 semestres du Master ISI</p>
                    </div>

                    {/* Semester Tabs */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {semesterKeys.map((key) => (
                            <button
                                key={key}
                                onClick={() => setSelectedSemester(key)}
                                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${selectedSemester === key
                                    ? "bg-primary text-white shadow-lg"
                                    : "bg-card border border-border text-foreground hover:bg-background"
                                    }`}
                            >
                                {data.semesterModules[key].name}
                            </button>
                        ))}
                    </div>

                    {/* Selected Semester Content */}
                    {!currentSemester.options ? (
                        <div className="bg-card rounded-xl border border-border overflow-hidden">
                            <div className="bg-primary px-6 py-4">
                                <h3 className="text-xl font-bold text-white">{currentSemester.name}</h3>
                                <p className="text-white/70 text-sm">{currentSemester.description}</p>
                            </div>
                            <div className="p-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    {currentSemester.modules.map((mod: any, i: number) => {
                                        const Icon = ICON_MAP[mod.icon] || BookOpen
                                        return (
                                            <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-secondary border border-border">
                                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                                    <Icon className="w-5 h-5 text-primary" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-bold text-foreground font-serif">{mod.name}</div>
                                                    <div className="text-sm text-muted-foreground">{mod.prof}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* S3 with Options (Restored) */
                        <div className="space-y-6">
                            {/* Option Tabs */}
                            <div className="flex flex-wrap justify-center gap-3">
                                {currentSemester.options.map((opt: any) => (
                                    <button
                                        key={opt.key}
                                        onClick={() => setSelectedOption(opt.key)}
                                        className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${selectedOption === opt.key
                                            ? `${opt.color} text-white shadow-lg`
                                            : "bg-card border border-border text-foreground hover:bg-background"
                                            }`}
                                    >
                                        {opt.name}
                                    </button>
                                ))}
                            </div>

                            {/* Selected Option Modules */}
                            {currentSemester.options.filter((o: any) => o.key === selectedOption).map((opt: any) => (
                                <div key={opt.key} className="bg-card rounded-xl border border-border overflow-hidden">
                                    <div className={`${opt.color} px-6 py-4`}>
                                        <h3 className="text-xl font-bold text-white">{opt.name}</h3>
                                        <p className="text-white/70 text-sm">Modules de spécialisation</p>
                                    </div>
                                    <div className="p-6">
                                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Modules spécialisés</h4>
                                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                                            {opt.modules.map((mod: any, i: number) => {
                                                const Icon = ICON_MAP[mod.icon] || BookOpen
                                                return (
                                                    <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-secondary border border-border">
                                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                                            <Icon className="w-5 h-5 text-primary" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-bold text-foreground font-serif">{mod.name}</div>
                                                            <div className="text-sm text-muted-foreground">{mod.prof}</div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Modules communs (toutes options)</h4>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {currentSemester.commonModules.map((mod: any, i: number) => {
                                                const Icon = ICON_MAP[mod.icon] || BookOpen
                                                return (
                                                    <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                                                        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
                                                            <Icon className="w-5 h-5 text-white" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-bold text-foreground font-serif">{mod.name}</div>
                                                            <div className="text-sm text-muted-foreground">{mod.prof}</div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

        </>
    )
}
