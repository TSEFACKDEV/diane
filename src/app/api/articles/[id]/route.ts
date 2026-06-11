import { NextRequest, NextResponse } from 'next/server'
import { prisma }      from '@/lib/prisma'
import { verifyToken } from '@/lib/jwt'
import { articleSchema } from '@/lib/validations'
import { slugify }     from '@/lib/utils'

function getAdminUser(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  if (!token) return null
  try {
    const payload = verifyToken(token)
    if (payload.role !== 'ADMIN' && payload.role !== 'SUPER_ADMIN') return null
    return payload
  } catch { return null }
}

// GET /api/articles/[id]
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const admin = getAdminUser(req)

  const article = await prisma.article.findUnique({
    where: { id },
    include: { author: { select: { id: true, name: true, email: true } } },
  })

  if (!article) return NextResponse.json({ success: false, message: 'Article introuvable' }, { status: 404 })
  if (!article.isPublished && !admin) return NextResponse.json({ success: false, message: 'Article introuvable' }, { status: 404 })

  return NextResponse.json({ success: true, data: article })
}

// PUT /api/articles/[id] — mise à jour (admin)
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = getAdminUser(req)
  if (!admin) return NextResponse.json({ success: false, message: 'Non autorisé' }, { status: 401 })

  const { id } = await params

  try {
    const body = await req.json()

    const existing = await prisma.article.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ success: false, message: 'Article introuvable' }, { status: 404 })

    const { title, content, category, excerpt, tags, coverImage, isPublished } = body

    // Si le titre change, recalculer le slug
    let slug = existing.slug
    if (title && title !== existing.title) {
      const newSlug = slugify(title)
      const conflict = await prisma.article.findFirst({ where: { slug: newSlug, NOT: { id } } })
      slug = conflict ? `${newSlug}-${Date.now()}` : newSlug
    }

    const updated = await prisma.article.update({
      where: { id },
      data: {
        ...(title       !== undefined && { title }),
        ...(slug        !== existing.slug && { slug }),
        ...(content     !== undefined && { content }),
        ...(category    !== undefined && { category }),
        ...(excerpt     !== undefined && { excerpt }),
        ...(tags        !== undefined && { tags: JSON.stringify(tags) }),
        ...(coverImage  !== undefined && { coverImage }),
        ...(isPublished !== undefined && {
          isPublished,
          publishedAt: isPublished && !existing.publishedAt ? new Date() : existing.publishedAt,
        }),
      },
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (error: any) {
    console.error('[ARTICLES PUT]', error)
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE /api/articles/[id] — supprimer (admin)
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = getAdminUser(req)
  if (!admin) return NextResponse.json({ success: false, message: 'Non autorisé' }, { status: 401 })

  const { id } = await params

  const article = await prisma.article.findUnique({ where: { id } })
  if (!article) return NextResponse.json({ success: false, message: 'Article introuvable' }, { status: 404 })

  await prisma.article.delete({ where: { id } })

  return NextResponse.json({ success: true, message: 'Article supprimé' })
}
