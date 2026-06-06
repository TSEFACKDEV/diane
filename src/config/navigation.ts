import { NavItem } from '@/types'

export const mainNav: NavItem[] = [
  { label: 'Accueil',      href: '/' },
  { label: 'À Propos',     href: '/a-propos' },
  {
    label: 'Expertises', href: '/expertises',
    children: [
      { label: 'Structuration d\'Organisations', href: '/expertises/structuration' },
      { label: 'Développement de Projets',       href: '/expertises/projets' },
      { label: 'Formation & Coaching',            href: '/expertises/formation' },
      { label: 'Conseil Stratégique',             href: '/expertises/conseil' },
    ],
  },
  { label: 'Écosystème',   href: '/ecosysteme' },
  { label: 'Ressources',   href: '/ressources' },
  { label: 'Blog',         href: '/blog' },
  { label: 'Annuaire',     href: '/annuaire' },
  { label: 'Partenariats', href: '/partenariats' },
  { label: 'Médias',       href: '/medias' },
]

export const adminNav: NavItem[] = [
  { label: 'Dashboard',    href: '/admin/dashboard' },
  { label: 'Articles',     href: '/admin/articles' },
  { label: 'Ressources',   href: '/admin/ressources' },
  { label: 'Messages',     href: '/admin/messages' },
  { label: 'Newsletter',   href: '/admin/newsletter' },
  { label: 'Annuaire',     href: '/admin/annuaire' },
  { label: 'Statistiques', href: '/admin/statistiques' },
  { label: 'Paramètres',   href: '/admin/parametres' },
]

export const footerNav = {
  navigation: mainNav.slice(0, 6),
  social: [
    { label: 'LinkedIn',  href: 'https://linkedin.com', icon: 'linkedin' },
    { label: 'Facebook',  href: 'https://facebook.com', icon: 'facebook' },
    { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
    { label: 'YouTube',   href: 'https://youtube.com',   icon: 'youtube' },
    { label: 'TikTok',    href: 'https://tiktok.com',    icon: 'tiktok' },
  ],
}