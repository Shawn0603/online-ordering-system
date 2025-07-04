// src/app/api/dishes/route.ts

import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

// GET: Fetch all dishes
export async function GET() {
  try {
    const dishes = await prisma.dish.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        available: true,
        imageUrl: true,
      },
    })
    return NextResponse.json(dishes)
  } catch (error) {
    console.error('Error fetching dishes:', error)
    return new NextResponse('Failed to fetch dishes', { status: 500 })
  }
}

// POST: Create new dish
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, price, description, imageUrl, available } = body

    if (!name || !price) {
      return new NextResponse('Missing name or price', { status: 400 })
    }

    const newDish = await prisma.dish.create({
      data: {
        name,
        price,
        description: description || '',
        imageUrl,
        available: available ?? true,
      },
    })

    return NextResponse.json(newDish, { status: 201 })
  } catch (error) {
    console.error('Error creating dish:', error)
    return new NextResponse('Failed to create dish', { status: 500 })
  }
}
