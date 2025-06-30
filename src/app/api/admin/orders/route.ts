import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    // 开发期间：不验证身份，直接返回所有订单
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { email: true } },
        items: {
          include: {
            dish: true,
          },
        },
      },
    })

    return NextResponse.json({ orders })
  } catch (err: any) {
    console.error('[ADMIN ORDER ERROR]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
