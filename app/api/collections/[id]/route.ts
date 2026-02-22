import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { CollectionSchema } from '@/lib/schemas'

// Get single collection
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const collection = await prisma.collection.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      include: {
        items: true,
      },
    })

    if (!collection) {
      return NextResponse.json(
        { error: 'Coleção não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({ collection })
  } catch (error) {
    console.error('Get collection error:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar coleção' },
      { status: 500 }
    )
  }
}

// Update collection
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check ownership
    const existingCollection = await prisma.collection.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!existingCollection) {
      return NextResponse.json(
        { error: 'Coleção não encontrada' },
        { status: 404 }
      )
    }

    const collection = await prisma.collection.update({
      where: { id: params.id },
      data: validation.data,
    })

    return NextResponse.json({ collection })
  } catch (error) {
    console.error('Update collection error:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar coleção' },
      { status: 500 }
    )
  }
}

// Delete collection
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check ownership
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

    await prisma.collection.delete({
      where: { id: params.id },
    })

    return NextResponse.json(
      { message: 'Coleção deletada com sucesso' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Delete collection error:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar coleção' },
      { status: 500 }
    )
  }
}
