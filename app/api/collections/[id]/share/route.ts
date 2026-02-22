import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

/**
 * GET /api/collections/[id]/share
 * Retorna o link de compartilhamento se a coleção for pública
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    const collectionId = params.id

    // Busca a coleção
    const collection = await prisma.collection.findFirst({
      where: { id: collectionId },
    })

    if (!collection) {
      return NextResponse.json(
        { error: 'Coleção não encontrada' },
        { status: 404 }
      )
    }

    // Verifica se é o dono ou se é pública
    if (collection.userId !== session?.user?.id && !collection.isPublic) {
      return NextResponse.json(
        { error: 'Não permitido' },
        { status: 403 }
      )
    }

    return NextResponse.json({
      isPublic: collection.isPublic,
      shareToken: collection.shareToken,
      shareUrl: collection.shareToken
        ? `${process.env.NEXTAUTH_URL}/collections/public/${collection.shareToken}`
        : null,
    })
  } catch (error) {
    console.error('[Share API] Erro:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar link de compartilhamento' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/collections/[id]/share
 * Gera um link de compartilhamento público
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      )
    }

    const collectionId = params.id

    // Busca a coleção
    const collection = await prisma.collection.findFirst({
      where: {
        id: collectionId,
        userId: session.user.id,
      },
    })

    if (!collection) {
      return NextResponse.json(
        { error: 'Coleção não encontrada' },
        { status: 404 }
      )
    }

    // Se já tem token, retorna o existente
    if (collection.shareToken && collection.isPublic) {
      return NextResponse.json({
        success: true,
        isPublic: true,
        shareToken: collection.shareToken,
        shareUrl: `${process.env.NEXTAUTH_URL}/collections/public/${collection.shareToken}`,
      })
    }

    // Gera novo token
    const shareToken = crypto.randomBytes(16).toString('hex')

    // Atualiza coleção
    const updated = await prisma.collection.update({
      where: { id: collectionId },
      data: {
        isPublic: true,
        shareToken,
      },
    })

    return NextResponse.json({
      success: true,
      isPublic: updated.isPublic,
      shareToken: updated.shareToken,
      shareUrl: `${process.env.NEXTAUTH_URL}/collections/public/${updated.shareToken}`,
    })
  } catch (error) {
    console.error('[Share API] Erro:', error)
    return NextResponse.json(
      { error: 'Erro ao gerar link de compartilhamento' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/collections/[id]/share
 * Remove compartilhamento público
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      )
    }

    const collectionId = params.id

    // Busca a coleção
    const collection = await prisma.collection.findFirst({
      where: {
        id: collectionId,
        userId: session.user.id,
      },
    })

    if (!collection) {
      return NextResponse.json(
        { error: 'Coleção não encontrada' },
        { status: 404 }
      )
    }

    // Remove compartilhamento
    const updated = await prisma.collection.update({
      where: { id: collectionId },
      data: {
        isPublic: false,
        shareToken: null,
      },
    })

    return NextResponse.json({
      success: true,
      isPublic: updated.isPublic,
      shareToken: null,
      message: 'Compartilhamento removido',
    })
  } catch (error) {
    console.error('[Share API] Erro:', error)
    return NextResponse.json(
      { error: 'Erro ao remover compartilhamento' },
      { status: 500 }
    )
  }
}
