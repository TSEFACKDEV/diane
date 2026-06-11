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

// GET /api/resources/[id]
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const admin = getAdminUser(req)

  const resource = await prisma.resource.findUnique({ where: { id } })
  if (!resource) return NextResponse.json({ success: false, message: 'Ressource introuvable' }, { status: 404 })
  if (!resource.isPublished && !admin) return NextResponse.json({ success: false, message: 'Ressource introuvable' }, { status: 404 })

  // Incrémenter le compteur de téléchargements si c'est un accès fichier
  const download = new URL(req.url).searchParams.get('download') === 'true'
  if (download) {
    await prisma.resource.update({ where: { id }, data: { downloads: { increment: 1 } } })
  }

  return NextResponse.json({ success: true, data: resource })
}

// PUT /api/resources/[id] — mise à jour (admin)
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = getAdminUser(req)
  if (!admin) return NextResponse.json({ success: false, message: 'Non autorisé' }, { status: 401 })

  const { id } = await params

  const existing = await prisma.resource.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ success: false, message: 'Ressource introuvable' }, { status: 404 })

  try {
    const body = await req.json()
    const updated = await prisma.resource.update({
      where: { id },
      data: {
        ...(body.title       !== undefined && { title: body.title }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.type        !== undefined && { type: body.type }),
        ...(body.fileUrl     !== undefined && { fileUrl: body.fileUrl }),
        ...(body.isPremium   !== undefined && { isPremium: body.isPremium }),
        ...(body.theme       !== undefined && { theme: body.theme }),
        ...(body.language    !== undefined && { language: body.language }),
        ...(body.isPublished !== undefined && { isPublished: body.isPublished }),
      },
    })
    return NextResponse.json({ success: true, data: updated })
  } catch (error: any) {
    console.error('[RESOURCES PUT]', error)
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE /api/resources/[id] — supprimer (admin)
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = getAdminUser(req)
  if (!admin) return NextResponse.json({ success: false, message: 'Non autorisé' }, { status: 401 })

  const { id } = await params

  const resource = await prisma.resource.findUnique({ where: { id } })
  if (!resource) return NextResponse.json({ success: false, message: 'Ressource introuvable' }, { status: 404 })

  await prisma.resource.delete({ where: { id } })

  return NextResponse.json({ success: true, message: 'Ressource supprimée' })
}
