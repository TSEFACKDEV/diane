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

// DELETE /api/admin/newsletter/[id]
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = getAdminUser(req)
  if (!admin) return NextResponse.json({ success: false, message: 'Non autorisé' }, { status: 401 })

  const { id } = await params
  const sub = await prisma.newsletterSubscriber.findUnique({ where: { id } })
  if (!sub) return NextResponse.json({ success: false, message: 'Abonné introuvable' }, { status: 404 })

  await prisma.newsletterSubscriber.delete({ where: { id } })
  return NextResponse.json({ success: true, message: 'Abonné supprimé' })
}
