import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ItemSchema } from '@/lib/schemas'

// Get single item
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const item = await prisma.item.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      include: {
        collections: {
          include: {
            collection: true,
          },
        },
      },
    })

    if (!item) {
      return NextResponse.json(
        { error: 'Item não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ item })
  } catch (error) {
    console.error('Get item error:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar item' },
      { status: 500 }
    )
  }
}

// Update item
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
    const validation = ItemSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json({
        error: 'Validação falhou',
        details: validation.error.flatten(),
      }, { status: 400 })
    }

    // Check ownership
    const existingItem = await prisma.item.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!existingItem) {
      return NextResponse.json(
        { error: 'Item não encontrado' },
        { status: 404 }
      )
    }

    const item = await prisma.item.update({
      where: { id: params.id },
      data: validation.data,
    })

    return NextResponse.json({ item })
  } catch (error) {
    console.error('Update item error:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar item' },
      { status: 500 }
    )
  }
}

// Delete item
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
    const item = await prisma.item.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!item) {
      return NextResponse.json(
        { error: 'Item não encontrado' },
        { status: 404 }
      )
    }

    await prisma.item.delete({
      where: { id: params.id },
    })

    return NextResponse.json(
      { message: 'Item deletado com sucesso' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Delete item error:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar item' },
      { status: 500 }
    )
  }
}
