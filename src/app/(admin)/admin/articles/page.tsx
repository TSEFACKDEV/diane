import { prisma } from '@/lib/prisma'
import Link       from 'next/link'
import { FileText, Plus, CheckCircle, Clock, Eye } from 'lucide-react'
import { ArticleCategory } from '@/generated/prisma'
import ArticleActions from './ArticleActions'

export const dynamic = 'force-dynamic'

const CATEGORIES: ArticleCategory[] = [
  'LEADERSHIP', 'ENTREPRENEURIAT', 'FORMATION', 'CONSEIL', 'ACTUALITE', 'PUBLICATION',
]

const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  LEADERSHIP:     'Leadership',
  ENTREPRENEURIAT:'Entrepreneuriat',
  FORMATION:      'Formation',
  CONSEIL:        'Conseil',
  ACTUALITE:      'Actualité',
  PUBLICATION:    'Publication',
}

interface ArticlesPageProps {
  searchParams: Promise<{ page?: string; category?: string; status?: string }>
}

async function getArticles(page: number, category?: string, status?: string) {
  const limit = 15
  const where: Record<string, unknown> = {}
  if (category) where.category  = category
  if (status === 'published') where.isPublished = true
  if (status === 'draft')     where.isPublished = false

  const [total, articles] = await Promise.all([
    prisma.article.count({ where }),
    prisma.article.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip:    (page - 1) * limit,
      take:    limit,
      include: { author: { select: { name: true } } },
    }),
  ])

  return { articles, total, totalPages: Math.ceil(total / limit) }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date))
}

export default async function AdminArticlesPage({ searchParams }: ArticlesPageProps) {
  const params   = await searchParams
  const page     = Math.max(1, parseInt(params.page ?? '1'))
  const category = params.category
  const status   = params.status

  const { articles, total, totalPages } = await getArticles(page, category, status)

  return (
    <div style={{ fontFamily: 'var(--font-dm-sans)' }}>

      {/* En-tête */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', fontWeight: 700, color: '#1C0F14', marginBottom: '0.25rem' }}>
            Articles
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'rgba(28,15,20,0.5)' }}>{total} article{total > 1 ? 's' : ''} au total</p>
        </div>
        <Link href="/admin/articles/nouveau" style={{
          display:         'inline-flex',
          alignItems:      'center',
          gap:             '0.5rem',
          backgroundColor: '#6B2D3E',
          color:           '#fff',
          padding:         '0.625rem 1.25rem',
          borderRadius:    '8px',
          fontSize:        '0.875rem',
          fontWeight:      600,
          textDecoration:  'none',
        }}>
          <Plus size={16} /> Nouvel article
        </Link>
      </div>

      {/* Filtres */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {[
          { label: 'Tous', href: '/admin/articles', active: !category && !status },
          { label: 'Publiés',    href: '/admin/articles?status=published', active: status === 'published' },
          { label: 'Brouillons', href: '/admin/articles?status=draft',     active: status === 'draft' },
          ...CATEGORIES.map(cat => ({
            label:  CATEGORY_LABELS[cat],
            href:   `/admin/articles?category=${cat}`,
            active: category === cat,
          })),
        ].map(({ label, href, active }) => (
          <Link key={label} href={href} style={{
            padding:         '0.375rem 0.875rem',
            borderRadius:    '6px',
            fontSize:        '0.8125rem',
            fontWeight:      active ? 600 : 400,
            textDecoration:  'none',
            backgroundColor: active ? '#6B2D3E' : '#fff',
            color:           active ? '#fff' : 'rgba(28,15,20,0.65)',
            border:          `1px solid ${active ? '#6B2D3E' : 'rgba(28,15,20,0.12)'}`,
          }}>
            {label}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid rgba(28,15,20,0.06)', boxShadow: '0 2px 8px rgba(28,15,20,0.04)', overflow: 'hidden' }}>
        {articles.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <FileText size={40} color="rgba(28,15,20,0.2)" style={{ margin: '0 auto 1rem' }} />
            <p style={{ color: 'rgba(28,15,20,0.4)', fontSize: '0.9375rem' }}>Aucun article trouvé</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(28,15,20,0.06)' }}>
                {['Titre', 'Catégorie', 'Auteur', 'Statut', 'Date', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '0.875rem 1.25rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: 'rgba(28,15,20,0.45)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} style={{ borderBottom: '1px solid rgba(28,15,20,0.04)' }}>
                  <td style={{ padding: '1rem 1.25rem', maxWidth: '300px' }}>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1C0F14', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '2px' }}>
                      {article.title}
                    </p>
                    {article.excerpt && (
                      <p style={{ fontSize: '0.75rem', color: 'rgba(28,15,20,0.45)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {article.excerpt}
                      </p>
                    )}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(201,168,76,0.1)', color: '#8B6914', padding: '3px 8px', borderRadius: '5px', fontWeight: 500 }}>
                      {CATEGORY_LABELS[article.category]}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', fontSize: '0.8125rem', color: 'rgba(28,15,20,0.6)' }}>
                    {article.author.name}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      {article.isPublished
                        ? <><CheckCircle size={14} color="#22c55e" /><span style={{ fontSize: '0.8125rem', color: '#16a34a' }}>Publié</span></>
                        : <><Clock size={14} color="rgba(28,15,20,0.3)" /><span style={{ fontSize: '0.8125rem', color: 'rgba(28,15,20,0.45)' }}>Brouillon</span></>
                      }
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', fontSize: '0.8125rem', color: 'rgba(28,15,20,0.5)', whiteSpace: 'nowrap' }}>
                    {formatDate(article.createdAt)}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      {article.isPublished && (
                        <Link href={`/blog/${article.slug}`} target="_blank" style={{ color: 'rgba(28,15,20,0.4)', lineHeight: 1 }} title="Voir l'article">
                          <Eye size={15} />
                        </Link>
                      )}
                      <ArticleActions id={article.id} isPublished={article.isPublished} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <Link key={p} href={`/admin/articles?page=${p}${category ? `&category=${category}` : ''}${status ? `&status=${status}` : ''}`} style={{
              padding:         '0.5rem 0.875rem',
              borderRadius:    '6px',
              fontSize:        '0.875rem',
              fontWeight:      p === page ? 700 : 400,
              textDecoration:  'none',
              backgroundColor: p === page ? '#6B2D3E' : '#fff',
              color:           p === page ? '#fff' : 'rgba(28,15,20,0.65)',
              border:          '1px solid rgba(28,15,20,0.12)',
            }}>
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}