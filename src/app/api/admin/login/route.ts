import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    })

    if (!admin) {
      return NextResponse.json({ message: 'Admin not found' }, { status: 404 })
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
      return NextResponse.json({ message: 'Incorrect password' }, { status: 401 })
    }

    const token = jwt.sign(
      { adminId: admin.id, email: admin.email, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '1h' }
    )

    return NextResponse.json({ token }, { status: 200 })
  } catch (error) {
    console.error('[ADMIN_LOGIN_ERROR]', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
