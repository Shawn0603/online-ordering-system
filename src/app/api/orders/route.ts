// src/app/api/orders/route.ts
import { PrismaClient } from '@/generated/prisma'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { userId, items } = await req.json()

    console.log('Order request received')
    console.log('userId =', userId)
    console.log('items =', items)

    if (!Array.isArray(items) || items.length === 0) {
      console.warn('⚠️ The requested data format is invalid（items）')
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
        console.log(`Create a new guest user，ID = ${validUserId}`)
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
      console.log(`Create new guest user（no userId），ID = ${validUserId}`)
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

    console.log('Order created successfully:', order)
    return NextResponse.json(order)
  } catch (error) {
    console.error('Error creating order:', error)
    return new NextResponse('Failed to create order', { status: 500 })
  }
}
