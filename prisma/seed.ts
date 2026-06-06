
import 'dotenv/config'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  const password = await bcrypt.hash('Admin@2026!', 12)

  const admin = await prisma.user.upsert({
    where:  { email: 'admin@heritage-expertise.com' },
    update: {},
    create: {
      email:    'admin@heritage-expertise.com',
      password,
      name:     'Diane NDEUNA',
      role:     'SUPER_ADMIN',
    },
  })

  console.log('✅ Admin créé :', admin.email)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())