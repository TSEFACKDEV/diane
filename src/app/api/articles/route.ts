import { NextRequest, NextResponse } from 'next/server'
import { prisma }       from '@/lib/prisma'
import { verifyToken }  from '@/lib/jwt'
import { articleSchema } from '@/lib/validations'
import { slugify }      from '@/lib/utils'

function getAdminUser(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  if (!token) return null
  try {
    const payload = verifyToken(token)
    if (payload.role !== 'ADMIN' && payload.role !== 'SUPER_ADMIN') return null
    return payload
  } catch { return null }
}

// GET /api/articles — liste paginée
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page     = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
  const limit    = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '9')))
  const category = searchParams.get('category') ?? undefined
  const slug     = searchParams.get('slug') ?? undefined
  const all      = searchParams.get('all') === 'true'

  const admin = getAdminUser(req)

  // Recherche par slug (article unique)
  if (slug) {
    const article = await prisma.article.findUnique({
      where: { slug },
      include: { author: { select: { id: true, name: true, email: true } } },
    })
    if (!article) return NextResponse.json({ success: false, message: 'Article introuvable' }, { status: 404 })
    if (!article.isPublished && !admin) return NextResponse.json({ success: false, message: 'Article introuvable' }, { status: 404 })
    return NextResponse.json({ success: true, data: article })
  }

  const where: Record<string, unknown> = {}
  if (!all || !admin) where.isPublished = true
  if (category) where.category = category

  const [total, data] = await Promise.all([
    prisma.article.count({ where }),
    prisma.article.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      skip:    (page - 1) * limit,
      take:    limit,
      include: { author: { select: { id: true, name: true } } },
    }),
  ])

  return NextResponse.json({
    success: true,
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  })
}

// POST /api/articles — créer un article (admin)
export async function POST(req: NextRequest) {
  const admin = getAdminUser(req)
  if (!admin) return NextResponse.json({ success: false, message: 'Non autorisé' }, { status: 401 })

  try {
    const body = await req.json()
    await articleSchema.validate(body, { abortEarly: false })

    const { title, content, category, excerpt, tags, coverImage, isPublished } = body

    const slug = slugify(title)

    // Vérifier unicité du slug
    const existing = await prisma.article.findUnique({ where: { slug } })
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug

    const article = await prisma.article.create({
      data: {
        title,
        slug:        finalSlug,
        content,
        category,
        excerpt:     excerpt ?? null,
        tags:        tags ? JSON.stringify(tags) : null,
        coverImage:  coverImage ?? null,
        isPublished: isPublished ?? false,
        publishedAt: isPublished ? new Date() : null,
        authorId:    admin.userId,
      },
    })

    return NextResponse.json({ success: true, data: article }, { status: 201 })
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 })
    }
    console.error('[ARTICLES POST]', error)
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 })
  }
}
