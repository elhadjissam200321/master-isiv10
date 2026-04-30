"use client"

import { useState, useEffect } from "react"
import { GraduationCap, Plus, Trash2, Save, User } from "lucide-react"

interface Alumnus {
    id: number;
    name: string;
    promo: string;
    role: string;
    company: string;
    review: string;
    avatar: string;
}

export default function AlumniManager() {
    const [alumni, setAlumni] = useState<Alumnus[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/admin/alumni").then(res => res.json()).then(data => {
            setAlumni(data)
            setLoading(false)
        })
    }, [])

    const handleSave = async () => {
        await fetch("/api/admin/alumni", {
            method: "POST",
            body: JSON.stringify(alumni)
        })
        alert("Enregistré !")
    }

    const addAlumnus = () => {
        setAlumni([...alumni, { id: Date.now(), name: "", promo: "", role: "", company: "", review: "", avatar: "" }])
    }

    const updateAlumnus = (id: number, field: keyof Alumnus, value: string) => {
        setAlumni(alumni.map(a => a.id === id ? { ...a, [field]: value } : a))
    }

    const removeAlumnus = (id: number) => {
        setAlumni(alumni.filter(a => a.id !== id))
    }

    if (loading) return <div className="p-8 text-slate-400">Chargement...</div>

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <GraduationCap className="w-6 h-6 text-indigo-400" />
                        Gestion des Alumni
                    </h1>
                    <p className="text-slate-400 text-sm">Gérez les témoignages des étudiants sur la page d'accueil.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={addAlumnus} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                        <Plus className="w-4 h-4" /> Ajouter
                    </button>
                    <button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition font-semibold">
                        <Save className="w-4 h-4" /> Enregistrer tout
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {alumni.map((a) => (
                    <div key={a.id} className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
                                    {a.avatar || "?"}
                                </div>
                                <h3 className="text-white font-semibold">{a.name || "Nouvel Alumni"}</h3>
                            </div>
                            <button onClick={() => removeAlumnus(a.id)} className="text-red-400 hover:text-red-300 p-2">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                placeholder="Nom complet"
                                value={a.name}
                                onChange={e => updateAlumnus(a.id, "name", e.target.value)}
                                className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 outline-none"
                            />
                            <input
                                placeholder="Promotion (ex: 2025)"
                                value={a.promo}
                                onChange={e => updateAlumnus(a.id, "promo", e.target.value)}
                                className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 outline-none"
                            />
                            <input
                                placeholder="Poste actuel"
                                value={a.role}
                                onChange={e => updateAlumnus(a.id, "role", e.target.value)}
                                className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 outline-none"
                            />
                            <input
                                placeholder="Entreprise"
                                value={a.company}
                                onChange={e => updateAlumnus(a.id, "company", e.target.value)}
                                className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 outline-none"
                            />
                            <input
                                placeholder="Initiales (Avatar)"
                                value={a.avatar}
                                onChange={e => updateAlumnus(a.id, "avatar", e.target.value)}
                                className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 outline-none"
                            />
                            <div className="md:col-span-2">
                                <textarea
                                    placeholder="Témoignage"
                                    value={a.review}
                                    onChange={e => updateAlumnus(a.id, "review", e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 outline-none h-24"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
