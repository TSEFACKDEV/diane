# 🌍 Heritage & Expertise — Site Web Diane NDEUNA

> Architecte de Systèmes Organisationnels — Leadership féminin africain

**Stack :** Next.js 14 · TypeScript · Prisma 7 · MySQL · Tailwind CSS · Redux Toolkit · Framer Motion  
**Version :** 1.0.0 | **Début :** Mai 2026

---

## 🚀 Installation

```bash
git clone <repo-url>
cd heritage-expertise
npm install
cp .env.example .env      # Remplir les variables
npx prisma generate
npx prisma db seed
npm run dev
```

---

## 👥 Équipe & Répartition des Tâches

### 🔴 KLEIN — Chef de Projet (Branche : `feature/klein/core-architecture`)

Klein est responsable de tout ce qui est architecture, sécurité, API et admin.

#### Semaine 1–2 : Architecture & Sécurité

| Tâche | Fichier(s) | Priorité |
|-------|-----------|----------|
| Navbar responsive avec menu mobile | `src/components/layout/Navbar.tsx` | 🔴 Haute |
| Footer complet | `src/components/layout/Footer.tsx` | 🔴 Haute |
| AdminSidebar + AdminHeader | `src/components/admin/AdminSidebar.tsx` | 🔴 Haute |
| Middleware JWT complet | `src/middleware.ts` | 🔴 Haute |
| Hook useAuth | `src/hooks/useAuth.ts` | 🔴 Haute |
| Page Login Admin | `src/app/(auth)/login/page.tsx` | 🔴 Haute |

#### Semaine 2–3 : API & Back-office

| Tâche | Fichier(s) | Priorité |
|-------|-----------|----------|
| API Articles (CRUD) | `src/app/api/articles/route.ts` | 🔴 Haute |
| API Resources (CRUD) | `src/app/api/resources/route.ts` | 🔴 Haute |
| API Organizations (modération) | `src/app/api/organizations/route.ts` | 🔴 Haute |
| Admin Dashboard | `src/app/(admin)/dashboard/page.tsx` | 🔴 Haute |
| Admin Articles page | `src/app/(admin)/articles/page.tsx` | 🔴 Haute |
| Admin Messages page | `src/app/(admin)/messages/page.tsx` | 🔴 Haute |
| Admin Newsletter page | `src/app/(admin)/newsletter/page.tsx` | 🟡 Moyenne |
| Admin Annuaire page | `src/app/(admin)/annuaire/page.tsx` | 🟡 Moyenne |

#### Semaine 3–4 : Fonctionnalités avancées

| Tâche | Fichier(s) | Priorité |
|-------|-----------|----------|
| Système d'upload fichiers | `src/app/api/upload/route.ts` | 🔴 Haute |
| Auto-diagnostic (logique scoring) | `src/app/api/diagnostic/route.ts` | 🟡 Moyenne |
| Internationalisation i18n | `src/middleware.ts` + config | 🟢 Basse |
| Optimisation SEO (sitemap, robots) | `src/app/sitemap.ts` | 🟡 Moyenne |

**Comment travailler :**
```bash
git checkout feature/klein/core-architecture
# Créer un commit par tâche complète :
git commit -m "feat(admin): dashboard avec statistiques"
# Push régulier :
git push origin feature/klein/core-architecture
```

---

### 🟡 EUNICE — Développeuse Junior (Branche : `feature/eunice/public-pages`)

Eunice est responsable des pages publiques statiques et semi-dynamiques.

#### Priorité 1 : Pages principales (Semaine 1–2)

| Tâche | Fichier | Comment faire |
|-------|---------|--------------|
| Page Accueil (Hero + sections) | `src/app/(main)/page.tsx` | Utiliser les composants `HeroSection`, `StatsSection`, créés par Lethicia |
| Page À Propos | `src/app/(main)/a-propos/page.tsx` | Layout 2 colonnes : bio à gauche, photo à droite |
| Page Expertises (liste) | `src/app/(main)/expertises/page.tsx` | Grid 4 cartes avec icones Lucide React |
| Page Expertise (détail) | `src/app/(main)/expertises/[slug]/page.tsx` | Route dynamique — utiliser `generateStaticParams` |

#### Priorité 2 : Contenu éditorial (Semaine 2–3)

| Tâche | Fichier | Comment faire |
|-------|---------|--------------|
| Page Écosystème (EDEN, ADEF, OSCF, MAMIZA) | `src/app/(main)/ecosysteme/page.tsx` | 4 cards avec téléchargement PDF |
| Page Partenariats | `src/app/(main)/partenariats/page.tsx` | Logos grid + testimonials |
| Page Médias | `src/app/(main)/medias/page.tsx` | Galerie photos + presse |
| Mentions légales | `src/app/(main)/mentions-legales/page.tsx` | Texte simple formaté |

#### Priorité 3 : Blog & Annuaire (Semaine 3–4)

| Tâche | Fichier | Comment faire |
|-------|---------|--------------|
| Page Blog (liste) | `src/app/(main)/blog/page.tsx` | Fetch API `/api/articles` avec pagination |
| Page Article (détail) | `src/app/(main)/blog/[slug]/page.tsx` | Rendu Markdown + partage |
| Page Annuaire | `src/app/(main)/annuaire/page.tsx` | Liste filtrée via Redux `directoryFilter` |

**Guide Eunice — Import de composants :**
```typescript
// Toujours importer depuis @/components
import { Button }   from '@/components/ui/Button'
import { Card }     from '@/components/ui/Card'
import { FadeInUp } from '@/components/ui/FadeInUp'

// Appels API — toujours utiliser fetch avec gestion d'erreur :
const res  = await fetch('/api/articles?page=1&limit=9')
const data = await res.json()
```

---

### 🟢 LETHICIA — Développeuse Junior (Branche : `feature/lethicia/forms-and-components`)

Lethicia est responsable de tous les composants UI réutilisables et les formulaires.

#### Priorité 1 : Composants UI de base (Semaine 1)

| Tâche | Fichier | Specs |
|-------|---------|-------|
| Bouton (3 variants) | `src/components/ui/Button.tsx` | `primary`, `secondary`, `gold` — voir globals.css |
| Card | `src/components/ui/Card.tsx` | Hover scale, shadow bordeaux |
| Badge | `src/components/ui/Badge.tsx` | Variants : `burgundy`, `gold`, `rose` |
| Input | `src/components/ui/Input.tsx` | États : normal, focus, error |
| FadeInUp (animation) | `src/components/ui/FadeInUp.tsx` | Framer Motion scroll reveal |
| SectionTitle | `src/components/ui/SectionTitle.tsx` | Titre + divider doré |
| GoldDivider | `src/components/ui/GoldDivider.tsx` | Séparateur décoratif |
| Spinner | `src/components/ui/Spinner.tsx` | Loader bordeaux |

#### Priorité 2 : Sections Homepage (Semaine 1–2)

| Tâche | Fichier | Specs |
|-------|---------|-------|
| HeroSection | `src/components/sections/HeroSection.tsx` | Layout 60/40 — claim fort + CTA |
| StatsSection | `src/components/sections/StatsSection.tsx` | 4 counters animés (200+, 85%, 2000+, 50+) |
| ExpertiseSection | `src/components/sections/ExpertiseSection.tsx` | Grid 4 cartes |
| TestimonialsSection | `src/components/sections/TestimonialsSection.tsx` | Carousel témoignages |
| NewsletterSection | `src/components/sections/NewsletterSection.tsx` | Form inline + CTA |

#### Priorité 3 : Formulaires (Semaine 2–3)

| Tâche | Fichier | Librairies |
|-------|---------|-----------|
| Formulaire de Contact | `src/components/forms/ContactForm.tsx` | Formik + Yup + Toastify |
| Formulaire Newsletter | `src/components/forms/NewsletterForm.tsx` | Formik + Yup + Toastify |
| Formulaire Inscription Orga | `src/components/forms/OrganizationForm.tsx` | Formik + Yup |
| Diagnostic (questionnaire) | `src/components/forms/DiagnosticForm.tsx` | Redux + étapes |

#### Priorité 4 : Composants avancés (Semaine 3–4)

| Tâche | Fichier | Specs |
|-------|---------|-------|
| ShareButtons | `src/components/shared/ShareButtons.tsx` | LinkedIn, Twitter, Facebook, WhatsApp |
| ResourceCard | `src/components/shared/ResourceCard.tsx` | Card ressource avec type et download |
| ArticleCard | `src/components/shared/ArticleCard.tsx` | Card blog avec image et catégorie |
| OrganizationCard | `src/components/shared/OrganizationCard.tsx` | Card annuaire avec pays/secteur |

**Guide Lethicia — Template d'un composant UI :**
```typescript
// src/components/ui/Button.tsx
'use client'
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold'
  size?:    'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, className, children, ...props }, ref) => {
    const variants = {
      primary:   'btn-primary',
      secondary: 'btn-secondary',
      gold:      'btn-gold',
    }
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }
    return (
      <button
        ref={ref}
        className={cn(variants[variant], sizes[size], className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? <span className="animate-spin">⏳</span> : children}
      </button>
    )
  }
)
Button.displayName = 'Button'
```

**Guide Lethicia — Formulaire Formik + Yup :**
```typescript
// Exemple de formulaire standard
'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { contactSchema } from '@/lib/validations'
import { toast }         from 'react-toastify'
import { Button }        from '@/components/ui/Button'

export function ContactForm() {
  const handleSubmit = async (values: any, { resetForm, setSubmitting }: any) => {
    try {
      const res  = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(values),
      })
      const data = await res.json()

      if (data.success) {
        toast.success('Message envoyé avec succès !')
        resetForm()
      } else {
        toast.error(data.message || 'Une erreur est survenue')
      }
    } catch {
      toast.error('Erreur de connexion')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={{ name: '', email: '', subject: '', message: '' }}
      validationSchema={contactSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <Field name="name" className="input-field" placeholder="Votre nom complet" />
            <ErrorMessage name="name" component="p" className="text-red-500 text-sm mt-1" />
          </div>
          {/* Répéter pour email, subject, message */}
          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Envoyer le message
          </Button>
        </Form>
      )}
    </Formik>
  )
}
```

---

## 📁 Structure du Projet
heritage-expertise/
├── prisma/
│   ├── schema.prisma        # Schéma BDD
│   └── seed/seed.ts         # Admin initial
├── src/
│   ├── app/
│   │   ├── (main)/          # Pages publiques → EUNICE
│   │   ├── (auth)/          # Login/Register → KLEIN
│   │   ├── (admin)/         # Back-office → KLEIN
│   │   └── api/             # API Routes → KLEIN
│   ├── components/
│   │   ├── ui/              # Composants de base → LETHICIA
│   │   ├── layout/          # Navbar, Footer → KLEIN
│   │   ├── sections/        # Sections HP → LETHICIA
│   │   ├── forms/           # Formulaires → LETHICIA
│   │   ├── admin/           # Composants admin → KLEIN
│   │   └── shared/          # Composants partagés → LETHICIA
│   ├── store/               # Redux → KLEIN
│   ├── lib/                 # Utilitaires → KLEIN
│   ├── hooks/               # Custom hooks → KLEIN
│   ├── types/               # TypeScript types → KLEIN
│   ├── config/              # Navigation, constantes → KLEIN
│   └── styles/              # globals.css → KLEIN
├── .env                     # ⚠️ Ne jamais committer
├── .env.example             # Template env
└── tailwind.config.ts


---

## 🔀 Workflow Git

```bash
# Avant de commencer chaque jour :
git pull origin main
git merge main   # Intégrer les changements des collègues

# Après chaque tâche :
git add .
git commit -m "feat(scope): description courte"
# Exemples :
# feat(ui): composant Button avec 3 variants
# feat(form): formulaire contact avec validation Yup
# feat(admin): dashboard avec statistiques
# fix(api): correction endpoint newsletter

# Push :
git push origin feature/votre-branche
```

**Convention de commits :**
- `feat:` nouvelle fonctionnalité
- `fix:` correction de bug
- `style:` CSS/Tailwind uniquement
- `refactor:` restructuration sans changement fonctionnel
- `docs:` documentation

---

## 🎨 Design System

| Couleur | Hex | Usage |
|---------|-----|-------|
| Bordeaux | `#6B2D3E` | Primaire — boutons, titres |
| Or | `#C9A84C` | Accent — séparateurs, highlights |
| Rose | `#C4847A` | Secondaire — icônes, accents |
| Crème | `#FAF7F2` | Fond principal |
| Blanc cassé | `#FEF9F5` | Fond cartes |

**Classes utilitaires clés :**
btn-primary     → Bouton bordeaux
btn-secondary   → Bouton outline
btn-gold        → Bouton doré
card            → Carte avec hover
input-field     → Champ de formulaire
section         → Conteneur de section
section-title   → Titre de section
gold-divider    → Séparateur doré


---

## ⚙️ Commandes utiles

```bash
npm run dev              # Serveur de développement
npm run build            # Build production
npm run lint             # Vérification ESLint
npx prisma studio        # Interface BDD visuelle
npx prisma db push       # Synchroniser le schéma
npx prisma db seed       # Créer l'admin
npx prisma migrate dev   # Créer une migration
```

---

*Document réalisé par Klein — Chef de Projet · Projet Heritage & Expertise · Mai 2026*