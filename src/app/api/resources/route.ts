import { NextRequest, NextResponse } from 'next/server'
import { prisma }      from '@/lib/prisma'
import { verifyToken } from '@/lib/jwt'

function getAdminUser(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  if (!token) return null
  try {
    const payload = verifyToken(token)
    if (payload.role !== 'ADMIN' && payload.role !== 'SUPER_ADMIN') return null
    return payload
  } catch { return null }
}

// GET /api/resources — liste paginée
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page     = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
  const limit    = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '12')))
  const type     = searchParams.get('type') ?? undefined
  const theme    = searchParams.get('theme') ?? undefined
  const language = searchParams.get('language') ?? undefined
  const all      = searchParams.get('all') === 'true'

  const admin = getAdminUser(req)

  const where: Record<string, unknown> = {}
  if (!all || !admin) where.isPublished = true
  if (type)     where.type     = type
  if (theme)    where.theme    = theme
  if (language) where.language = language

  const [total, data] = await Promise.all([
    prisma.resource.count({ where }),
    prisma.resource.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip:    (page - 1) * limit,
      take:    limit,
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

// POST /api/resources — créer une ressource (admin)
export async function POST(req: NextRequest) {
  const admin = getAdminUser(req)
  if (!admin) return NextResponse.json({ success: false, message: 'Non autorisé' }, { status: 401 })

  try {
    const body = await req.json()
    const { title, description, type, fileUrl, isPremium, theme, language, isPublished } = body

    if (!title || !type || !fileUrl) {
      return NextResponse.json({ success: false, message: 'Titre, type et URL fichier sont requis' }, { status: 400 })
    }

    const resource = await prisma.resource.create({
      data: {
        title,
        description: description ?? null,
        type,
        fileUrl,
        isPremium:   isPremium   ?? false,
        theme:       theme       ?? null,
        language:    language    ?? 'fr',
        isPublished: isPublished ?? true,
      },
    })

    return NextResponse.json({ success: true, data: resource }, { status: 201 })
  } catch (error: any) {
    console.error('[RESOURCES POST]', error)
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 })
  }
}
