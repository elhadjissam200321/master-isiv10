"use client"

import { useState, useEffect } from "react"
import { LayoutDashboard, Save, TrendingUp, Cpu, Award, Brain, Users, Globe } from "lucide-react"
import { ImageUpload } from "@/components/admin/image-upload"

interface HomepageData {
    hero: {
        badge: string;
        title: string;
        subtitle: string;
        description: string;
        cta_primary: string;
        cta_secondary: string;
        image: string;
    };
    stats: {
        label: string;
        value: string;
        icon: string;
    }[];
    pillars: {
        title: string;
        desc: string;
        icon: string;
        color: string;
    }[];
    why_isi: {
        badge: string;
        title: string;
        image: string;
        cta: string;
        points: { icon: string; text: string }[];
    };
    coordinator: {
        badge: string;
        name: string;
        title: string;
        message: string;
        initials: string;
    };
    alumni_section: {
        badge: string;
        title: string;
        description: string;
        cta: string;
    };
    partners_section: {
        badge: string;
        title: string;
        description: string;
    };
    pillars_section: {
        badge: string;
        title: string;
        description: string;
    };
    news_section: {
        badge: string;
        title: string;
        cta: string;
    };
    cta_band: {
        title: string;
        description: string;
        cta_primary: string;
        cta_secondary: string;
    };
}

export default function HomepageManager() {
    const [data, setData] = useState<HomepageData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/admin/homepage").then(res => res.json()).then(d => {
            setData(d)
            setLoading(false)
        })
    }, [])

    const handleSave = async () => {
        if (!data) return
        await fetch("/api/admin/homepage", {
            method: "POST",
            body: JSON.stringify(data)
        })
        alert("Modifications enregistrées !")
    }

    if (loading || !data) return <div className="p-8 text-slate-400 text-center">Chargement...</div>

    return (
        <div className="p-8 max-w-5xl mx-auto pb-24">
            <div className="flex justify-between items-center mb-8 sticky top-0 bg-slate-900/80 backdrop-blur-md z-30 py-4 border-b border-white/5">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <LayoutDashboard className="w-6 h-6 text-indigo-400" />
                        Contenu de l'Accueil
                    </h1>
                    <p className="text-slate-400 text-sm">Gérez toutes les sections de la page d'accueil.</p>
                </div>
                <button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition font-semibold shadow-lg shadow-indigo-600/20">
                    <Save className="w-4 h-4" /> Enregistrer tout
                </button>
            </div>

            <div className="space-y-12">
                {/* Hero Section */}
                <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-sm">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-700 pb-3">
                        <Cpu className="w-5 h-5 text-indigo-400" /> Section Hero (Entête)
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="md:col-span-2">
                            <ImageUpload
                                label="Image de fond (Hero)"
                                value={data.hero.image}
                                onChange={url => setData({ ...data, hero: { ...data.hero, image: url } })}
                            />
                        </div>
                        <div className="md:col-span-1">
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Badge (Texte supérieur)</label>
                            <input value={data.hero.badge} onChange={e => setData({ ...data, hero: { ...data.hero, badge: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Titre Principal</label>
                            <input value={data.hero.title} onChange={e => setData({ ...data, hero: { ...data.hero, title: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none text-lg font-bold" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Sous-titre / Slogan</label>
                            <input value={data.hero.subtitle} onChange={e => setData({ ...data, hero: { ...data.hero, subtitle: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Description Longue</label>
                            <textarea value={data.hero.description} onChange={e => setData({ ...data, hero: { ...data.hero, description: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none h-24 resize-none text-sm" />
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Label Bouton Principal</label>
                            <input value={data.hero.cta_primary} onChange={e => setData({ ...data, hero: { ...data.hero, cta_primary: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none" />
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Label Bouton Secondaire</label>
                            <input value={data.hero.cta_secondary} onChange={e => setData({ ...data, hero: { ...data.hero, cta_secondary: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none" />
                        </div>
                    </div>
                </section>

                {/* Why ISI Section */}
                <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-sm">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-700 pb-3">
                        <Award className="w-5 h-5 text-indigo-400" /> Section "Pourquoi nous choisir"
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="md:col-span-2">
                            <ImageUpload
                                label="Image Illustration (Pourquoi Choisir ISI)"
                                value={data.why_isi.image}
                                onChange={url => setData({ ...data, why_isi: { ...data.why_isi, image: url } })}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Badge</label>
                            <input value={data.why_isi.badge} onChange={e => setData({ ...data, why_isi: { ...data.why_isi, badge: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none" />
                        </div>
                        <div className="md:col-span-1">
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Titre de la section</label>
                            <input value={data.why_isi.title} onChange={e => setData({ ...data, why_isi: { ...data.why_isi, title: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none" />
                        </div>
                        <div className="md:col-span-2 space-y-4">
                            <label className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Points clés (3 points)</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {data.why_isi.points.map((p, i) => (
                                    <div key={i} className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                                        <input value={p.text} onChange={e => {
                                            const newPoints = [...data.why_isi.points]
                                            newPoints[i].text = e.target.value
                                            setData({ ...data, why_isi: { ...data.why_isi, points: newPoints } })
                                        }} className="w-full bg-transparent text-sm text-slate-300 outline-none h-12 resize-none" placeholder="Texte du point..." />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Coordinator Section */}
                <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-sm">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-700 pb-3">
                        <Users className="w-5 h-5 text-indigo-400" /> Mot du Coordonnateur
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Nom du Coordonnateur</label>
                            <input value={data.coordinator.name} onChange={e => setData({ ...data, coordinator: { ...data.coordinator, name: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none" />
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Initiales (Avatar)</label>
                            <input value={data.coordinator.initials} onChange={e => setData({ ...data, coordinator: { ...data.coordinator, initials: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Titre / Poste</label>
                            <input value={data.coordinator.title} onChange={e => setData({ ...data, coordinator: { ...data.coordinator, title: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Message (Citation)</label>
                            <textarea value={data.coordinator.message} onChange={e => setData({ ...data, coordinator: { ...data.coordinator, message: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none h-32 resize-none italic" />
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-sm">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-700 pb-3">
                        <TrendingUp className="w-5 h-5 text-indigo-400" /> Statistiques Clés
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {data.stats.map((s, i) => (
                            <div key={i} className="bg-slate-900 p-5 rounded-2xl border border-slate-700 shadow-inner">
                                <label className="text-[10px] text-slate-500 block mb-2 uppercase tracking-tighter">Statistique #{i + 1}</label>
                                <input value={s.value} onChange={e => {
                                    const newStats = [...data.stats]
                                    newStats[i].value = e.target.value
                                    setData({ ...data, stats: newStats })
                                }} className="bg-transparent border-b border-slate-700 w-full text-white font-serif text-2xl font-bold mb-3 focus:border-indigo-500 outline-none pb-1" />
                                <input value={s.label} onChange={e => {
                                    const newStats = [...data.stats]
                                    newStats[i].label = e.target.value
                                    setData({ ...data, stats: newStats })
                                }} className="bg-transparent text-slate-400 text-xs w-full outline-none font-medium uppercase tracking-wide" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Pillars Section */}
                <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-sm">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-700 pb-3">
                        <Brain className="w-5 h-5 text-indigo-400" /> Les 4 Piliers (Axes de formation)
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.pillars.map((p, i) => (
                            <div key={i} className="bg-slate-900 p-6 rounded-2xl border border-slate-700 shadow-inner">
                                <label className="text-[10px] text-slate-500 block mb-2 uppercase tracking-tighter">Axe #{i + 1}</label>
                                <input value={p.title} onChange={e => {
                                    const newPillars = [...data.pillars]
                                    newPillars[i].title = e.target.value
                                    setData({ ...data, pillars: newPillars })
                                }} className="bg-transparent text-white font-serif text-lg font-bold w-full mb-3 focus:border-indigo-500 outline-none" />
                                <textarea value={p.desc} onChange={e => {
                                    const newPillars = [...data.pillars]
                                    newPillars[i].desc = e.target.value
                                    setData({ ...data, pillars: newPillars })
                                }} className="bg-transparent text-slate-400 text-sm w-full outline-none h-24 resize-none leading-relaxed" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Pillars Section Meta */}
                <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-sm">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-700 pb-3">
                        <Brain className="w-5 h-5 text-indigo-400" /> Titres de la section "Domaines"
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Badge</label>
                            <input value={data.pillars_section?.badge || ""} onChange={e => setData({ ...data, pillars_section: { ...data.pillars_section, badge: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none" />
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Titre (Succède au nombre)</label>
                            <input value={data.pillars_section?.title || ""} onChange={e => setData({ ...data, pillars_section: { ...data.pillars_section, title: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Description</label>
                            <textarea value={data.pillars_section?.description || ""} onChange={e => setData({ ...data, pillars_section: { ...data.pillars_section, description: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none h-20 resize-none text-sm" />
                        </div>
                    </div>
                </section>

                {/* News Section Meta */}
                <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-sm">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-700 pb-3">
                        <TrendingUp className="w-5 h-5 text-indigo-400" /> Titres de la section "Actualités"
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Badge</label>
                            <input value={data.news_section?.badge || ""} onChange={e => setData({ ...data, news_section: { ...data.news_section, badge: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none" />
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Titre</label>
                            <input value={data.news_section?.title || ""} onChange={e => setData({ ...data, news_section: { ...data.news_section, title: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none" />
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Lien (Voir tout)</label>
                            <input value={data.news_section?.cta || ""} onChange={e => setData({ ...data, news_section: { ...data.news_section, cta: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none" />
                        </div>
                    </div>
                </section>

                {/* CTA Band Section */}
                <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-sm">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-700 pb-3">
                        <Globe className="w-5 h-5 text-indigo-400" /> Bandeau d'Appel à l'Action (Bas de page)
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Titre du bandeau</label>
                            <input value={data.cta_band.title} onChange={e => setData({ ...data, cta_band: { ...data.cta_band, title: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Description / Message</label>
                            <textarea value={data.cta_band.description} onChange={e => setData({ ...data, cta_band: { ...data.cta_band, description: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none h-20 resize-none text-sm" />
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Label Bouton Principal</label>
                            <input value={data.cta_band.cta_primary} onChange={e => setData({ ...data, cta_band: { ...data.cta_band, cta_primary: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none" />
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Label Bouton Secondaire</label>
                            <input value={data.cta_band.cta_secondary} onChange={e => setData({ ...data, cta_band: { ...data.cta_band, cta_secondary: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
