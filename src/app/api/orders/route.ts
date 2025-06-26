// src/app/api/orders/route.ts
import { PrismaClient } from '@/generated/prisma'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { userId, items } = await req.json()

    if (!userId || !Array.isArray(items) || items.length === 0) {
      return new NextResponse('Invalid request data', { status: 400 })
    }

    const order = await prisma.order.create({
      data: {
        userId,
        items: {
          create: items.map((item: { dishId: string; quantity: number }) => ({
            dishId: item.dishId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error creating order:', error)
    return new NextResponse('Failed to create order', { status: 500 })
  }
}
