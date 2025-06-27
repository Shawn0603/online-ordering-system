import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma/client'
const prisma = new PrismaClient()

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const admin = await prisma.admin.findUnique({ where: { email } })

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET!, { expiresIn: '1d' })

  return NextResponse.json({ token })
}
