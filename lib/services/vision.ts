import { google } from '@ai-sdk/google'
import { generateObject } from 'ai'
import { z } from 'zod'

// Schema para a resposta da IA
const ItemIdentificationSchema = z.object({
  name: z.string().describe('Nome do item identificado'),
  description: z.string().optional().describe('Descrição detalhada do item'),
  brand: z.string().optional().describe('Marca/fabricante do item'),
  model: z.string().optional().describe('Modelo do item'),
  color: z.string().optional().describe('Cor predominante do item'),
  series: z.string().optional().describe('Série ou coleção'),
  year: z.number().int().optional().describe('Ano de fabricação aproximado'),
  condition: z.enum(['mint', 'near-mint', 'excellent', 'good', 'fair', 'poor']).optional().describe('Estado de conservação'),
  confidence: z.number().min(0).max(1).describe('Confiança da identificação (0-1)'),
  notes: z.string().optional().describe('Notas adicionais sobre a identificação'),
})

export type ItemIdentification = z.infer<typeof ItemIdentificationSchema>

/**
 * Identifica um item a partir de uma imagem usando Google Vision AI
 * @param imageBase64 - Imagem em base64
 * @param mimeType - Tipo MIME da imagem
 * @returns Dados identificados do item
 */
export async function identifyItemFromImage(
  imageBase64: string,
  mimeType: string = 'image/jpeg'
): Promise<ItemIdentification> {
  try {
    // Remove prefixo data:image/jpeg;base64, se existir
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '')

    const result = await generateObject({
      model: google('gemini-2.0-flash-exp'),
      schema: ItemIdentificationSchema,
      prompt: `Analise esta imagem de um item colecionável (pode ser Hot Wheels, ação figure, ou outro item colecionável) e forneça os dados solicitados.
      
      Se for um Hot Wheels, tente identificar:
      - Modelo exato do carrinho
      - Série/coleção
      - Cor
      - Ano de lançamento
      - Condição (baseado na aparência)
      
      Se for outro tipo de colecionável, forneça informações relevantes.
      
      Seja conservador na confiança - use valores altos (0.8+) apenas se tiver certeza da identificação.`,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              image: cleanBase64,
              mimeType: mimeType as any,
            },
          ],
        },
      ],
    })

    return result.object as ItemIdentification
  } catch (error) {
    console.error('[Vision Service] Error identifying item:', error)
    throw new Error(
      error instanceof Error
        ? `Erro ao identificar item: ${error.message}`
        : 'Erro desconhecido ao identificar item'
    )
  }
}

/**
 * Processa uma imagem carregada e retorna dados de identificação
 * @param file - Arquivo de imagem
 * @returns Dados identificados
 */
export async function processUploadedImage(file: File): Promise<ItemIdentification> {
  // Converte arquivo para base64
  const buffer = await file.arrayBuffer()
  const bytes = new Uint8Array(buffer)
  const base64 = Buffer.from(bytes).toString('base64')

  return identifyItemFromImage(base64, file.type)
}
