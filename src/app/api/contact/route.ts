import { NextRequest, NextResponse } from 'next/server'
import { prisma }  from '@/lib/prisma'
import { sendMail, contactEmailTemplate } from '@/lib/mailer'
import { contactSchema } from '@/lib/validations'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    await contactSchema.validate(body, { abortEarly: false })

    const { name, email, subject, message } = body

    // Sauvegarder en BDD
    await prisma.contactMessage.create({ data: { name, email, subject, message } })

    // Envoyer mail à l'admin
    await sendMail({
      to:      process.env.ADMIN_EMAIL!,
      subject: `[Heritage & Expertise] ${subject}`,
      html:    contactEmailTemplate(name, email, subject, message),
      replyTo: email,
    })

    return NextResponse.json({ success: true, message: 'Message envoyé avec succès !' })
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 })
    }
    console.error('[CONTACT API]', error)
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 })
  }
}