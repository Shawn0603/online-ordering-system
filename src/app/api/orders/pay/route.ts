import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { userId } = body

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
  }

  const result = await prisma.order.updateMany({
    where: {
      userId,
      status: 'pending',
    },
    data: {
      status: 'paid',
    },
  })

  return NextResponse.json({ success: true, updated: result.count })
}
