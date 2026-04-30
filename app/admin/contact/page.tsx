"use client"

import { useState, useEffect } from "react"
import { Settings, Save, Mail, Phone, MapPin, Globe, Share2, Link as LinkIcon, Plus, Trash2, Building2 } from "lucide-react"

interface ContactData {
    email: string;
    phone: string;
    address: string;
    locationName: string;
    googleMapsEmbed: string;
    googleMapsLink: string;
    itineraryLink: string;
    openingHours: {
        week: string;
        friday: string;
        weekend: string;
    };
}

interface ConfigData {
    siteName: string;
    universityName: string;
    facultyName: string;
    socials: Record<string, string>;
    navigation: { label: string; href: string }[];
    footer: {
        usefulLinks: { label: string; href: string }[];
        masterLinks: { label: string; href: string }[];
    };
}

export default function SettingsManager() {
    const [contact, setContact] = useState<ContactData | null>(null)
    const [config, setConfig] = useState<ConfigData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([
            fetch("/api/admin/contact").then(res => res.json()),
            fetch("/api/admin/config").then(res => res.json())
        ]).then(([contactData, configData]) => {
            setContact(contactData)
            setConfig(configData)
            setLoading(false)
        })
    }, [])

    const handleSave = async () => {
        if (!contact || !config) return
        await Promise.all([
            fetch("/api/admin/contact", { method: "POST", body: JSON.stringify(contact) }),
            fetch("/api/admin/config", { method: "POST", body: JSON.stringify(config) })
        ])
        alert("Paramètres enregistrés !")
    }

    const addNavItem = () => {
        if (!config) return
        setConfig({ ...config, navigation: [...config.navigation, { label: "Nouveau lien", href: "/" }] })
    }

    const removeNavItem = (index: number) => {
        if (!config) return
        const newNav = [...config.navigation]
        newNav.splice(index, 1)
        setConfig({ ...config, navigation: newNav })
    }

    const addFooterLink = (type: 'usefulLinks' | 'masterLinks') => {
        if (!config) return
        setConfig({
            ...config,
            footer: {
                ...config.footer,
                [type]: [...config.footer[type], { label: "Lien", href: "/" }]
            }
        })
    }

    const removeFooterLink = (type: 'usefulLinks' | 'masterLinks', index: number) => {
        if (!config) return
        const newList = [...config.footer[type]]
        newList.splice(index, 1)
        setConfig({
            ...config,
            footer: {
                ...config.footer,
                [type]: newList
            }
        })
    }

    if (loading || !contact || !config) return <div className="p-8 text-slate-400 text-center text-sm tracking-widest uppercase">Chargement...</div>

    return (
        <div className="p-8 max-w-6xl mx-auto pb-24">
            <div className="flex justify-between items-center mb-10 sticky top-0 bg-slate-900/80 backdrop-blur-md z-30 py-4 border-b border-white/5">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Settings className="w-6 h-6 text-indigo-400" />
                        Paramètres & Configuration
                    </h1>
                    <p className="text-slate-400 text-sm">Identité du site, navigation et coordonnées.</p>
                </div>
                <button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition font-semibold shadow-lg shadow-indigo-600/20">
                    <Save className="w-4 h-4" /> Enregistrer tout
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Site Identity */}
                <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-sm space-y-6">
                    <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2 border-b border-slate-700 pb-3">
                        <Building2 className="w-5 h-5 text-indigo-400" /> Identité du Site
                    </h2>
                    <div>
                        <label className="text-xs text-slate-400 block mb-1.5 uppercase font-semibold">Nom du Site (Master)</label>
                        <input value={config.siteName} onChange={e => setConfig({ ...config, siteName: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500" />
                    </div>
                    <div>
                        <label className="text-xs text-slate-400 block mb-1.5 uppercase font-semibold">Université</label>
                        <input value={config.universityName} onChange={e => setConfig({ ...config, universityName: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500" />
                    </div>
                    <div>
                        <label className="text-xs text-slate-400 block mb-1.5 uppercase font-semibold">Faculté</label>
                        <input value={config.facultyName} onChange={e => setConfig({ ...config, facultyName: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500" />
                    </div>
                </section>

                {/* Social Links */}
                <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-sm space-y-6">
                    <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2 border-b border-slate-700 pb-3">
                        <Share2 className="w-5 h-5 text-indigo-400" /> Réseaux Sociaux
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Object.entries(config.socials).map(([key, value]) => (
                            <div key={key}>
                                <label className="text-[10px] text-slate-400 block mb-1 uppercase font-bold tracking-tighter">{key}</label>
                                <input value={value} onChange={e => setConfig({ ...config, socials: { ...config.socials, [key]: e.target.value } })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-indigo-500 text-sm" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Navigation Menu */}
                <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-sm md:col-span-2">
                    <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-3">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <LinkIcon className="w-5 h-5 text-indigo-400" /> Menu de Navigation
                        </h2>
                        <button onClick={addNavItem} className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition">
                            <Plus className="w-3.5 h-3.5" /> Ajouter un lien
                        </button>
                    </div>
                    <div className="space-y-3">
                        {config.navigation.map((item, i) => (
                            <div key={i} className="flex gap-4 items-center bg-slate-900/50 p-3 rounded-xl border border-slate-700/30 group">
                                <div className="flex-1 grid grid-cols-2 gap-3">
                                    <input value={item.label} onChange={e => {
                                        const newNav = [...config.navigation]; newNav[i].label = e.target.value; setConfig({ ...config, navigation: newNav })
                                    }} className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white" placeholder="Label" />
                                    <input value={item.href} onChange={e => {
                                        const newNav = [...config.navigation]; newNav[i].href = e.target.value; setConfig({ ...config, navigation: newNav })
                                    }} className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white" placeholder="Href (/...)" />
                                </div>
                                <button onClick={() => removeNavItem(i)} className="text-slate-500 hover:text-red-400 p-1.5 opacity-0 group-hover:opacity-100 transition">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer Links */}
                <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-sm">
                    <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-3">
                        <h2 className="text-lg font-bold text-white">Liens Utiles (Footer)</h2>
                        <button onClick={() => addFooterLink('usefulLinks')} className="text-[10px] uppercase font-bold text-indigo-400 hover:text-indigo-300">Ajouter</button>
                    </div>
                    <div className="space-y-2">
                        {config.footer.usefulLinks.map((item, i) => (
                            <div key={i} className="flex gap-2 group items-center">
                                <input value={item.label} onChange={e => {
                                    const newList = [...config.footer.usefulLinks]; newList[i] = { ...newList[i], label: e.target.value }; setConfig({ ...config, footer: { ...config.footer, usefulLinks: newList } })
                                }} className="w-1/3 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white" placeholder="Label" />
                                <input value={item.href} onChange={e => {
                                    const newList = [...config.footer.usefulLinks]; newList[i] = { ...newList[i], href: e.target.value }; setConfig({ ...config, footer: { ...config.footer, usefulLinks: newList } })
                                }} className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono" placeholder="URL ou /chemin" />
                                <button onClick={() => removeFooterLink('usefulLinks', i)} className="text-slate-500 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-sm">
                    <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-3">
                        <h2 className="text-lg font-bold text-white">Master ISI (Footer)</h2>
                        <button onClick={() => addFooterLink('masterLinks')} className="text-[10px] uppercase font-bold text-indigo-400 hover:text-indigo-300">Ajouter</button>
                    </div>
                    <div className="space-y-2">
                        {config.footer.masterLinks.map((item, i) => (
                            <div key={i} className="flex gap-2 group items-center">
                                <input value={item.label} onChange={e => {
                                    const newList = [...config.footer.masterLinks]; newList[i] = { ...newList[i], label: e.target.value }; setConfig({ ...config, footer: { ...config.footer, masterLinks: newList } })
                                }} className="w-1/3 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white" placeholder="Label" />
                                <input value={item.href} onChange={e => {
                                    const newList = [...config.footer.masterLinks]; newList[i] = { ...newList[i], href: e.target.value }; setConfig({ ...config, footer: { ...config.footer, masterLinks: newList } })
                                }} className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono" placeholder="URL ou /chemin" />
                                <button onClick={() => removeFooterLink('masterLinks', i)} className="text-slate-500 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                        ))}
                    </div>
                </section>


                {/* Contact Info */}
                <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-sm space-y-6 md:col-span-2">
                    <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2 border-b border-slate-700 pb-3">
                        <Mail className="w-5 h-5 text-indigo-400" /> Coordonnées & Map
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs text-slate-400 block mb-1.5 uppercase font-semibold">Email de contact</label>
                            <input value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500" />
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 block mb-1.5 uppercase font-semibold">Téléphone</label>
                            <input value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-xs text-slate-400 block mb-1.5 uppercase font-semibold">Adresse Complète</label>
                            <textarea value={contact.address} onChange={e => setContact({ ...contact, address: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 h-20" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-xs text-slate-400 block mb-1.5 uppercase font-semibold text-indigo-400">Google Maps Embed URL (Src)</label>
                            <input value={contact.googleMapsEmbed} onChange={e => setContact({ ...contact, googleMapsEmbed: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white outline-none focus:border-indigo-500 text-xs font-mono" />
                        </div>
                        <div className="md:col-span-2 border-t border-slate-700 pt-6">
                            <h3 className="text-sm font-bold text-slate-300 mb-4">Horaires d'ouverture</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-[10px] text-slate-500 block mb-1 uppercase">Semaine (Lun–Jeu)</label>
                                    <input value={contact.openingHours?.week || ""} onChange={e => setContact({ ...contact, openingHours: { ...contact.openingHours, week: e.target.value } })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-indigo-500 text-sm" placeholder="Ex: 8h30 – 16h30" />
                                </div>
                                <div>
                                    <label className="text-[10px] text-slate-500 block mb-1 uppercase">Vendredi</label>
                                    <input value={contact.openingHours?.friday || ""} onChange={e => setContact({ ...contact, openingHours: { ...contact.openingHours, friday: e.target.value } })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-indigo-500 text-sm" placeholder="Ex: 8h30 – 11h30" />
                                </div>
                                <div>
                                    <label className="text-[10px] text-slate-500 block mb-1 uppercase">Weekend</label>
                                    <input value={contact.openingHours?.weekend || ""} onChange={e => setContact({ ...contact, openingHours: { ...contact.openingHours, weekend: e.target.value } })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-indigo-500 text-sm" placeholder="Ex: Fermé" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
