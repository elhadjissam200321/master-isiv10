"use client"

import { useState, useRef } from "react"
import { Upload, X, ImageIcon, Loader2 } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
}

export function ImageUpload({ value, onChange, label }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const formData = new FormData()
        formData.append("file", file)

        try {
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: formData
            })
            const data = await res.json()
            if (data.url) {
                onChange(data.url)
            }
        } catch (error) {
            console.error("Upload failed", error)
            alert("Échec du téléchargement")
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-2">
            {label && <label className="text-xs text-slate-400 block mb-1 uppercase font-semibold">{label}</label>}

            <div className="flex items-center gap-4">
                {/* Preview */}
                <div className="relative w-32 h-20 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden flex items-center justify-center group shadow-inner">
                    {value ? (
                        <>
                            <img src={value} alt="Preview" className="w-full h-full object-cover" />
                            <button
                                onClick={() => onChange("")}
                                className="absolute top-1 right-1 bg-red-500/80 hover:bg-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg"
                            >
                                <X className="w-3 h-3 text-white" />
                            </button>
                        </>
                    ) : (
                        <ImageIcon className="w-6 h-6 text-slate-700" />
                    )}
                    {uploading && (
                        <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
                            <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
                        </div>
                    )}
                </div>

                <div className="flex-1 space-y-2">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="URL de l'image..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 outline-none"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="flex items-center gap-2 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition uppercase tracking-wider disabled:opacity-50"
                    >
                        <Upload className="w-3 h-3" />
                        {uploading ? "Téléchargement..." : "Choisir un fichier"}
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleUpload}
                        accept="image/*"
                        className="hidden"
                    />
                </div>
            </div>
        </div>
    )
}
