import { prisma }    from '@/lib/prisma'
import Link          from 'next/link'
import { Mail, UserCheck, UserX, Trash2 } from 'lucide-react'
import NewsletterActions from './NewsletterActions'

export const dynamic = 'force-dynamic'

interface NewsletterPageProps {
  searchParams: Promise<{ page?: string; status?: string }>
}

async function getSubscribers(page: number, status?: string) {
  const limit = 20
  const where: Record<string, unknown> = {}
  if (status === 'active')  where.isActive = true
  if (status === 'pending') where.isActive = false

  const [total, active, pending, subscribers] = await Promise.all([
    prisma.newsletterSubscriber.count({ where }),
    prisma.newsletterSubscriber.count({ where: { isActive: true } }),
    prisma.newsletterSubscriber.count({ where: { isActive: false } }),
    prisma.newsletterSubscriber.findMany({
      where,
      orderBy: { subscribedAt: 'desc' },
      skip:    (page - 1) * limit,
      take:    limit,
    }),
  ])

  return { subscribers, total, active, pending, totalPages: Math.ceil(total / limit) }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date))
}

export default async function AdminNewsletterPage({ searchParams }: NewsletterPageProps) {
  const params = await searchParams
  const page   = Math.max(1, parseInt(params.page ?? '1'))
  const status = params.status

  const { subscribers, total, active, pending, totalPages } = await getSubscribers(page, status)

  return (
    <div style={{ fontFamily: 'var(--font-dm-sans)' }}>

      {/* En-tête */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', fontWeight: 700, color: '#1C0F14', marginBottom: '0.25rem' }}>
          Newsletter
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'rgba(28,15,20,0.5)' }}>{total} abonné{total > 1 ? 's' : ''}</p>
      </div>

      {/* Stats rapides */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
        {[
          { label: 'Total',    value: total,   icon: Mail,        color: '#6B2D3E', bg: 'rgba(107,45,62,0.08)' },
          { label: 'Confirmés', value: active, icon: UserCheck,   color: '#22c55e', bg: 'rgba(34,197,94,0.08)' },
          { label: 'En attente', value: pending, icon: UserX,     color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '1.25rem', border: '1px solid rgba(28,15,20,0.06)', boxShadow: '0 2px 6px rgba(28,15,20,0.04)' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.875rem' }}>
              <Icon size={18} color={color} />
            </div>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1C0F14', lineHeight: 1, marginBottom: '0.25rem' }}>{value}</p>
            <p style={{ fontSize: '0.8125rem', color: 'rgba(28,15,20,0.5)' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Filtres */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Tous',         href: '/admin/newsletter',                  active: !status },
          { label: 'Confirmés',    href: '/admin/newsletter?status=active',    active: status === 'active' },
          { label: 'En attente',   href: '/admin/newsletter?status=pending',   active: status === 'pending' },
        ].map(({ label, href, active: isActive }) => (
          <Link key={label} href={href} style={
            { padding: '0.375rem 0.875rem', borderRadius: '6px', fontSize: '0.8125rem', fontWeight: isActive ? 600 : 400, textDecoration: 'none',
              backgroundColor: isActive ? '#6B2D3E' : '#fff', color: isActive ? '#fff' : 'rgba(28,15,20,0.65)',
              border: `1px solid ${isActive ? '#6B2D3E' : 'rgba(28,15,20,0.12)'}` }
          }>
            {label}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid rgba(28,15,20,0.06)', boxShadow: '0 2px 8px rgba(28,15,20,0.04)', overflow: 'hidden' }}>
        {subscribers.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <Mail size={40} color="rgba(28,15,20,0.2)" style={{ margin: '0 auto 1rem' }} />
            <p style={{ color: 'rgba(28,15,20,0.4)', fontSize: '0.9375rem' }}>Aucun abonné</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(28,15,20,0.06)' }}>
                {['Email', 'Statut', 'Date inscription', 'Confirmé le', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '0.875rem 1.25rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: 'rgba(28,15,20,0.45)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub) => (
                <tr key={sub.id} style={{ borderBottom: '1px solid rgba(28,15,20,0.04)' }}>
                  <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.875rem', color: '#1C0F14', fontWeight: 500 }}>{sub.email}</td>
                  <td style={{ padding: '0.875rem 1.25rem' }}>
                    <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '999px', fontWeight: 600,
                      backgroundColor: sub.isActive ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)',
                      color: sub.isActive ? '#16a34a' : '#d97706' }}>
                      {sub.isActive ? 'Confirmé' : 'En attente'}
                    </span>
                  </td>
                  <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.8125rem', color: 'rgba(28,15,20,0.5)' }}>{formatDate(sub.subscribedAt)}</td>
                  <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.8125rem', color: 'rgba(28,15,20,0.5)' }}>
                    {sub.confirmedAt ? formatDate(sub.confirmedAt) : '—'}
                  </td>
                  <td style={{ padding: '0.875rem 1.25rem' }}>
                    <NewsletterActions id={sub.id} />
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
            <Link key={p} href={`/admin/newsletter?page=${p}${status ? `&status=${status}` : ''}`} style={{
              padding: '0.5rem 0.875rem', borderRadius: '6px', fontSize: '0.875rem',
              fontWeight: p === page ? 700 : 400, textDecoration: 'none',
              backgroundColor: p === page ? '#6B2D3E' : '#fff',
              color: p === page ? '#fff' : 'rgba(28,15,20,0.65)',
              border: '1px solid rgba(28,15,20,0.12)',
            }}>
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}