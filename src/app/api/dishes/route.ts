// src/app/api/dishes/route.ts

import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const dishes = await prisma.dish.findMany()
    return NextResponse.json(dishes)
  } catch (error) {
    console.error('Error fetching dishes:', error)
    return new NextResponse('Failed to fetch dishes', { status: 500 })
  }
}
