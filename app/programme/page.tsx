import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import ProgrammeContent from "@/components/programme-content"

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

async function getProgrammeData() {
  const data = await import("@/data/programme.json").then(m => m.default)
  return data
}

export default async function ProgrammePage() {
  const data = await getProgrammeData()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <PageHero
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        breadcrumb={data.hero.breadcrumb}
      />

      <ProgrammeContent data={data} />

      {/* CTA */}
      <section className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4 text-balance">
            {data.cta.title}
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto leading-relaxed">
            {data.cta.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.fsac.ac.ma/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2 font-serif uppercase tracking-wider text-sm"
            >
              {data.cta.primaryText}
              <ChevronRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="border border-white/40 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors font-serif uppercase tracking-wider text-sm"
            >
              {data.cta.secondaryText}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
