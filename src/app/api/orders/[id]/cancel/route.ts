// src/app/api/orders/[id]/cancel/route.ts
import { PrismaClient } from '@/generated/prisma'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function PATCH(_: Request, context: { params: { id: string } }) {
  const orderId = context.params.id

  try {
    const existingOrder = await prisma.order.findUnique({ where: { id: orderId } })

    if (!existingOrder) {
      return new NextResponse('Order not found', { status: 404 })
    }

    if (existingOrder.status !== 'pending') {
      return new NextResponse('Only pending orders can be cancelled', { status: 400 })
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: 'cancelled' },
    })

    return NextResponse.json(updatedOrder)
  } catch (error) {
    console.error('Error cancelling order:', error)
    return new NextResponse('Failed to cancel order', { status: 500 })
  }
}
