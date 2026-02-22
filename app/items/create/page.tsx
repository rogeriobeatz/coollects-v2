'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { VisionCapture } from '@/components/items/VisionCapture'
import { ItemForm } from '@/components/items/ItemForm'
import { ItemIdentification } from '@/lib/services/vision'
import { ItemInput } from '@/lib/schemas'
import { Sparkles, PencilIcon, ArrowLeft } from 'lucide-react'

type CreationMode = 'choice' | 'manual' | 'vision'

export default function CreateItemPage() {
  const router = useRouter()
  const [mode, setMode] = useState<CreationMode>('choice')
  const [visionData, setVisionData] = useState<ItemIdentification | null>(null)

  const handleVisionIdentified = (data: ItemIdentification) => {
    setVisionData(data)
  }

  const handleFormSubmit = async (formData: ItemInput) => {
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Erro ao salvar item')
      }

      router.push('/items')
      router.refresh()
    } catch (error) {
      throw error
    }
  }

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header com botão voltar */}
        <div className="flex items-center gap-2 mb-8">
          <Link href="/items">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Adicionar Novo Item</h1>
        </div>

        {mode === 'choice' && (
          <div className="space-y-4">
            {/* Cartão de IA Vision */}
            <Card
              className="cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => setMode('vision')}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                      Identificar com IA
                    </CardTitle>
                    <CardDescription>
                      Tire uma foto ou envie uma imagem para identificação automática
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Perfeito para Hot Wheels e outros colecionáveis. A IA preencherá automaticamente:
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    <li>Nome e modelo</li>
                    <li>Marca/Série</li>
                    <li>Cor e condição</li>
                    <li>Ano de lançamento</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-border">
                    <Button className="w-full">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Começar com IA
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cartão de entrada manual */}
            <Card
              className="cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => setMode('manual')}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <PencilIcon className="w-5 h-5 text-green-600" />
                      Preenchimento Manual
                    </CardTitle>
                    <CardDescription>
                      Preencha os dados manualmente
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Ideal para itens difíceis de fotografar ou quando você prefere maior controle.
                  </p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <Button className="w-full" variant="outline">
                      <PencilIcon className="w-4 h-4 mr-2" />
                      Preenchimento Manual
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {mode === 'vision' && (
          <div className="space-y-6">
            <VisionCapture
              onIdentified={handleVisionIdentified}
              onCancel={() => {
                setMode('choice')
                setVisionData(null)
              }}
            />

            {visionData && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    Item identificado! Revise os dados abaixo e faça ajustes se necessário.
                  </p>
                </div>

                <ItemForm
                  initialData={visionData}
                  onSubmit={handleFormSubmit}
                />
              </div>
            )}
          </div>
        )}

        {mode === 'manual' && (
          <ItemForm
            onSubmit={handleFormSubmit}
          />
        )}
      </div>
    </main>
  )
}
