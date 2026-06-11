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

// PATCH /api/admin/messages/[id] — changer le statut d'un message
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = getAdminUser(req)
  if (!admin) return NextResponse.json({ success: false, message: 'Non autorisé' }, { status: 401 })

  const { id } = await params
  const msg = await prisma.contactMessage.findUnique({ where: { id } })
  if (!msg) return NextResponse.json({ success: false, message: 'Message introuvable' }, { status: 404 })

  const { status } = await req.json()
  const allowed = ['UNREAD', 'READ', 'ARCHIVED']
  if (!allowed.includes(status)) {
    return NextResponse.json({ success: false, message: 'Statut invalide' }, { status: 400 })
  }

  const updated = await prisma.contactMessage.update({
    where: { id },
    data: {
      status,
      readAt: status === 'READ' ? new Date() : msg.readAt,
    },
  })

  return NextResponse.json({ success: true, data: updated })
}

// DELETE /api/admin/messages/[id]
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = getAdminUser(req)
  if (!admin) return NextResponse.json({ success: false, message: 'Non autorisé' }, { status: 401 })

  const { id } = await params
  const msg = await prisma.contactMessage.findUnique({ where: { id } })
  if (!msg) return NextResponse.json({ success: false, message: 'Message introuvable' }, { status: 404 })

  await prisma.contactMessage.delete({ where: { id } })
  return NextResponse.json({ success: true, message: 'Message supprimé' })
}
