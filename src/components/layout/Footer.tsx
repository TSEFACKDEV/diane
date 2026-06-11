'use client'
import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { mainNav } from '@/config/navigation'

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
)

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const YoutubeIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
  </svg>
)

const ecosysteme = [
  { label: 'EDEN AFRICA',  desc: 'ONG panafricaine' },
  { label: 'ADEF',         desc: 'Incubation & accélération' },
  { label: 'OSCF',         desc: 'Observatoire francophone' },
  { label: 'MAMIZA / MIA', desc: 'IA inclusive' },
]

const socials = [
  { icon: LinkedinIcon,  href: '#', label: 'LinkedIn' },
  { icon: FacebookIcon,  href: '#', label: 'Facebook' },
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
  { icon: YoutubeIcon,   href: '#', label: 'YouTube' },
]

export function Footer() {
  return (
    <footer style={{
      backgroundColor: '#1C0F14',
      color:           'rgba(255,255,255,0.75)',
      fontFamily:      'var(--font-dm-sans)',
    }}>
      {/* ── BANDE DORÉE TOP ──────────────────────────────────── */}
      <div style={{
        height:     '2px',
        background: 'linear-gradient(90deg, transparent, #C9A84C, #E8D5A0, #C9A84C, transparent)',
      }} />

      {/* ── CTA SECTION ──────────────────────────────────────── */}
      <div style={{
        background:    'linear-gradient(135deg, rgba(107,45,62,0.4) 0%, rgba(60,20,30,0.6) 100%)',
        padding:       '4rem 2rem',
        textAlign:     'center',
        borderBottom:  '1px solid rgba(201,168,76,0.15)',
      }}>
        <p style={{
          fontFamily:    'var(--font-dm-sans)',
          fontSize:      '0.75rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color:         '#C9A84C',
          marginBottom:  '1rem',
        }}>
          Prête à structurer votre organisation ?
        </p>
        <h2 style={{
          fontFamily:  'var(--font-playfair)',
          fontSize:    'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight:  700,
          color:       'white',
          marginBottom:'0.5rem',
          lineHeight:  1.2,
        }}>
          Construisons ensemble
          <br />
          <span style={{
            background:              'linear-gradient(135deg, #C9A84C, #E8D5A0)',
            WebkitBackgroundClip:    'text',
            WebkitTextFillColor:     'transparent',
            backgroundClip:          'text',
          }}>
            des systèmes durables.
          </span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '2rem', maxWidth: '480px', margin: '0.75rem auto 2rem' }}>
          Plus de 20 ans d'expertise au service des organisations féminines africaines.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/contact" className="btn-gold">
            Prendre Contact
          </Link>
          <Link href="/diagnostic" className="btn-secondary" style={{
            borderColor: 'rgba(201,168,76,0.4)',
            color:       'rgba(255,255,255,0.8)',
          }}>
            Auto-diagnostic gratuit
          </Link>
        </div>
      </div>

      {/* ── CONTENU FOOTER ───────────────────────────────────── */}
      <div style={{
        maxWidth:     '1280px',
        margin:       '0 auto',
        padding:      '4rem 2rem',
        display:      'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap:          '3rem',
      }}>

        {/* Colonne 1 — Identité */}
        <div style={{ gridColumn: 'span 1' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{
              fontFamily:    'var(--font-playfair)',
              fontSize:      '1.3rem',
              fontWeight:    700,
              color:         '#C9A84C',
              letterSpacing: '0.04em',
              marginBottom:  '4px',
            }}>
              DIANE NDEUNA
            </p>
            <p style={{
              fontFamily:    'var(--font-dm-sans)',
              fontSize:      '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.35)',
            }}>
              Heritage & Expertise
            </p>
          </div>

          <p style={{
            fontFamily:  'var(--font-quote)',
            fontStyle:   'italic',
            fontSize:    '0.95rem',
            color:       'rgba(255,255,255,0.5)',
            lineHeight:  1.7,
            marginBottom:'1.5rem',
          }}>
            « L'Afrique n'a pas besoin d'héroïnes. Elle a besoin de systèmes. »
          </p>

          {/* Socials */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                style={{
                  display:         'flex',
                  alignItems:      'center',
                  justifyContent:  'center',
                  width:           '38px',
                  height:          '38px',
                  borderRadius:    '8px',
                  border:          '1px solid rgba(201,168,76,0.2)',
                  color:           'rgba(255,255,255,0.5)',
                  transition:      'all 0.2s',
                  textDecoration:  'none',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor      = '#C9A84C'
                  el.style.color            = '#C9A84C'
                  el.style.backgroundColor  = 'rgba(201,168,76,0.1)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor      = 'rgba(201,168,76,0.2)'
                  el.style.color            = 'rgba(255,255,255,0.5)'
                  el.style.backgroundColor  = 'transparent'
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Colonne 2 — Navigation */}
        <div>
          <h4 style={footerHeadingStyle}>Navigation</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {mainNav.slice(0, 7).map(item => (
              <li key={item.href}>
                <Link href={item.href} style={footerLinkStyle}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 3 — Écosystème */}
        <div>
          <h4 style={footerHeadingStyle}>Notre Écosystème</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {ecosysteme.map(e => (
              <li key={e.label}>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', margin: 0, fontWeight: 500 }}>
                  {e.label}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', margin: '2px 0 0' }}>
                  {e.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 4 — Contact */}
        <div>
          <h4 style={footerHeadingStyle}>Contact</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { icon: Mail,    text: 'contact@heritage-expertise.com', href: 'mailto:contact@heritage-expertise.com' },
              { icon: Mail,    text: 'contact@dianendeuna.com',         href: 'mailto:contact@dianendeuna.com' },
              { icon: Phone,   text: '+237 679 66 07 06',               href: 'tel:+237679660706' },
              { icon: MapPin,  text: 'Afrique — 15+ pays',              href: '#' },
            ].map(({ icon: Icon, text, href }) => (
              <li key={text}>
                <a href={href} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', textDecoration: 'none', color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', lineHeight: 1.5 }}>
                  <Icon size={15} style={{ color: '#C9A84C', marginTop: '2px', flexShrink: 0 }} />
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── BOTTOM BAR ───────────────────────────────────────── */}
      <div style={{
        borderTop:    '1px solid rgba(201,168,76,0.1)',
        padding:      '1.5rem 2rem',
        maxWidth:     '1280px',
        margin:       '0 auto',
        display:      'flex',
        alignItems:   'center',
        justifyContent: 'space-between',
        flexWrap:     'wrap',
        gap:          '1rem',
      }}>
        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', margin: 0 }}>
          © 2026 Diane NDEUNA — Heritage & Expertise. Tous droits réservés.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {['Mentions légales', 'Politique de confidentialité'].map(label => (
            <Link key={label} href="/mentions-legales" style={{ ...footerLinkStyle, fontSize: '0.75rem' }}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

const footerHeadingStyle: React.CSSProperties = {
  fontFamily:    'var(--font-dm-sans)',
  fontSize:      '0.7rem',
  fontWeight:    600,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color:         '#C9A84C',
  marginBottom:  '1.25rem',
  paddingBottom: '0.75rem',
  borderBottom:  '1px solid rgba(201,168,76,0.15)',
}

const footerLinkStyle: React.CSSProperties = {
  fontFamily:    'var(--font-dm-sans)',
  fontSize:      '0.85rem',
  color:         'rgba(255,255,255,0.5)',
  textDecoration:'none',
  transition:    'color 0.2s',
}