import { NextRequest, NextResponse } from 'next/server'
import { prisma }      from '@/lib/prisma'
import { verifyToken } from '@/lib/jwt'

// GET /api/admin/stats — statistiques pour le tableau de bord (admin)
export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  if (!token) return NextResponse.json({ success: false, message: 'Non autorisé' }, { status: 401 })

  try {
    const payload = verifyToken(token)
    if (payload.role !== 'ADMIN' && payload.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ success: false, message: 'Non autorisé' }, { status: 401 })
    }
  } catch {
    return NextResponse.json({ success: false, message: 'Token invalide' }, { status: 401 })
  }

  const [
    totalArticles,
    publishedArticles,
    totalResources,
    totalMessages,
    unreadMessages,
    totalSubscribers,
    activeSubscribers,
    totalOrgs,
    pendingOrgs,
    recentMessages,
    recentArticles,
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
      select:  { id: true, title: true, slug: true, category: true, isPublished: true, createdAt: true },
    }),
  ])

  return NextResponse.json({
    success: true,
    data: {
      articles:    { total: totalArticles, published: publishedArticles, draft: totalArticles - publishedArticles },
      resources:   { total: totalResources },
      messages:    { total: totalMessages, unread: unreadMessages },
      subscribers: { total: totalSubscribers, active: activeSubscribers },
      organizations: { total: totalOrgs, pending: pendingOrgs },
      recentMessages,
      recentArticles,
    },
  })
}
