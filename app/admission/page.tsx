import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ChevronRight, CheckCircle, AlertCircle, Calendar, FileText, User, Mail } from "lucide-react"

const ICON_MAP: Record<string, any> = {
  FileText, User, Calendar, CheckCircle, AlertCircle
}

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

async function getAdmissionData() {
  const data = await import("@/data/admission.json").then(m => m.default)
  return data
}

export default async function AdmissionPage() {
  const data = await getAdmissionData()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <PageHero
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        breadcrumb={data.hero.breadcrumb}
      />

      {/* Alert banner */}
      <div className="bg-accent/10 border-b border-accent/20 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-accent shrink-0" />
          <p className="text-sm text-foreground">
            <span className="font-semibold">{data.alert.title}</span> {data.alert.deadline}.
            {data.alert.text}
          </p>
        </div>
      </div>

      {/* Conditions */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <span className="text-accent text-sm font-semibold uppercase tracking-widest">Prérequis</span>
              <h2 className="font-serif text-3xl font-bold text-foreground mt-2 mb-6">Conditions d&apos;accès</h2>
              <ul className="space-y-3">
                {data.conditions.map((c: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground leading-relaxed">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-accent text-sm font-semibold uppercase tracking-widest">Dossier</span>
              <h2 className="font-serif text-3xl font-bold text-foreground mt-2 mb-6">Documents requis</h2>
              <ul className="space-y-3">
                {data.docs.map((d: any, i: number) => {
                  const Icon = ICON_MAP[d.icon] || FileText
                  return (
                    <li key={i} className="flex items-center gap-3 p-3 bg-secondary rounded-lg border border-border">
                      <Icon className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm text-foreground">{d.label}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent text-sm font-semibold uppercase tracking-widest">Calendrier</span>
            <h2 className="font-serif text-3xl font-bold text-foreground mt-2">Processus de sélection</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <ol className="relative border-l-2 border-primary/20 space-y-8 pl-8">
              {data.timeline.map((t: any, i: number) => (
                <li key={i} className="relative">
                  <div
                    className={`absolute -left-[38px] w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold
                      ${t.status === "current" ? "bg-accent border-accent text-white" : t.status === "past" ? "bg-primary border-primary text-white" : "bg-background border-border text-muted-foreground"}`}
                  >
                    {i + 1}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-muted-foreground min-w-[160px]">{t.period}</span>
                    <span className={`text-sm font-medium ${t.status === "current" ? "text-accent" : "text-foreground"}`}>
                      {t.step}
                    </span>
                    {t.status === "current" && (
                      <span className="text-xs bg-accent/10 text-accent font-semibold px-2 py-0.5 rounded-full">En cours</span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent text-sm font-semibold uppercase tracking-widest">FAQ</span>
            <h2 className="font-serif text-3xl font-bold text-foreground mt-2">Questions fréquentes</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {data.faq.map((item: any, i: number) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground text-base mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-3">{data.cta.title}</h2>
          <p className="text-white/70 text-sm mb-6">{data.cta.subtitle}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors text-sm"
          >
            <Mail className="w-4 h-4" />
            Nous contacter
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
