import { PrismaClient } from '../generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@example.com'
  const password = 'admin123'
  const hashedPassword = await bcrypt.hash(password, 10)

  const existing = await prisma.admin.findUnique({ where: { email } })
  if (existing) {
    console.log('Admin already exists.')
    return
  }

  await prisma.admin.create({
    data: {
      email,
      password: hashedPassword,
    },
  })

  console.log('Admin created:', email)
}

main()
  .catch((e) => {
    console.error('Error:', e)
  })
  .finally(() => {
    prisma.$disconnect()
  })
