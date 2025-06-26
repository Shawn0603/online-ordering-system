// src/app/api/dishes/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

// PATCH: Update partial information about a dish
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const data = await req.json()

    const updatedDish = await prisma.dish.update({
      where: { id },
      data,
    })

    return NextResponse.json(updatedDish)
  } catch (error) {
    console.error('Error updating dish:', error)
    return new NextResponse('Failed to update dish', { status: 500 })
  }
}

// DELETE: Delete a dish
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    await prisma.dish.delete({
      where: { id },
    })

    return new NextResponse('Dish deleted', { status: 204 })
  } catch (error) {
    console.error('Error deleting dish:', error)
    return new NextResponse('Failed to delete dish', { status: 500 })
  }
}
