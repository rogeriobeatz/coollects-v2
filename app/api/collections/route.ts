import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { CollectionSchema } from '@/lib/schemas'

// Get all collections for authenticated user
export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const collections = await prisma.collection.findMany({
      where: { userId: session.user.id },
      include: {
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ collections })
  } catch (error) {
    console.error('Get collections error:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar coleções' },
      { status: 500 }
    )
  }
}

// Create new collection
export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    
    // Validate input
    const validation = CollectionSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json({
        error: 'Validação falhou',
        details: validation.error.flatten(),
      }, { status: 400 })
    }

    const collection = await prisma.collection.create({
      data: {
        ...validation.data,
        userId: session.user.id,
      },
    })

    return NextResponse.json(collection, { status: 201 })
  } catch (error) {
    console.error('Create collection error:', error)
    return NextResponse.json(
      { error: 'Erro ao criar coleção' },
      { status: 500 }
    )
  }
}
