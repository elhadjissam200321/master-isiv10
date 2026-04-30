import Navbar from '@/components/navbar'
import { Footer } from '@/components/footer'
import { MapPin, Phone, Mail } from 'lucide-react'

export const metadata = {
  title: 'Contact – Master ISI',
  description:
    'Contactez la direction du Master Ingénierie des Systèmes Intelligents à la FSAC pour vos questions sur le programme, les admissions et les bourses.',
}

async function getContactData() {
  const contact = await import("@/data/contact.json").then(m => m.default)
  return contact
}

export default async function ContactPage() {
  const contact = await getContactData()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-balance">
              Nous Contacter
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl">
              Des questions sur le Master ISI ? Contactez-nous directement pour obtenir des informations complètes sur le programme et les admissions.
            </p>
          </div>
        </section>

        {/* Contact Info Grid */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Address */}
              <div className="bg-card rounded-lg p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-2">Adresse</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {contact.locationName}<br />
                  {contact.address}
                </p>
              </div>

              {/* Phone */}
              <div className="bg-card rounded-lg p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-2">Téléphone</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
                      {contact.phone}
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="bg-card rounded-lg p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-2">E-mail</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors break-all">
                      {contact.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Google Maps Section */}
            <div className="bg-secondary rounded-lg p-8 md:p-12 border border-border">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-2">Notre Localisation</h2>
              <p className="text-muted-foreground mb-8">
                Retrouvez-nous sur le campus de la Faculté des Sciences Aïn Chock - Km 8 Route d'El Jadida, Casablanca.
              </p>

              <div className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden border border-border shadow-sm">
                <iframe
                  src={contact.googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Localisation Master ISI - Faculté des Sciences Aïn Chock"
                  className="w-full h-full"
                />
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <a
                  href={contact.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Ouvrir dans Google Maps
                </a>
                <a
                  href={contact.itineraryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border text-foreground rounded-lg font-medium hover:bg-secondary transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Obtenir l'itinéraire
                </a>
              </div>
            </div>

            {/* Hours Section */}
            <div className="mt-12 bg-card rounded-lg p-8 border border-border">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Horaires d'Ouverture</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-muted-foreground mb-3">
                    <span className="font-medium text-foreground">Semaine (Lundi - Jeudi)</span><br />
                    {contact.openingHours.week}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Vendredi</span><br />
                    {contact.openingHours.friday}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-3">
                    <span className="font-medium text-foreground">Samedi - Dimanche</span><br />
                    {contact.openingHours.weekend}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Jours Fériés</span><br />
                    Fermé
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
