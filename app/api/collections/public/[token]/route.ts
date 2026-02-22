import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/collections/public/[token]
 * Retorna uma coleção pública e todos os seus items
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params

    // Busca a coleção por token
    const collection = await prisma.collection.findFirst({
      where: {
        shareToken: token,
        isPublic: true,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        items: {
          include: {
            item: {
              select: {
                id: true,
                name: true,
                brand: true,
                model: true,
                color: true,
                year: true,
                series: true,
                condition: true,
                imageUrl: true,
                value: true,
                createdAt: true,
              },
            },
          },
          orderBy: {
            addedAt: 'desc',
          },
        },
      },
    })

    if (!collection) {
      return NextResponse.json(
        { error: 'Coleção não encontrada ou não é pública' },
        { status: 404 }
      )
    }

    // Formata a resposta
    return NextResponse.json({
      collection: {
        id: collection.id,
        name: collection.name,
        description: collection.description,
        imageUrl: collection.imageUrl,
        createdAt: collection.createdAt,
        updatedAt: collection.updatedAt,
        itemCount: collection.items.length,
        owner: collection.user,
      },
      items: collection.items.map(ci => ci.item),
    })
  } catch (error) {
    console.error('[Public Collection API] Erro:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar coleção pública' },
      { status: 500 }
    )
  }
}
