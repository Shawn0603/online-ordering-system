// src/app/api/orders/route.ts
import { PrismaClient } from '@/generated/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()


export async function POST(req: Request) {
  try {
    const { userId, items } = await req.json()

    if (!Array.isArray(items) || items.length === 0) {
      return new NextResponse('Invalid request data', { status: 400 })
    }

    let validUserId = userId

    if (userId) {
      const user = await prisma.user.findUnique({ where: { id: userId } })
      if (!user) {
        validUserId = uuidv4()
        await prisma.user.create({
          data: {
            id: validUserId,
            email: `guest-${Date.now()}@example.com`,
            name: 'Guest',
          },
        })
      }
    } else {
      validUserId = uuidv4()
      await prisma.user.create({
        data: {
          id: validUserId,
          email: `guest-${Date.now()}@example.com`,
          name: 'Guest',
        },
      })
    }

    const order = await prisma.order.create({
      data: {
        userId: validUserId,
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


export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId')

    if (!userId) {
      return new NextResponse('Missing userId', { status: 400 })
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            dish: true,
          },
        },
      },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return new NextResponse('Failed to fetch orders', { status: 500 })
  }
}
