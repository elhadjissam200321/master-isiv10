import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ChevronRight, Calendar, ArrowRight, Eye } from "lucide-react"
import Image from "next/image"
import { getViews } from "@/lib/views"
import { articles } from "@/data/articles"

function PageHero({ title, subtitle, breadcrumb }: { title: string; subtitle: string; breadcrumb: string }) {
  return (
    <section className="bg-primary py-14 relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {[[10, 10, 90, 90], [90, 10, 10, 90], [50, 0, 50, 100], [0, 50, 100, 50]].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="0.5" />
        ))}
        {[[20, 20], [80, 20], [50, 50], [20, 80], [80, 80]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.5" fill="white" />
        ))}
      </svg>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-white/60 text-xs mb-4">
          <Link href="/" className="hover:text-white">Accueil</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/90">{breadcrumb}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white text-balance">{title}</h1>
        <p className="text-white/75 mt-3 max-w-2xl leading-relaxed">{subtitle}</p>
      </div>
    </section>
  )
}

// Data is now imported from @/data/articles

export default async function ActualitesPage() {
  const views = await getViews()

  const actualitesWithViews = Object.values(articles).map(item => ({
    ...item,
    views: views[item.slug] || item.views
  }))

  const featuredNews = actualitesWithViews.filter(a => a.featured)
  const otherNews = actualitesWithViews.filter(a => !a.featured)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <PageHero
        title="Actualités"
        subtitle="Restez informé des dernières nouvelles du Master ISI : événements, publications, partenariats et opportunités."
        breadcrumb="Actualités"
      />

      {/* Featured News */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-6">À la Une</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredNews.map((news) => (
              <Link
                key={news.id}
                href={`/actualites/${news.slug}`}
                className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow group block"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={news.image || "/images/hero-neural.jpg"}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary text-white">
                      {news.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {news.date}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 border-l border-border pl-3">
                      <Eye className="w-3 h-3" />
                      {news.views} vues
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {news.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
                    Lire la suite <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All News */}
      <section className="py-12 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Toutes les actualités</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherNews.map((news) => (
              <Link
                key={news.id}
                href={`/actualites/${news.slug}`}
                className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow group block"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={news.image || "/images/hero-neural.jpg"}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary text-primary border border-border">
                      {news.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {news.date}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 border-l border-border pl-3">
                      <Eye className="w-3 h-3" />
                      {news.views} vues
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors font-serif text-base">
                    {news.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {news.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
                    Lire la suite <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LinkedIn Community */}
      <section className="py-14 bg-primary relative overflow-hidden">
        {/* Background decorative element */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">Rejoignez la communauté Master ISI</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto leading-relaxed">
            Suivez-nous sur LinkedIn pour rester connecté avec nos alumni, découvrir nos événements et ne rien manquer des opportunités du Master.
          </p>
          <a 
            href="https://linkedin.com/school/masterisi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 bg-white text-primary font-bold rounded-lg hover:shadow-lg transition-all uppercase tracking-wider font-serif text-sm"
          >
            <svg className="w-5 h-5 fill-primary" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            Rejoindre le réseau
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
