import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const dishes = await prisma.dish.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(dishes)
  } catch (err) {
    return new NextResponse('Server error', { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  const { id } = await req.json()

  if (!id) {
    return new NextResponse('Item ID is missing', { status: 400 })
  }

  try {
    await prisma.dish.update({
      where: { id },
      data: { available: false },
    })
    return new NextResponse('Taken down', { status: 200 })
  } catch (err) {
    return new NextResponse('Update failed', { status: 500 })
  }
}
