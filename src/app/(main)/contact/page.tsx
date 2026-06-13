import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { FadeInUp } from '@/components/ui/FadeInUp';
import { ContactForm } from '@/components/forms/ContactForm';
import { Mail, Phone, MapPin, Globe, Link2, Send, MessageCircle } from 'lucide-react';

const RESEAUX_SOCIAUX = [
  { icon: Link2, label: 'LinkedIn', href: '#' },
  { icon: Globe, label: 'Facebook', href: '#' },
  { icon: MessageCircle, label: 'Instagram', href: '#' },
  { icon: Send, label: 'YouTube', href: '#' },
];

export default function ContactPage() {
  return (
    <section className="section bg-cream">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Contacts"
          subtitle="Chaque collaboration est une opportunité de créer un changement durable."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 mt-12">
          {/* ───────── FORMULAIRE ───────── */}
          <FadeInUp>
            <Card>
              <h3 className="font-display text-xl md:text-2xl font-bold text-burgundy-700 mb-4">
                Formulaire de contact
              </h3>
              <ContactForm />
            </Card>
          </FadeInUp>

          {/* ───────── INFOS PRATIQUES ───────── */}
          <FadeInUp className="space-y-6">
            <Card>
              <h3 className="font-display text-xl md:text-2xl font-bold text-burgundy-700 mb-4">
                Informations pratiques
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="font-body text-sm font-semibold text-text-strong">Email</p>
                    <a href="mailto:contact@heritage-expertise.com" className="font-body text-sm text-burgundy-700 hover:text-burgundy-600">
                      contact@heritage-expertise.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="font-body text-sm font-semibold text-text-strong">WhatsApp Business</p>
                    <a href="https://wa.me/237679660706" className="font-body text-sm text-burgundy-700 hover:text-burgundy-600">
                      +237 679 66 07 06
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="font-body text-sm font-semibold text-text-strong">Localisation</p>
                    <p className="font-body text-sm text-text-muted">Douala, Cameroun</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Réseaux sociaux */}
            <Card>
              <h3 className="font-display text-lg font-bold text-burgundy-700 mb-4">
                Suivez-nous
              </h3>
              <div className="flex gap-3">
                {RESEAUX_SOCIAUX.map((reseau, index) => {
                  const Icon = reseau.icon;
                  return (
                    <a
                      key={index}
                      href={reseau.href}
                      aria-label={reseau.label}
                      className="w-10 h-10 rounded-full bg-burgundy-50 flex items-center justify-center hover:bg-burgundy-100 transition-colors"
                    >
                      <Icon className="w-5 h-5 text-burgundy-700" strokeWidth={1.5} />
                    </a>
                  );
                })}
              </div>
            </Card>

            {/* QR Code */}
            <Card className="text-center">
              <h3 className="font-display text-lg font-bold text-burgundy-700 mb-4">
                Carte de visite digitale
              </h3>
              <div className="w-32 h-32 mx-auto bg-surface border border-rose-200 rounded-lg flex items-center justify-center">
                <span className="font-body text-xs text-text-muted">QR Code</span>
              </div>
              <p className="font-body text-xs text-text-muted mt-3">
                Scannez pour accéder à mes coordonnées directes
              </p>
            </Card>
          </FadeInUp>
        </div>

        {/* Mentions légales */}
        <FadeInUp className="mt-12 text-center">
          <p className="font-body text-xs text-text-muted">
            © 2026 – Diane NDEUNA | Tous droits réservés.
          </p>
        </FadeInUp>
      </div>
    </section>
  );
}