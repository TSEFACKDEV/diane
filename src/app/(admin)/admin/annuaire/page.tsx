import { prisma } from '@/lib/prisma'
import Link       from 'next/link'
import { Building2, Globe, MapPin } from 'lucide-react'
import OrgActions from './OrgActions'

export const dynamic = 'force-dynamic'

interface AnnuairePageProps {
  searchParams: Promise<{ page?: string; status?: string; country?: string; sector?: string }>
}

const STATUS_LABELS: Record<string, string> = {
  PENDING:  'En attente',
  APPROVED: 'Approuvée',
  REJECTED: 'Rejetée',
}

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  PENDING:  { bg: 'rgba(245,158,11,0.1)', color: '#d97706' },
  APPROVED: { bg: 'rgba(34,197,94,0.1)', color: '#16a34a' },
  REJECTED: { bg: 'rgba(239,68,68,0.1)', color: '#dc2626' },
}

async function getOrgs(page: number, status?: string, country?: string, sector?: string) {
  const limit = 15
  const where: Record<string, unknown> = {}
  if (status)  where.status  = status
  if (country) where.country = country
  if (sector)  where.sector  = sector

  const [total, pending, approved, rejected, orgs] = await Promise.all([
    prisma.organization.count({ where }),
    prisma.organization.count({ where: { status: 'PENDING' } }),
    prisma.organization.count({ where: { status: 'APPROVED' } }),
    prisma.organization.count({ where: { status: 'REJECTED' } }),
    prisma.organization.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip:    (page - 1) * limit,
      take:    limit,
    }),
  ])

  return { orgs, total, pending, approved, rejected, totalPages: Math.ceil(total / limit) }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date))
}

export default async function AdminAnnuairePage({ searchParams }: AnnuairePageProps) {
  const params  = await searchParams
  const page    = Math.max(1, parseInt(params.page ?? '1'))
  const status  = params.status
  const country = params.country
  const sector  = params.sector

  const { orgs, total, pending, approved, rejected, totalPages } = await getOrgs(page, status, country, sector)

  return (
    <div style={{ fontFamily: 'var(--font-dm-sans)' }}>

      {/* En-tête */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', fontWeight: 700, color: '#1C0F14', marginBottom: '0.25rem' }}>
          Annuaire des organisations
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'rgba(28,15,20,0.5)' }}>{total} organisation{total > 1 ? 's' : ''}</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
        {[
          { label: 'En attente', value: pending,  color: '#d97706', bg: 'rgba(245,158,11,0.08)' },
          { label: 'Approuvées', value: approved, color: '#16a34a', bg: 'rgba(34,197,94,0.08)' },
          { label: 'Rejetées',   value: rejected, color: '#dc2626', bg: 'rgba(239,68,68,0.08)' },
          { label: 'Total',      value: total,    color: '#6B2D3E', bg: 'rgba(107,45,62,0.08)' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '1.25rem', border: '1px solid rgba(28,15,20,0.06)', boxShadow: '0 2px 6px rgba(28,15,20,0.04)' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: color, marginBottom: '0.75rem' }} />
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1C0F14', lineHeight: 1, marginBottom: '0.25rem' }}>{value}</p>
            <p style={{ fontSize: '0.8125rem', color: 'rgba(28,15,20,0.5)' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Filtres */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {[
          { label: 'Toutes',       href: '/admin/annuaire',                    active: !status },
          { label: 'En attente',   href: '/admin/annuaire?status=PENDING',     active: status === 'PENDING' },
          { label: 'Approuvées',   href: '/admin/annuaire?status=APPROVED',    active: status === 'APPROVED' },
          { label: 'Rejetées',     href: '/admin/annuaire?status=REJECTED',    active: status === 'REJECTED' },
        ].map(({ label, href, active: isActive }) => (
          <Link key={label} href={href} style={{
            padding: '0.375rem 0.875rem', borderRadius: '6px', fontSize: '0.8125rem',
            fontWeight: isActive ? 600 : 400, textDecoration: 'none',
            backgroundColor: isActive ? '#6B2D3E' : '#fff', color: isActive ? '#fff' : 'rgba(28,15,20,0.65)',
            border: `1px solid ${isActive ? '#6B2D3E' : 'rgba(28,15,20,0.12)'}`,
          }}>{label}</Link>
        ))}
      </div>

      {/* Cartes organisations */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {orgs.length === 0 ? (
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid rgba(28,15,20,0.06)', padding: '4rem 2rem', textAlign: 'center' }}>
            <Building2 size={40} color="rgba(28,15,20,0.2)" style={{ margin: '0 auto 1rem' }} />
            <p style={{ color: 'rgba(28,15,20,0.4)', fontSize: '0.9375rem' }}>Aucune organisation</p>
          </div>
        ) : orgs.map((org) => {
          const ss = STATUS_STYLES[org.status] ?? STATUS_STYLES.PENDING
          return (
            <div key={org.id} style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid rgba(28,15,20,0.06)', boxShadow: '0 2px 6px rgba(28,15,20,0.04)', padding: '1.25rem 1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#1C0F14' }}>{org.name}</span>
                    <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '999px', fontWeight: 600, backgroundColor: ss.bg, color: ss.color }}>
                      {STATUS_LABELS[org.status]}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: org.description ? '0.5rem' : 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <MapPin size={13} color="rgba(28,15,20,0.4)" />
                      <span style={{ fontSize: '0.8125rem', color: 'rgba(28,15,20,0.6)' }}>{org.country}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <Building2 size={13} color="rgba(28,15,20,0.4)" />
                      <span style={{ fontSize: '0.8125rem', color: 'rgba(28,15,20,0.6)' }}>{org.sector}</span>
                    </div>
                    {org.website && (
                      <a href={org.website} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', textDecoration: 'none' }}>
                        <Globe size={13} color="#6B2D3E" />
                        <span style={{ fontSize: '0.8125rem', color: '#6B2D3E' }}>Site web</span>
                      </a>
                    )}
                  </div>
                  {org.description && (
                    <p style={{ fontSize: '0.8125rem', color: 'rgba(28,15,20,0.55)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {org.description}
                    </p>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(28,15,20,0.4)', whiteSpace: 'nowrap' }}>{formatDate(org.createdAt)}</span>
                  <OrgActions id={org.id} status={org.status} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <Link key={p} href={`/admin/annuaire?page=${p}${status ? `&status=${status}` : ''}`} style={{
              padding: '0.5rem 0.875rem', borderRadius: '6px', fontSize: '0.875rem',
              fontWeight: p === page ? 700 : 400, textDecoration: 'none',
              backgroundColor: p === page ? '#6B2D3E' : '#fff',
              color: p === page ? '#fff' : 'rgba(28,15,20,0.65)',
              border: '1px solid rgba(28,15,20,0.12)',
            }}>{p}</Link>
          ))}
        </div>
      )}
    </div>
  )
}