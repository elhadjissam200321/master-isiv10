"use client"

import { useEffect, useState, useCallback } from "react"
import { Plus, Pencil, Trash2, X, Save, Loader2 } from "lucide-react"
import { ImageUpload } from "@/components/admin/image-upload"

interface Teacher {
    id: number
    name: string
    title: string
    role: string
    speciality: string
    color: string
    photo?: string
}

const EMPTY: Partial<Teacher> = {
    name: "", title: "Professeur de l'Enseignement Supérieur",
    role: "Enseignant-chercheur", speciality: "", color: "bg-primary", photo: ""
}

export default function EnseignantsAdminPage() {
    const [teachers, setTeachers] = useState<Teacher[]>([])
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState<Partial<Teacher> | null>(null)
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState<number | null>(null)

    const fetch_ = useCallback(async () => {
        setLoading(true)
        const res = await fetch("/api/admin/teachers")
        setTeachers(await res.json())
        setLoading(false)
    }, [])

    useEffect(() => { fetch_() }, [fetch_])

    const save = async () => {
        if (!form?.name) return
        setSaving(true)
        const method = form.id ? "PUT" : "POST"
        await fetch("/api/admin/teachers", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
        await fetch_()
        setForm(null)
        setSaving(false)
    }

    const del = async (id: number) => {
        if (!confirm("Supprimer cet enseignant ?")) return
        setDeleting(id)
        await fetch("/api/admin/teachers", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
        await fetch_()
        setDeleting(null)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Enseignants</h1>
                    <p className="text-slate-400 mt-0.5 text-sm">{teachers.length} enseignant{teachers.length !== 1 ? "s" : ""}</p>
                </div>
                <button onClick={() => setForm({ ...EMPTY })}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition">
                    <Plus className="w-4 h-4" /> Ajouter
                </button>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 text-indigo-400 animate-spin" /></div>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-700">
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Nom</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Spécialité</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:table-cell">Rôle</th>
                                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map(t => (
                                <tr key={t.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition">
                                    <td className="px-5 py-3 text-white font-medium">{t.name}</td>
                                    <td className="px-5 py-3 hidden md:table-cell text-slate-400 text-xs">{t.speciality}</td>
                                    <td className="px-5 py-3 hidden sm:table-cell">
                                        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">{t.role}</span>
                                    </td>
                                    <td className="px-5 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => setForm({ ...t })} className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-slate-700 transition"><Pencil className="w-3.5 h-3.5" /></button>
                                            <button onClick={() => del(t.id)} disabled={deleting === t.id} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition">
                                                {deleting === t.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {form && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl">
                        <div className="flex items-center justify-between p-5 border-b border-slate-700">
                            <h2 className="font-bold text-white">{form.id ? "Modifier" : "Ajouter"} un enseignant</h2>
                            <button onClick={() => setForm(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-5 space-y-4">
                            {[
                                { label: "Nom complet *", key: "name" },
                                { label: "Titre", key: "title" },
                                { label: "Rôle", key: "role" },
                                { label: "Spécialité(s)", key: "speciality" },
                            ].map(({ label, key }) => (
                                <div key={key}>
                                    <label className="block text-xs text-slate-400 mb-1.5">{label}</label>
                                    <input value={(form as Record<string, string>)[key] || ""}
                                        onChange={e => setForm(f => ({ ...f!, [key]: e.target.value }))}
                                        className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition" />
                                </div>
                            ))}
                            <div>
                                <label className="block text-xs text-slate-400 mb-1.5">Couleur d'accent</label>
                                <select value={form.color || "bg-primary"} onChange={e => setForm(f => ({ ...f!, color: e.target.value }))}
                                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition">
                                    <option value="bg-primary">Primaire (bleu)</option>
                                    <option value="bg-accent">Accent (orange)</option>
                                </select>
                            </div>
                            <ImageUpload
                                label="Photo de profil (optionnel)"
                                value={form.photo || ""}
                                onChange={url => setForm(f => ({ ...f!, photo: url }))}
                            />
                        </div>
                        <div className="p-5 border-t border-slate-700 flex items-center justify-end gap-3">
                            <button onClick={() => setForm(null)} className="px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-700 transition">Annuler</button>
                            <button onClick={save} disabled={saving || !form.name}
                                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-5 py-2 rounded-xl text-sm font-semibold transition">
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Enregistrer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
