import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'
import { prisma }      from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  if (!token) return NextResponse.json({ user: null }, { status: 401 })

  try {
    const payload = verifyToken(token)
    const user    = await prisma.user.findUnique({
      where:  { id: payload.userId },
      select: { id: true, email: true, name: true, role: true },
    })
    return NextResponse.json({ user })
  } catch {
    return NextResponse.json({ user: null }, { status: 401 })
  }
}