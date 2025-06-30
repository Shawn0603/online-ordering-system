// src/app/api/dishes/[id]/toggle-availability/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'


export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const dishId = params.id

  try {
    const existing = await prisma.dish.findUnique({ where: { id: dishId } })

    if (!existing) {
      return NextResponse.json({ error: 'Dish not found' }, { status: 404 })
    }

    const updated = await prisma.dish.update({
      where: { id: dishId },
      data: { available: !existing.available },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error toggling dish availability:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
