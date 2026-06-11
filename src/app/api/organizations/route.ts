import { NextRequest, NextResponse } from 'next/server'
import { prisma }          from '@/lib/prisma'
import { verifyToken }     from '@/lib/jwt'
import { organizationSchema } from '@/lib/validations'

function getAdminUser(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  if (!token) return null
  try {
    const payload = verifyToken(token)
    if (payload.role !== 'ADMIN' && payload.role !== 'SUPER_ADMIN') return null
    return payload
  } catch { return null }
}

// GET /api/organizations
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page    = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
  const limit   = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '12')))
  const status  = searchParams.get('status') ?? undefined
  const country = searchParams.get('country') ?? undefined
  const sector  = searchParams.get('sector') ?? undefined

  const admin = getAdminUser(req)

  const where: Record<string, unknown> = {}
  // Visiteurs non authentifiés ne voient que les organisations approuvées
  if (!admin) {
    where.status = 'APPROVED'
  } else if (status) {
    where.status = status
  }
  if (country) where.country = country
  if (sector)  where.sector  = sector

  const [total, data] = await Promise.all([
    prisma.organization.count({ where }),
    prisma.organization.findMany({
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

// POST /api/organizations — soumettre une nouvelle organisation (public)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    await organizationSchema.validate(body, { abortEarly: false })

    const { name, description, country, sector, website, contactInfo } = body

    const org = await prisma.organization.create({
      data: {
        name,
        description: description ?? null,
        country,
        sector,
        website:     website     ?? null,
        contactInfo: contactInfo ?? undefined,
        status:      'PENDING',
      },
    })

    return NextResponse.json({ success: true, data: org }, { status: 201 })
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 })
    }
    console.error('[ORGANIZATIONS POST]', error)
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 })
  }
}
