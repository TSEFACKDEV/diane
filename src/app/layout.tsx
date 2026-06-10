import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google'
import { Providers } from '@/components/shared/Providers'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Diane NDEUNA - Heritage & Expertise',
    template: '%s | Diane NDEUNA',
  },
  description:
    'Architecte de Systèmes Organisationnels — Structuration des organisations féminines à potentiel institutionnel en Afrique.',
  keywords: ['leadership féminin', 'entrepreneuriat africain', 'conseil institutionnel', 'Diane NDEUNA', 'projet panafricain',
    'structuration des organisations et projets', 'systeme de gouvernance', 'société civile', 'politique publique', 'financement', 
    'positionnement institutionnel et plaidoyer', 'évaluation des projets', 'intégration regional (zlecaf)', 'francophonie','developement durable', 
    'communication institutionnel et ia', 'genre', 'inclusion numérique et financiere', 'autonomisation economique des femmes', 'egalité femme-homme'],
  authors: [{ name: 'Diane NDEUNA' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Heritage & Expertise',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${dmSans.variable} ${cormorant.variable} ${jetbrains.variable}`}
    >
      <body className="font-body bg-cream text-gray-800 antialiased">
        <Providers>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="light"
            toastClassName="font-body"
          />
        </Providers>
      </body>
    </html>
  )
}