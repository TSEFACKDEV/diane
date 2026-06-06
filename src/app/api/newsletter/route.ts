import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendMail, newsletterConfirmTemplate } from '@/lib/mailer'
import { newsletterSchema } from '@/lib/validations'
import { generateToken } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    await newsletterSchema.validate(body)

    const { email } = body
    const token     = generateToken(48)
    const confirmUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/newsletter/confirm?token=${token}`

    await prisma.newsletterSubscriber.upsert({
      where:  { email },
      update: { token, isActive: false },
      create: { email, token },
    })

    await sendMail({
      to:      email,
      subject: 'Confirmez votre inscription — Heritage & Expertise',
      html:    newsletterConfirmTemplate(email, confirmUrl),
    })

    return NextResponse.json({ success: true, pending: true })
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 })
    }
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 })
  }
}