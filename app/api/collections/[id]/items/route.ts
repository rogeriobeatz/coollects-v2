import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Get items in collection with filters
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify ownership
    const collection = await prisma.collection.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!collection) {
      return NextResponse.json(
        { error: 'Coleção não encontrada' },
        { status: 404 }
      )
    }

    // Get query filters
    const { searchParams } = new URL(req.url)
    const color = searchParams.get('color')
    const brand = searchParams.get('brand')
    const model = searchParams.get('model')
    const year = searchParams.get('year')
    const series = searchParams.get('series')

    // Build filter conditions
    const where: any = {
      collections: {
        some: {
          collectionId: params.id,
        },
      },
    }

    if (color) where.color = { contains: color, mode: 'insensitive' }
    if (brand) where.brand = { contains: brand, mode: 'insensitive' }
    if (model) where.model = { contains: model, mode: 'insensitive' }
    if (year) where.year = parseInt(year)
    if (series) where.series = { contains: series, mode: 'insensitive' }

    const items = await prisma.item.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ items, count: items.length })
  } catch (error) {
    console.error('Get collection items error:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar items da coleção' },
      { status: 500 }
    )
  }
}

// Add item to collection
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { itemId } = await req.json()

    if (!itemId) {
      return NextResponse.json(
        { error: 'itemId é obrigatório' },
        { status: 400 }
      )
    }

    // Verify ownership of collection and item
    const collection = await prisma.collection.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    const item = await prisma.item.findFirst({
      where: {
        id: itemId,
        userId: session.user.id,
      },
    })

    if (!collection || !item) {
      return NextResponse.json(
        { error: 'Coleção ou item não encontrado' },
        { status: 404 }
      )
    }

    // Add item to collection
    const collectionItem = await prisma.collectionItem.create({
      data: {
        collectionId: params.id,
        itemId,
      },
    })

    return NextResponse.json(collectionItem, { status: 201 })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Item já está nesta coleção' },
        { status: 409 }
      )
    }

    console.error('Add item to collection error:', error)
    return NextResponse.json(
      { error: 'Erro ao adicionar item à coleção' },
      { status: 500 }
    )
  }
}

// Remove item from collection
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { itemId } = await req.json()

    if (!itemId) {
      return NextResponse.json(
        { error: 'itemId é obrigatório' },
        { status: 400 }
      )
    }

    // Verify ownership
    const collection = await prisma.collection.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!collection) {
      return NextResponse.json(
        { error: 'Coleção não encontrada' },
        { status: 404 }
      )
    }

    await prisma.collectionItem.delete({
      where: {
        collectionId_itemId: {
          collectionId: params.id,
          itemId,
        },
      },
    })

    return NextResponse.json(
      { message: 'Item removido da coleção' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Remove item from collection error:', error)
    return NextResponse.json(
      { error: 'Erro ao remover item da coleção' },
      { status: 500 }
    )
  }
}
