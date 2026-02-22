import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { identifyItemFromImage } from '@/lib/services/vision'
import { ItemIdentification } from '@/lib/services/vision'

/**
 * POST /api/vision/identify
 * 
 * Identifica um item a partir de uma imagem codificada em base64
 * 
 * Request body:
 * {
 *   "image": "base64-encoded-image",
 *   "mimeType": "image/jpeg" (opcional, padrão: image/jpeg)
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Verifica autenticação
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { image, mimeType = 'image/jpeg' } = body

    if (!image) {
      return NextResponse.json(
        { error: 'Campo "image" obrigatório' },
        { status: 400 }
      )
    }

    console.log('[Vision API] Iniciando identificação de item...')

    // Chama o serviço de visão
    const identification = await identifyItemFromImage(image, mimeType)

    console.log('[Vision API] Identificação completada:', identification)

    return NextResponse.json({
      success: true,
      data: identification,
    })
  } catch (error) {
    console.error('[Vision API] Erro:', error)

    const message = error instanceof Error ? error.message : 'Erro ao processar imagem'

    return NextResponse.json(
      {
        error: message,
        success: false,
      },
      { status: 500 }
    )
  }
}

/**
 * OPTIONS /api/vision/identify
 * Suporta CORS se necessário
 */
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({ ok: true })
}
