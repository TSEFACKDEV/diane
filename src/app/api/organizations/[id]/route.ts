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

// GET /api/organizations/[id] (admin)
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = getAdminUser(req)
  if (!admin) return NextResponse.json({ success: false, message: 'Non autorisé' }, { status: 401 })

  const { id } = await params

  const org = await prisma.organization.findUnique({ where: { id } })
  if (!org) return NextResponse.json({ success: false, message: 'Organisation introuvable' }, { status: 404 })

  return NextResponse.json({ success: true, data: org })
}

// PATCH /api/organizations/[id] — changer statut ou mettre à jour (admin)
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = getAdminUser(req)
  if (!admin) return NextResponse.json({ success: false, message: 'Non autorisé' }, { status: 401 })

  const { id } = await params

  const org = await prisma.organization.findUnique({ where: { id } })
  if (!org) return NextResponse.json({ success: false, message: 'Organisation introuvable' }, { status: 404 })

  try {
    const body = await req.json()
    const allowedStatuses = ['PENDING', 'APPROVED', 'REJECTED']

    const updated = await prisma.organization.update({
      where: { id },
      data: {
        ...(body.status      !== undefined && allowedStatuses.includes(body.status) && { status: body.status }),
        ...(body.name        !== undefined && { name: body.name }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.country     !== undefined && { country: body.country }),
        ...(body.sector      !== undefined && { sector: body.sector }),
        ...(body.website     !== undefined && { website: body.website }),
      },
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (error: any) {
    console.error('[ORGANIZATIONS PATCH]', error)
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE /api/organizations/[id] (admin)
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = getAdminUser(req)
  if (!admin) return NextResponse.json({ success: false, message: 'Non autorisé' }, { status: 401 })

  const { id } = await params

  const org = await prisma.organization.findUnique({ where: { id } })
  if (!org) return NextResponse.json({ success: false, message: 'Organisation introuvable' }, { status: 404 })

  await prisma.organization.delete({ where: { id } })

  return NextResponse.json({ success: true, message: 'Organisation supprimée' })
}
