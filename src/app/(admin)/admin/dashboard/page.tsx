import { prisma } from '@/lib/prisma'
import Link       from 'next/link'
import {
  FileText, FolderOpen, MessageSquare, Mail,
  Building2, TrendingUp, Clock, CheckCircle,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getStats() {
  const [
    totalArticles, publishedArticles,
    totalResources,
    totalMessages, unreadMessages,
    totalSubscribers, activeSubscribers,
    totalOrgs, pendingOrgs,
    recentMessages, recentArticles,
  ] = await Promise.all([
    prisma.article.count(),
    prisma.article.count({ where: { isPublished: true } }),
    prisma.resource.count({ where: { isPublished: true } }),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { status: 'UNREAD' } }),
    prisma.newsletterSubscriber.count(),
    prisma.newsletterSubscriber.count({ where: { isActive: true } }),
    prisma.organization.count(),
    prisma.organization.count({ where: { status: 'PENDING' } }),
    prisma.contactMessage.findMany({
      orderBy: { sentAt: 'desc' },
      take:    5,
      select:  { id: true, name: true, email: true, subject: true, status: true, sentAt: true },
    }),
    prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
      take:    5,
      select:  { id: true, title: true, category: true, isPublished: true, createdAt: true },
    }),
  ])
  return {
    articles:      { total: totalArticles, published: publishedArticles, draft: totalArticles - publishedArticles },
    resources:     { total: totalResources },
    messages:      { total: totalMessages, unread: unreadMessages },
    subscribers:   { total: totalSubscribers, active: activeSubscribers },
    organizations: { total: totalOrgs, pending: pendingOrgs },
    recentMessages,
    recentArticles,
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date))
}

const statCards = [
  { key: 'articles',      label: 'Articles',             icon: FileText,      color: '#6B2D3E', bg: 'rgba(107,45,62,0.08)',  href: '/admin/articles' },
  { key: 'resources',     label: 'Ressources',           icon: FolderOpen,    color: '#C9A84C', bg: 'rgba(201,168,76,0.08)', href: '/admin/ressources' },
  { key: 'messages',      label: 'Messages',             icon: MessageSquare, color: '#C4847A', bg: 'rgba(196,132,122,0.08)',href: '/admin/messages' },
  { key: 'subscribers',   label: 'Abonnés newsletter',   icon: Mail,          color: '#6B2D3E', bg: 'rgba(107,45,62,0.08)',  href: '/admin/newsletter' },
  { key: 'organizations', label: 'Organisations',        icon: Building2,     color: '#C9A84C', bg: 'rgba(201,168,76,0.08)', href: '/admin/annuaire' },
]

export default async function DashboardPage() {
  const stats = await getStats()

  const statValues: Record<string, { main: number; sub?: string }> = {
    articles:      { main: stats.articles.total,      sub: `${stats.articles.published} publiés · ${stats.articles.draft} brouillons` },
    resources:     { main: stats.resources.total,     sub: 'ressources publiées' },
    messages:      { main: stats.messages.total,      sub: `${stats.messages.unread} non lus` },
    subscribers:   { main: stats.subscribers.total,   sub: `${stats.subscribers.active} confirmés` },
    organizations: { main: stats.organizations.total, sub: `${stats.organizations.pending} en attente` },
  }

  return (
    <div style={{ fontFamily: 'var(--font-dm-sans)' }}>
      {/* En-tête */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: '#1C0F14', marginBottom: '0.25rem' }}>
          Tableau de bord
        </h1>
        <p style={{ color: 'rgba(28,15,20,0.5)', fontSize: '0.875rem' }}>
          Vue d&apos;ensemble — Heritage &amp; Expertise
        </p>
      </div>

      {/* Cartes statistiques */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {statCards.map(({ key, label, icon: Icon, color, bg, href }) => {
          const val = statValues[key]
          return (
            <Link key={key} href={href} style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(28,15,20,0.06)', boxShadow: '0 2px 8px rgba(28,15,20,0.04)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <Icon size={20} color={color} />
                </div>
                <p style={{ fontSize: '2rem', fontWeight: 700, color: '#1C0F14', lineHeight: 1, marginBottom: '0.25rem' }}>{val.main}</p>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1C0F14', marginBottom: val.sub ? '0.25rem' : 0 }}>{label}</p>
                {val.sub && <p style={{ fontSize: '0.75rem', color: 'rgba(28,15,20,0.45)' }}>{val.sub}</p>}
              </div>
            </Link>
          )
        })}
      </div>

      {/* Grille inférieure */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>

        {/* Messages récents */}
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid rgba(28,15,20,0.06)', boxShadow: '0 2px 8px rgba(28,15,20,0.04)', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(28,15,20,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={16} color="#6B2D3E" />
              <span style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1C0F14' }}>Messages récents</span>
            </div>
            {stats.messages.unread > 0 && (
              <span style={{ backgroundColor: '#6B2D3E', color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '999px' }}>
                {stats.messages.unread} non lus
              </span>
            )}
          </div>
          {stats.recentMessages.length === 0 ? (
            <p style={{ padding: '1.5rem', color: 'rgba(28,15,20,0.4)', fontSize: '0.875rem', textAlign: 'center' }}>Aucun message</p>
          ) : stats.recentMessages.map((msg) => (
            <div key={msg.id} style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(28,15,20,0.04)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: msg.status === 'UNREAD' ? '#6B2D3E' : 'rgba(28,15,20,0.2)', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1C0F14', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.name}</p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(28,15,20,0.5)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.subject}</p>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'rgba(28,15,20,0.35)', flexShrink: 0 }}>{formatDate(msg.sentAt)}</span>
            </div>
          ))}
          <div style={{ padding: '0.75rem 1.5rem', borderTop: '1px solid rgba(28,15,20,0.06)' }}>
            <Link href="/admin/messages" style={{ fontSize: '0.8125rem', color: '#6B2D3E', fontWeight: 600, textDecoration: 'none' }}>Voir tous →</Link>
          </div>
        </div>

        {/* Articles récents */}
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid rgba(28,15,20,0.06)', boxShadow: '0 2px 8px rgba(28,15,20,0.04)', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(28,15,20,0.06)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={16} color="#6B2D3E" />
            <span style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1C0F14' }}>Articles récents</span>
          </div>
          {stats.recentArticles.length === 0 ? (
            <p style={{ padding: '1.5rem', color: 'rgba(28,15,20,0.4)', fontSize: '0.875rem', textAlign: 'center' }}>Aucun article</p>
          ) : stats.recentArticles.map((article) => (
            <div key={article.id} style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(28,15,20,0.04)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1C0F14', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{article.title}</p>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '2px' }}>
                  <span style={{ fontSize: '0.7rem', backgroundColor: 'rgba(201,168,76,0.12)', color: '#8B6914', padding: '1px 6px', borderRadius: '4px', fontWeight: 500 }}>{article.category}</span>
                  {article.isPublished ? <CheckCircle size={12} color="#22c55e" /> : <Clock size={12} color="rgba(28,15,20,0.35)" />}
                </div>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'rgba(28,15,20,0.35)', flexShrink: 0 }}>{formatDate(article.createdAt)}</span>
            </div>
          ))}
          <div style={{ padding: '0.75rem 1.5rem', borderTop: '1px solid rgba(28,15,20,0.06)' }}>
            <Link href="/admin/articles" style={{ fontSize: '0.8125rem', color: '#6B2D3E', fontWeight: 600, textDecoration: 'none' }}>Gérer les articles →</Link>
          </div>
        </div>

        {/* Indicateurs */}
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid rgba(28,15,20,0.06)', boxShadow: '0 2px 8px rgba(28,15,20,0.04)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <TrendingUp size={16} color="#6B2D3E" />
            <span style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1C0F14' }}>Indicateurs</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: 'Taux de publication articles',          value: stats.articles.total      ? Math.round((stats.articles.published / stats.articles.total) * 100) : 0,       color: '#6B2D3E' },
              { label: 'Taux de confirmation newsletter',       value: stats.subscribers.total   ? Math.round((stats.subscribers.active / stats.subscribers.total) * 100) : 0,    color: '#C9A84C' },
              { label: 'Messages lus',                         value: stats.messages.total      ? Math.round(((stats.messages.total - stats.messages.unread) / stats.messages.total) * 100) : 0, color: '#C4847A' },
            ].map(({ label, value, color }) => (
              <div key={label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                  <span style={{ fontSize: '0.8125rem', color: 'rgba(28,15,20,0.65)' }}>{label}</span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color }}>{value}%</span>
                </div>
                <div style={{ height: '6px', backgroundColor: 'rgba(28,15,20,0.07)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${value}%`, backgroundColor: color, borderRadius: '999px' }} />
                </div>
              </div>
            ))}
          </div>
          {stats.organizations.pending > 0 && (
            <div style={{ marginTop: '1.5rem', padding: '0.875rem 1rem', backgroundColor: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '8px' }}>
              <p style={{ fontSize: '0.8125rem', color: '#8B6914', fontWeight: 600, marginBottom: '4px' }}>
                ⏳ {stats.organizations.pending} organisation(s) en attente
              </p>
              <Link href="/admin/annuaire" style={{ fontSize: '0.75rem', color: '#C9A84C', textDecoration: 'none', fontWeight: 600 }}>Traiter →</Link>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}