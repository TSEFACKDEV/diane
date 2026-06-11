import { NextRequest, NextResponse } from 'next/server'
import { prisma }       from '@/lib/prisma'
import { hashPassword } from '@/lib/bcrypt'
import { registerSchema } from '@/lib/validations'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    await registerSchema.validate(body, { abortEarly: false })

    const { name, email, password } = body

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ success: false, message: 'Un compte existe déjà avec cet email' }, { status: 409 })
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: 'VISITOR' },
      select: { id: true, name: true, email: true, role: true },
    })

    return NextResponse.json({ success: true, user }, { status: 201 })
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 })
    }
    console.error('[REGISTER]', error)
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 })
  }
}
