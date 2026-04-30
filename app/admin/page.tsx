import { readFileSync } from "fs"
import { join } from "path"
import Link from "next/link"
import { FileText, Users, Handshake, TrendingUp, ArrowRight, Clock } from "lucide-react"

function readJSON(file: string) {
    try {
        return JSON.parse(readFileSync(join(process.cwd(), "data", file), "utf-8"))
    } catch {
        return []
    }
}

export default function AdminDashboard() {
    const articles = readJSON("articles.json")
    const teachers = readJSON("teachers.json")
    const partners = readJSON("partners.json")
    const totalViews = articles.reduce((s: number, a: { views: number }) => s + (a.views || 0), 0)

    const stats = [
        { label: "Articles publiés", value: articles.length, icon: FileText, color: "bg-indigo-500", href: "/admin/articles" },
        { label: "Enseignants", value: teachers.length, icon: Users, color: "bg-emerald-500", href: "/admin/enseignants" },
        { label: "Partenaires", value: partners.length, icon: Handshake, color: "bg-amber-500", href: "/admin/partenaires" },
        { label: "Vues totales", value: totalViews, icon: TrendingUp, color: "bg-rose-500", href: "#" },
    ]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Tableau de bord</h1>
                <p className="text-slate-400 mt-1">Vue d'ensemble du site Master ISI</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s) => (
                    <Link key={s.label} href={s.href} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex items-center gap-4 hover:border-slate-600 transition group">
                        <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center shrink-0`}>
                            <s.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">{s.value}</p>
                            <p className="text-sm text-slate-400">{s.label}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick actions */}
            <div>
                <h2 className="text-lg font-semibold text-white mb-4">Actions rapides</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { label: "Nouvel article", href: "/admin/articles?new=1", icon: FileText },
                        { label: "Ajouter enseignant", href: "/admin/enseignants?new=1", icon: Users },
                        { label: "Ajouter partenaire", href: "/admin/partenaires?new=1", icon: Handshake },
                    ].map((a) => (
                        <Link
                            key={a.label}
                            href={a.href}
                            className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center justify-between hover:border-indigo-500 hover:bg-slate-800/80 transition group"
                        >
                            <div className="flex items-center gap-3">
                                <a.icon className="w-4 h-4 text-indigo-400" />
                                <span className="text-sm font-medium text-slate-200">{a.label}</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent articles */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">Articles récents</h2>
                    <Link href="/admin/articles" className="text-sm text-indigo-400 hover:underline">Voir tout</Link>
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-700">
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Titre</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:table-cell">Catégorie</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Date</th>
                                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.slice(0, 5).map((a: { id: number; title: string; category: string; date: string }) => (
                                <tr key={a.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition">
                                    <td className="px-5 py-3">
                                        <p className="text-white font-medium truncate max-w-xs">{a.title}</p>
                                    </td>
                                    <td className="px-5 py-3 hidden sm:table-cell">
                                        <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">{a.category}</span>
                                    </td>
                                    <td className="px-5 py-3 hidden md:table-cell">
                                        <span className="text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{a.date}</span>
                                    </td>
                                    <td className="px-5 py-3 text-right">
                                        <Link href={`/admin/articles?edit=${a.id}`} className="text-xs text-indigo-400 hover:underline">Modifier</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
