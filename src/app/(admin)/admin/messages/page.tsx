import { prisma }     from '@/lib/prisma'
import Link           from 'next/link'
import { MessageSquare } from 'lucide-react'
import MessageActions from './MessageActions'

export const dynamic = 'force-dynamic'

interface MessagesPageProps {
  searchParams: Promise<{ page?: string; status?: string }>
}

const STATUS_LABELS: Record<string, string> = {
  UNREAD:   'Non lu',
  READ:     'Lu',
  ARCHIVED: 'Archivé',
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  UNREAD:   { bg: 'rgba(107,45,62,0.1)',  color: '#6B2D3E' },
  READ:     { bg: 'rgba(34,197,94,0.1)',  color: '#16a34a' },
  ARCHIVED: { bg: 'rgba(28,15,20,0.07)', color: 'rgba(28,15,20,0.45)' },
}

async function getMessages(page: number, status?: string) {
  const limit = 15
  const where: Record<string, unknown> = {}
  if (status) where.status = status

  const [total, messages] = await Promise.all([
    prisma.contactMessage.count({ where }),
    prisma.contactMessage.findMany({
      where,
      orderBy: { sentAt: 'desc' },
      skip:    (page - 1) * limit,
      take:    limit,
    }),
  ])

  return { messages, total, totalPages: Math.ceil(total / limit) }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(date))
}

export default async function AdminMessagesPage({ searchParams }: MessagesPageProps) {
  const params = await searchParams
  const page   = Math.max(1, parseInt(params.page ?? '1'))
  const status = params.status

  const { messages, total, totalPages } = await getMessages(page, status)

  return (
    <div style={{ fontFamily: 'var(--font-dm-sans)' }}>

      {/* En-tête */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', fontWeight: 700, color: '#1C0F14', marginBottom: '0.25rem' }}>
          Messages de contact
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'rgba(28,15,20,0.5)' }}>{total} message{total > 1 ? 's' : ''}</p>
      </div>

      {/* Filtres */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {[
          { label: 'Tous',     href: '/admin/messages',                  active: !status },
          { label: 'Non lus',  href: '/admin/messages?status=UNREAD',    active: status === 'UNREAD' },
          { label: 'Lus',      href: '/admin/messages?status=READ',      active: status === 'READ' },
          { label: 'Archivés', href: '/admin/messages?status=ARCHIVED',  active: status === 'ARCHIVED' },
        ].map(({ label, href, active }) => (
          <Link key={label} href={href} style={{
            padding: '0.375rem 0.875rem', borderRadius: '6px', fontSize: '0.8125rem',
            fontWeight: active ? 600 : 400, textDecoration: 'none',
            backgroundColor: active ? '#6B2D3E' : '#fff',
            color: active ? '#fff' : 'rgba(28,15,20,0.65)',
            border: `1px solid ${active ? '#6B2D3E' : 'rgba(28,15,20,0.12)'}`,
          }}>
            {label}
          </Link>
        ))}
      </div>

      {/* Cartes messages */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {messages.length === 0 ? (
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid rgba(28,15,20,0.06)', padding: '4rem 2rem', textAlign: 'center' }}>
            <MessageSquare size={40} color="rgba(28,15,20,0.2)" style={{ margin: '0 auto 1rem' }} />
            <p style={{ color: 'rgba(28,15,20,0.4)', fontSize: '0.9375rem' }}>Aucun message</p>
          </div>
        ) : messages.map((msg) => {
          const sc = STATUS_COLORS[msg.status] ?? STATUS_COLORS.READ
          return (
            <div key={msg.id} style={{
              backgroundColor: '#fff',
              borderRadius:    '12px',
              border:          `1px solid ${msg.status === 'UNREAD' ? 'rgba(107,45,62,0.2)' : 'rgba(28,15,20,0.06)'}`,
              boxShadow:       '0 2px 6px rgba(28,15,20,0.04)',
              padding:         '1.25rem 1.5rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#1C0F14' }}>{msg.name}</span>
                    <a href={`mailto:${msg.email}`} style={{ fontSize: '0.8125rem', color: '#6B2D3E', textDecoration: 'none' }}>{msg.email}</a>
                    <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '999px', fontWeight: 600, backgroundColor: sc.bg, color: sc.color }}>
                      {STATUS_LABELS[msg.status]}
                    </span>
                  </div>
                  <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1C0F14', marginBottom: '0.5rem' }}>{msg.subject}</p>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(28,15,20,0.65)', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {msg.message}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(28,15,20,0.4)', whiteSpace: 'nowrap' }}>{formatDate(msg.sentAt)}</span>
                  <MessageActions id={msg.id} status={msg.status} />
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
            <Link key={p} href={`/admin/messages?page=${p}${status ? `&status=${status}` : ''}`} style={{
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