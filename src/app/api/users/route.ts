// src/app/api/users/route.ts
import { PrismaClient } from '@/generated/prisma'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json()

    if (!email) {
      return new NextResponse('Email is required', { status: 400 })
    }

    const user = await prisma.user.create({
      data: { email, name },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error creating user:', error)
    return new NextResponse('Failed to create user', { status: 500 })
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return new NextResponse('Failed to fetch users', { status: 500 })
  }
}
