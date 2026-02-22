import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ItemSchema } from '@/lib/schemas'

// Get all items for authenticated user
export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const items = await prisma.item.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        collections: {
          select: {
            collectionId: true,
            collection: {
              select: { name: true },
            },
          },
        },
      },
    })

    return NextResponse.json({ items })
  } catch (error) {
    console.error('Get items error:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar items' },
      { status: 500 }
    )
  }
}

// Create new item
export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    
    // Validate input
    const validation = ItemSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json({
        error: 'Validação falhou',
        details: validation.error.flatten(),
      }, { status: 400 })
    }

    const item = await prisma.item.create({
      data: {
        ...validation.data,
        userId: session.user.id,
      },
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('Create item error:', error)
    return NextResponse.json(
      { error: 'Erro ao criar item' },
      { status: 500 }
    )
  }
}
