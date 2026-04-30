"use client"

import { Facebook, Twitter, Linkedin, Share2 } from "lucide-react"

interface ShareButtonsProps {
    title: string
    url: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    }

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    url,
                })
            } catch (err) {
                console.error("Error sharing:", err)
            }
        }
    }

    return (
        <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Partager</span>
                <div className="flex gap-2">
                    <a
                        href={shareLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
                        title="Partager sur Facebook"
                    >
                        <Facebook className="w-4 h-4" />
                    </a>
                    <a
                        href={shareLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
                        title="Partager sur Twitter"
                    >
                        <Twitter className="w-4 h-4" />
                    </a>
                    <a
                        href={shareLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
                        title="Partager sur LinkedIn"
                    >
                        <Linkedin className="w-4 h-4" />
                    </a>
                    {typeof navigator !== 'undefined' && !!navigator.share && (
                        <button
                            onClick={handleNativeShare}
                            className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all md:hidden"
                            title="Plus d'options"
                        >
                            <Share2 className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
