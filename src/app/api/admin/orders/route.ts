import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma' 




export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing token' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { adminId: string }

    
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.adminId },
    })

    if (!admin) {
      return NextResponse.json({ error: 'Invalid admin' }, { status: 403 })
    }

    
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
