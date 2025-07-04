// app/api/admin/menu/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server'
import prisma  from '@/lib/prisma'
import { writeFile } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const dishId = params.id

  try {
    const dish = await prisma.dish.findUnique({
      where: { id: dishId },
    })

    if (!dish) {
      return NextResponse.json({ error: 'Dish not found' }, { status: 404 })
    }

    return NextResponse.json(dish)
  } catch (err) {
    console.error('GET error:', err)
    return NextResponse.json({ error: 'Failed to fetch dish' }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id

  try {
    const formData = await req.formData()
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const available = formData.get('available') === 'true'

    let imageUrl: string | undefined

    const file = formData.get('image') as File | null

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const ext = file.name.split('.').pop()
      const filename = `${uuidv4()}.${ext}`
      const uploadPath = path.join(process.cwd(), 'public', 'images', filename)

      await writeFile(uploadPath, buffer)
      imageUrl = `/images/${filename}`
    }

    const updated = await prisma.dish.update({
      where: { id },
      data: {
        name,
        description,
        price,
        available,
        ...(imageUrl && { imageUrl }), 
      },
    })

    return NextResponse.json(updated)
  } catch (err) {
    console.error('PATCH error:', err)
    return NextResponse.json({ error: 'Failed to update dish' }, { status: 500 })
  }
}
