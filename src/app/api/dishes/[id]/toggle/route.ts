// src/app/api/dishes/[id]/toggle/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    // querying the current available status
    const current = await prisma.dish.findUnique({
      where: { id },
    })

    if (!current) {
      return new NextResponse('Dish not found', { status: 404 })
    }

    // switch available 
    const updated = await prisma.dish.update({
      where: { id },
      data: {
        available: !current.available,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Toggle available error:', error)
    return new NextResponse('Failed to toggle dish status', { status: 500 })
  }
}
