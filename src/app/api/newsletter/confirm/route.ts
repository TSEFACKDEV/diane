import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/?newsletter=error', req.url))
  }

  try {
    const subscriber = await prisma.newsletterSubscriber.findFirst({
      where: { token },
    })

    if (!subscriber) {
      return NextResponse.redirect(new URL('/?newsletter=error', req.url))
    }

    await prisma.newsletterSubscriber.update({
      where: { id: subscriber.id },
      data:  { isActive: true, confirmedAt: new Date(), token: null },
    })
    return NextResponse.redirect(new URL('/?newsletter=confirmed', req.url))
  } catch {
    return NextResponse.redirect(new URL('/?newsletter=error', req.url))
  }
}