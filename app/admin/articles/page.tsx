"use client"

import { useEffect, useState, useCallback } from "react"
import { Plus, Pencil, Trash2, X, Save, Loader2, Search } from "lucide-react"
import { ImageUpload } from "@/components/admin/image-upload"

interface Article {
    id: number
    slug: string
    title: string
    excerpt: string
    content: string
    category: string
    date: string
    readTime: string
    author: string
    image: string
    views: number
    featured?: boolean
}

const EMPTY: Partial<Article> = {
    title: "", excerpt: "", content: "", category: "Actualité",
    date: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
    readTime: "3 min", author: "", image: "/images/hero-neural.jpg", featured: false,
}

const CATEGORIES = ["Conférence", "Distinction", "Formation", "Événement", "Admission", "Actualité"]

export default function ArticlesAdminPage() {
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState<Partial<Article> | null>(null)
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState<number | null>(null)
    const [search, setSearch] = useState("")

    const fetchArticles = useCallback(async () => {
        setLoading(true)
        const res = await fetch("/api/admin/articles")
        setArticles(await res.json())
        setLoading(false)
    }, [])

    useEffect(() => { fetchArticles() }, [fetchArticles])

    const save = async () => {
        if (!form?.title) return
        setSaving(true)
        const method = form.id ? "PUT" : "POST"
        const url = form.id ? `/api/admin/articles/${form.id}` : "/api/admin/articles"
        await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
        await fetchArticles()
        setForm(null)
        setSaving(false)
    }

    const del = async (id: number) => {
        if (!confirm("Supprimer cet article ?")) return
        setDeleting(id)
        await fetch(`/api/admin/articles/${id}`, { method: "DELETE" })
        await fetchArticles()
        setDeleting(null)
    }

    const filtered = articles.filter(a =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.category.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Articles</h1>
                    <p className="text-slate-400 mt-0.5 text-sm">{articles.length} article{articles.length !== 1 ? "s" : ""} publiés</p>
                </div>
                <button
                    onClick={() => setForm({ ...EMPTY })}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
                >
                    <Plus className="w-4 h-4" /> Nouvel article
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Rechercher..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                />
            </div>

            {/* Table */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
                    </div>
                ) : filtered.length === 0 ? (
                    <p className="text-center text-slate-500 py-12">Aucun article trouvé</p>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-700">
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Titre</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:table-cell">Catégorie</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Auteur</th>
                                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(a => (
                                <tr key={a.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition">
                                    <td className="px-5 py-3">
                                        <p className="text-white font-medium truncate max-w-xs">{a.title}</p>
                                        <p className="text-slate-500 text-xs mt-0.5 truncate max-w-xs">{a.excerpt}</p>
                                    </td>
                                    <td className="px-5 py-3 hidden sm:table-cell">
                                        <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">{a.category}</span>
                                        {a.featured && <span className="ml-1.5 text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">Featured</span>}
                                    </td>
                                    <td className="px-5 py-3 hidden lg:table-cell text-slate-400">{a.author}</td>
                                    <td className="px-5 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => setForm({ ...a })} className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-slate-700 transition">
                                                <Pencil className="w-3.5 h-3.5" />
                                            </button>
                                            <button onClick={() => del(a.id)} disabled={deleting === a.id} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition">
                                                {deleting === a.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal */}
            {form && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-2xl mt-8 mb-8 shadow-2xl">
                        <div className="flex items-center justify-between p-5 border-b border-slate-700">
                            <h2 className="font-bold text-white">{form.id ? "Modifier l'article" : "Nouvel article"}</h2>
                            <button onClick={() => setForm(null)} className="text-slate-400 hover:text-white transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-5 space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs text-slate-400 mb-1.5">Titre *</label>
                                    <input value={form.title || ""} onChange={e => setForm(f => ({ ...f!, title: e.target.value }))}
                                        className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition" />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1.5">Catégorie</label>
                                    <select value={form.category || "Actualité"} onChange={e => setForm(f => ({ ...f!, category: e.target.value }))}
                                        className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition">
                                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1.5">Auteur</label>
                                    <input value={form.author || ""} onChange={e => setForm(f => ({ ...f!, author: e.target.value }))}
                                        className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition" />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1.5">Date</label>
                                    <input value={form.date || ""} onChange={e => setForm(f => ({ ...f!, date: e.target.value }))}
                                        className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition" />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1.5">Temps de lecture</label>
                                    <input value={form.readTime || ""} onChange={e => setForm(f => ({ ...f!, readTime: e.target.value }))}
                                        className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition" />
                                </div>
                                <div className="sm:col-span-2">
                                    <ImageUpload
                                        label="Image de l'article"
                                        value={form.image || ""}
                                        onChange={url => setForm(f => ({ ...f!, image: url }))}
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-xs text-slate-400 mb-1.5">Extrait</label>
                                    <textarea rows={2} value={form.excerpt || ""} onChange={e => setForm(f => ({ ...f!, excerpt: e.target.value }))}
                                        className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition resize-none" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-xs text-slate-400 mb-1.5">Contenu (HTML)</label>
                                    <textarea rows={6} value={form.content || ""} onChange={e => setForm(f => ({ ...f!, content: e.target.value }))}
                                        className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition resize-y font-mono text-xs" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={!!form.featured} onChange={e => setForm(f => ({ ...f!, featured: e.target.checked }))}
                                            className="w-4 h-4 accent-indigo-500" />
                                        <span className="text-sm text-slate-300">Article featured (mis en avant)</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="p-5 border-t border-slate-700 flex items-center justify-end gap-3">
                            <button onClick={() => setForm(null)} className="px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-700 transition">Annuler</button>
                            <button onClick={save} disabled={saving || !form.title}
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
