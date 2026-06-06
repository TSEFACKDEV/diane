import { NextRequest, NextResponse } from 'next/server'
import { prisma }        from '@/lib/prisma'
import { comparePassword } from '@/lib/bcrypt'
import { signToken }     from '@/lib/jwt'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ success: false, message: 'Identifiants invalides' }, { status: 401 })
    }

    const isValid = await comparePassword(password, user.password)
    if (!isValid) {
      return NextResponse.json({ success: false, message: 'Identifiants invalides' }, { status: 401 })
    }

    const token = signToken({ userId: user.id, email: user.email, role: user.role })

    const response = NextResponse.json({
      success: true,
      user:  { id: user.id, email: user.email, name: user.name, role: user.role },
      token,
    })

    response.cookies.set('token', token, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge:   7 * 24 * 60 * 60, // 7 jours
      path:     '/',
    })

    return response
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 })
  }
}