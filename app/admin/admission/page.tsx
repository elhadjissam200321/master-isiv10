"use client"

import { useState, useEffect } from "react"
import { LayoutDashboard, Save, AlertCircle, CheckCircle, Calendar, MessageSquare, FileText, Plus, Trash2 } from "lucide-react"

interface AdmissionData {
    hero: {
        title: string;
        subtitle: string;
        breadcrumb: string;
    };
    alert: {
        title: string;
        text: string;
        deadline: string;
    };
    conditions: string[];
    docs: { icon: string; label: string }[];
    timeline: { period: string; step: string; status: string }[];
    faq: { q: string; a: string }[];
    cta: { title: string; subtitle: string };
}

export default function AdmissionManager() {
    const [data, setData] = useState<AdmissionData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/admin/admission").then(res => res.json()).then(d => {
            setData(d)
            setLoading(false)
        })
    }, [])

    const handleSave = async () => {
        if (!data) return
        await fetch("/api/admin/admission", {
            method: "POST",
            body: JSON.stringify(data)
        })
        alert("Modifications enregistrées !")
    }

    if (loading || !data) return <div className="p-8 text-slate-400 text-center">Chargement...</div>

    return (
        <div className="p-8 max-w-5xl mx-auto pb-24 text-slate-200">
            <div className="flex justify-between items-center mb-8 sticky top-0 bg-slate-900/80 backdrop-blur-md z-30 py-4 border-b border-white/5">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <LayoutDashboard className="w-6 h-6 text-indigo-400" />
                        Gestion de l'Admission
                    </h1>
                    <p className="text-slate-400 text-sm">Modifiez les conditions, le calendrier et la FAQ.</p>
                </div>
                <button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition font-semibold shadow-lg shadow-indigo-600/20">
                    <Save className="w-4 h-4" /> Enregistrer tout
                </button>
            </div>

            <div className="space-y-12">
                {/* Hero & Alert */}
                <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-sm">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-700 pb-3">
                        <AlertCircle className="w-5 h-5 text-indigo-400" /> Entête & Alerte
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Titre de la page</label>
                            <input value={data.hero.title} onChange={e => setData({ ...data, hero: { ...data.hero, title: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Sous-titre Hero</label>
                            <textarea value={data.hero.subtitle} onChange={e => setData({ ...data, hero: { ...data.hero, subtitle: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none h-20 resize-none" />
                        </div>
                        <div className="border-t border-slate-700 md:col-span-2 pt-6 mt-2">
                            <h3 className="text-sm font-bold text-slate-300 mb-4">Bandeau d'alerte (Date limite)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-[10px] text-slate-500 block mb-1 uppercase">Préfixe (ex: Date limite...)</label>
                                    <input value={data.alert.title} onChange={e => setData({ ...data, alert: { ...data.alert, title: e.target.value } })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-indigo-500 transition outline-none text-sm" />
                                </div>
                                <div>
                                    <label className="text-[10px] text-slate-500 block mb-1 uppercase">Date (ex: 30 juin 2025)</label>
                                    <input value={data.alert.deadline} onChange={e => setData({ ...data, alert: { ...data.alert, deadline: e.target.value } })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-indigo-500 transition outline-none text-sm" />
                                </div>
                                <div>
                                    <label className="text-[10px] text-slate-500 block mb-1 uppercase">Complément (ex: Dépôt requis...)</label>
                                    <input value={data.alert.text} onChange={e => setData({ ...data, alert: { ...data.alert, text: e.target.value } })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-indigo-500 transition outline-none text-sm" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Conditions */}
                <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-sm">
                    <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-3">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-indigo-400" /> Conditions d'accès
                        </h2>
                        <button
                            onClick={() => setData({ ...data, conditions: [...data.conditions, "Nouvelle condition..."] })}
                            className="text-indigo-400 hover:text-indigo-300 text-xs font-bold flex items-center gap-1"
                        >
                            <Plus className="w-3 h-3" /> Ajouter
                        </button>
                    </div>
                    <div className="space-y-3">
                        {data.conditions.map((c, i) => (
                            <div key={i} className="flex gap-2">
                                <input
                                    value={c}
                                    onChange={e => {
                                        const next = [...data.conditions]
                                        next[i] = e.target.value
                                        setData({ ...data, conditions: next })
                                    }}
                                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-indigo-500 transition outline-none text-sm"
                                />
                                <button
                                    onClick={() => setData({ ...data, conditions: data.conditions.filter((_, idx) => idx !== i) })}
                                    className="p-2 text-slate-500 hover:text-red-400 transition"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Documents */}
                <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-sm">
                    <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-3">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <FileText className="w-5 h-5 text-indigo-400" /> Documents requis
                        </h2>
                        <button
                            onClick={() => setData({ ...data, docs: [...data.docs, { icon: "FileText", label: "Nouveau document..." }] })}
                            className="text-indigo-400 hover:text-indigo-300 text-xs font-bold flex items-center gap-1"
                        >
                            <Plus className="w-3 h-3" /> Ajouter
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.docs.map((d, i) => (
                            <div key={i} className="flex gap-2 bg-slate-900 p-3 rounded-xl border border-slate-700">
                                <input
                                    value={d.label}
                                    onChange={e => {
                                        const next = [...data.docs]
                                        next[i].label = e.target.value
                                        setData({ ...data, docs: next })
                                    }}
                                    className="flex-1 bg-transparent text-white outline-none text-sm"
                                />
                                <button
                                    onClick={() => setData({ ...data, docs: data.docs.filter((_, idx) => idx !== i) })}
                                    className="p-1 text-slate-500 hover:text-red-400 transition"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Timeline */}
                <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-sm">
                    <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-3">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-indigo-400" /> Calendrier de sélection
                        </h2>
                        <button
                            onClick={() => setData({ ...data, timeline: [...data.timeline, { period: "Date...", step: "Étape...", status: "upcoming" }] })}
                            className="text-indigo-400 hover:text-indigo-300 text-xs font-bold flex items-center gap-1"
                        >
                            <Plus className="w-3 h-3" /> Ajouter
                        </button>
                    </div>
                    <div className="space-y-4">
                        {data.timeline.map((t, i) => (
                            <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-900 p-4 rounded-xl border border-slate-700 items-center">
                                <input
                                    value={t.period}
                                    onChange={e => {
                                        const next = [...data.timeline]
                                        next[i].period = e.target.value
                                        setData({ ...data, timeline: next })
                                    }}
                                    className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                    placeholder="Période"
                                />
                                <input
                                    value={t.step}
                                    onChange={e => {
                                        const next = [...data.timeline]
                                        next[i].step = e.target.value
                                        setData({ ...data, timeline: next })
                                    }}
                                    className="md:col-span-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                                    placeholder="Étape"
                                />
                                <div className="flex gap-2">
                                    <select
                                        value={t.status}
                                        onChange={e => {
                                            const next = [...data.timeline]
                                            next[i].status = e.target.value
                                            setData({ ...data, timeline: next })
                                        }}
                                        className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-[10px] text-white outline-none"
                                    >
                                        <option value="past">Passé</option>
                                        <option value="current">En cours</option>
                                        <option value="upcoming">À venir</option>
                                    </select>
                                    <button
                                        onClick={() => setData({ ...data, timeline: data.timeline.filter((_, idx) => idx !== i) })}
                                        className="text-slate-500 hover:text-red-400 transition"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-sm">
                    <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-3">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-indigo-400" /> Questions Fréquentes (FAQ)
                        </h2>
                        <button
                            onClick={() => setData({ ...data, faq: [...data.faq, { q: "Nouvelle question ?", a: "Réponse..." }] })}
                            className="text-indigo-400 hover:text-indigo-300 text-xs font-bold flex items-center gap-1"
                        >
                            <Plus className="w-3 h-3" /> Ajouter
                        </button>
                    </div>
                    <div className="space-y-6">
                        {data.faq.map((item, i) => (
                            <div key={i} className="bg-slate-900 p-5 rounded-2xl border border-slate-700 relative group">
                                <button
                                    onClick={() => setData({ ...data, faq: data.faq.filter((_, idx) => idx !== i) })}
                                    className="absolute top-4 right-4 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] text-slate-500 block mb-1 uppercase">Question</label>
                                        <input value={item.q} onChange={e => {
                                            const next = [...data.faq]
                                            next[i].q = e.target.value
                                            setData({ ...data, faq: next })
                                        }} className="w-full bg-transparent border-b border-slate-700 pb-1 text-white font-semibold outline-none" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-slate-500 block mb-1 uppercase">Réponse</label>
                                        <textarea value={item.a} onChange={e => {
                                            const next = [...data.faq]
                                            next[i].a = e.target.value
                                            setData({ ...data, faq: next })
                                        }} className="w-full bg-transparent text-sm text-slate-400 outline-none h-20 resize-none leading-relaxed" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-sm">
                    <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-3">Appel à l'action final</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Titre</label>
                            <input value={data.cta.title} onChange={e => setData({ ...data, cta: { ...data.cta, title: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none" />
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">Sous-titre</label>
                            <input value={data.cta.subtitle} onChange={e => setData({ ...data, cta: { ...data.cta, subtitle: e.target.value } })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 transition outline-none" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
