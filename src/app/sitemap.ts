import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.diane-ndeuna.com'

// Routes statiques publiques
const staticRoutes = [
  { path: '/',              priority: 1.0,  changeFrequency: 'weekly'  },
  { path: '/a-propos',      priority: 0.9,  changeFrequency: 'monthly' },
  { path: '/expertises',    priority: 0.9,  changeFrequency: 'monthly' },
  { path: '/expertises/structuration', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/expertises/projets',       priority: 0.8, changeFrequency: 'monthly' },
  { path: '/expertises/formation',     priority: 0.8, changeFrequency: 'monthly' },
  { path: '/expertises/conseil',       priority: 0.8, changeFrequency: 'monthly' },
  { path: '/ecosysteme',    priority: 0.8,  changeFrequency: 'monthly' },
  { path: '/ressources',    priority: 0.8,  changeFrequency: 'weekly'  },
  { path: '/blog',          priority: 0.9,  changeFrequency: 'daily'   },
  { path: '/annuaire',      priority: 0.7,  changeFrequency: 'weekly'  },
  { path: '/partenariats',  priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/medias',        priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/contact',       priority: 0.8,  changeFrequency: 'yearly'  },
  { path: '/diagnostic',    priority: 0.8,  changeFrequency: 'monthly' },
] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Routes statiques
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ path, priority, changeFrequency }) => ({
    url:              `${BASE_URL}${path}`,
    lastModified:     now,
    changeFrequency:  changeFrequency as MetadataRoute.Sitemap[number]['changeFrequency'],
    priority,
  }))

  // Articles publiés (dynamiques)
  let articleEntries: MetadataRoute.Sitemap = []
  try {
    const articles = await prisma.article.findMany({
      where:   { isPublished: true },
      select:  { slug: true, updatedAt: true },
      orderBy: { publishedAt: 'desc' },
    })
    articleEntries = articles.map(({ slug, updatedAt }) => ({
      url:             `${BASE_URL}/blog/${slug}`,
      lastModified:    updatedAt,
      changeFrequency: 'weekly' as const,
      priority:        0.7,
    }))
  } catch {
    // En cas d'erreur BDD (build sans DB), on ignore les articles
  }

  return [...staticEntries, ...articleEntries]
}
