import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ChevronRight, Mail, BookOpen, FlaskConical, Globe, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

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

// Avatar placeholder using SVG initials
function Avatar({ name, color = "bg-primary" }: { name: string; color?: string }) {
  const initials = name.split(" ").slice(0, 2).map((n) => n[0]).join("")
  return (
    <div className={`w-20 h-20 rounded-full ${color} flex items-center justify-center text-white font-bold text-xl font-serif shrink-0`} aria-label={`Photo de ${name}`}>
      {initials}
    </div>
  )
}

async function getTeachers() {
  const teachers = await import("@/data/teachers.json").then(m => m.default)
  return teachers
}

export default async function EnseignantsPage() {
  const teachersData = await getTeachers()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <PageHero
        title="Équipe pédagogique"
        subtitle="Le Master ISI est animé par une équipe d'enseignants-chercheurs de haut niveau et des experts reconnus dans leurs domaines."
        breadcrumb="Enseignants"
      />

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent text-sm font-semibold uppercase tracking-widest">Corps enseignant</span>
            <h2 className="font-serif text-3xl font-bold text-foreground mt-2">{teachersData.length} enseignants-chercheurs</h2>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {teachersData.map((t: any) => (
              <div key={t.name} className="relative bg-card border border-border rounded-xl p-6 flex gap-6 hover:shadow-lg hover:border-primary/20 transition-all items-center group overflow-hidden">
                <Avatar name={t.name.replace("Pr. ", "").replace("Mme. ", "").replace("Dr. ", "").replace("M. ", "")} color={t.color} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors font-serif">{t.name}</h3>
                  </div>
                  <p className="text-xs text-primary font-bold mt-1 uppercase tracking-wider">{t.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>


                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {t.speciality.split(", ").map((s: string) => (
                      <span key={s} className="text-[10px] bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full border border-border font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
