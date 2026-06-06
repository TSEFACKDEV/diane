import nodemailer from 'nodemailer'
export const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export interface MailOptions {
  to:       string
  subject:  string
  html:     string
  replyTo?: string
}

export async function sendMail({ to, subject, html, replyTo }: MailOptions) {
  return transporter.sendMail({
    from:    process.env.SMTP_FROM,
    to,
    subject,
    html,
    replyTo,
  })
}

// ── Templates ────────────────────────────────────────────────────────────────

export function contactEmailTemplate(name: string, email: string, subject: string, message: string) {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head><meta charset="UTF-8"><style>
      body { font-family: 'DM Sans', Arial, sans-serif; background: #FAF7F2; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(107,45,62,0.12); }
      .header { background: #6B2D3E; padding: 32px 40px; text-align: center; }
      .header h1 { color: #C9A84C; font-size: 22px; margin: 0; letter-spacing: 1px; }
      .body { padding: 32px 40px; color: #3A3A3A; }
      .field { margin-bottom: 16px; }
      .label { font-weight: 600; color: #6B2D3E; font-size: 13px; text-transform: uppercase; letter-spacing: .5px; }
      .value { margin-top: 4px; font-size: 15px; line-height: 1.6; }
      .message-box { background: #FAF7F2; border-left: 3px solid #C9A84C; padding: 16px; border-radius: 4px; }
      .footer { background: #F5F0EB; padding: 20px 40px; text-align: center; font-size: 12px; color: #888; }
    </style></head>
    <body>
      <div class="container">
        <div class="header"><h1>Heritage & Expertise — Nouveau Message</h1></div>
        <div class="body">
          <div class="field"><div class="label">De</div><div class="value">${name} &lt;${email}&gt;</div></div>
          <div class="field"><div class="label">Sujet</div><div class="value">${subject}</div></div>
          <div class="field"><div class="label">Message</div><div class="value message-box">${message.replace(/\n/g, '<br>')}</div></div>
        </div>
        <div class="footer">Heritage & Expertise · contact@heritage-expertise.com</div>
      </div>
    </body>
    </html>
  `
}

export function newsletterConfirmTemplate(email: string, confirmUrl: string) {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head><meta charset="UTF-8"><style>
      body { font-family: Arial, sans-serif; background: #FAF7F2; margin: 0; }
      .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(107,45,62,0.12); }
      .header { background: #6B2D3E; padding: 32px 40px; text-align: center; }
      .header h1 { color: #C9A84C; font-size: 22px; margin: 0; }
      .body { padding: 32px 40px; color: #3A3A3A; text-align: center; }
      .btn { display: inline-block; background: #6B2D3E; color: #fff; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 24px; }
      .footer { background: #F5F0EB; padding: 20px; text-align: center; font-size: 12px; color: #888; }
    </style></head>
    <body>
      <div class="container">
        <div class="header"><h1>Confirmez votre inscription</h1></div>
        <div class="body">
          <p>Merci de rejoindre la communauté Heritage & Expertise !</p>
          <p>Cliquez ci-dessous pour confirmer votre adresse <strong>${email}</strong>.</p>
          <a href="${confirmUrl}" class="btn">Confirmer mon inscription</a>
          <p style="margin-top:24px;font-size:13px;color:#888;">Ce lien expire dans 24h.</p>
        </div>
        <div class="footer">Heritage & Expertise · Si vous n'avez pas demandé cette inscription, ignorez cet email.</div>
      </div>
    </body>
    </html>
  `
}