import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'
import { writeFile, mkdir } from 'fs/promises'
import { join, extname }    from 'path'
import { generateToken }    from '@/lib/utils'
import sharp                from 'sharp'

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const ALLOWED_TYPES = [
  ...IMAGE_TYPES,
  'application/pdf',
  'video/mp4',
  'audio/mpeg',
  'audio/mp3',
]
const MAX_SIZE_MB = 20

export async function POST(req: NextRequest) {
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

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ success: false, message: 'Aucun fichier reçu' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ success: false, message: 'Type de fichier non autorisé' }, { status: 400 })
    }

    const sizeInMB = file.size / (1024 * 1024)
    if (sizeInMB > MAX_SIZE_MB) {
      return NextResponse.json({ success: false, message: `Fichier trop volumineux (max ${MAX_SIZE_MB} Mo)` }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const ext    = extname(file.name).toLowerCase() || '.bin'
    const name   = `${generateToken(16)}${ext}`

    const now = new Date()
    const year  = now.getFullYear().toString()
    const month = String(now.getMonth() + 1).padStart(2, '0')

    const uploadDir = join(process.cwd(), 'public', 'uploads', year, month)
    await mkdir(uploadDir, { recursive: true })

    const filePath = join(uploadDir, name)

    if (IMAGE_TYPES.includes(file.type)) {
      // Optimisation image avec sharp : max 1920px, qualité 85%
      await sharp(buffer)
        .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
        .toFormat(file.type === 'image/png' ? 'png' : 'jpeg', { quality: 85 })
        .toFile(filePath)
    } else {
      await writeFile(filePath, buffer)
    }

    const url = `/uploads/${year}/${month}/${name}`

    return NextResponse.json({
      success:  true,
      url,
      filename: name,
      size:     file.size,
      type:     file.type,
    })
  } catch (error) {
    console.error('[UPLOAD]', error)
    return NextResponse.json({ success: false, message: 'Erreur serveur lors de l\'upload' }, { status: 500 })
  }
}
