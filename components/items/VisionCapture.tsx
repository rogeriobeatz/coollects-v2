'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Camera, Upload, Check, AlertCircle } from 'lucide-react'
import { ItemIdentification } from '@/lib/services/vision'
import Image from 'next/image'

interface VisionCaptureProps {
  onIdentified: (data: ItemIdentification) => void
  onCancel: () => void
}

export function VisionCapture({ onIdentified, onCancel }: VisionCaptureProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confidence, setConfidence] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = async (file: File) => {
    try {
      setError(null)
      setLoading(true)

      // Converte arquivo para base64
      const reader = new FileReader()
      reader.onload = async (e) => {
        const base64 = e.target?.result as string
        setSelectedImage(base64)

        // Chama a API de identificação
        const response = await fetch('/api/vision/identify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: base64,
            mimeType: file.type,
          }),
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || 'Erro ao identificar item')
        }

        const data = await response.json()
        const identification = data.data as ItemIdentification

        setConfidence(identification.confidence)

        if (identification.confidence < 0.6) {
          setError(
            `Identificação com baixa confiança (${(identification.confidence * 100).toFixed(0)}%). ` +
            'Por favor, revise os dados antes de salvar.'
          )
        }

        onIdentified(identification)
      }

      reader.readAsDataURL(file)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao processar imagem')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageSelect(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const triggerCameraInput = () => {
    cameraInputRef.current?.click()
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Identificar Item com IA</CardTitle>
        <CardDescription>
          Tire uma foto ou selecione uma imagem para identificação automática
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Preview da imagem */}
        {selectedImage && (
          <div className="space-y-3">
            <div className="relative aspect-square w-full max-w-xs mx-auto rounded-lg overflow-hidden border border-border bg-muted">
              <Image
                src={selectedImage}
                alt="Selected item"
                fill
                className="object-cover"
              />
            </div>

            {/* Status da identificação */}
            <div className="space-y-2">
              {loading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analisando imagem com IA...
                </div>
              )}

              {!loading && confidence !== null && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {confidence >= 0.7 ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                    )}
                    <span className="text-sm font-medium">
                      Confiança: {(confidence * 100).toFixed(0)}%
                    </span>
                  </div>

                  {error && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                      <p className="text-sm text-yellow-800">{error}</p>
                    </div>
                  )}
                </div>
              )}

              {error && !confidence && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}
            </div>

            {/* Ações */}
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setSelectedImage(null)
                  setError(null)
                  setConfidence(null)
                }}
                variant="outline"
                className="flex-1"
              >
                Tentar Outra
              </Button>
              <Button
                onClick={onCancel}
                variant="ghost"
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}

        {/* Botões de captura/upload */}
        {!selectedImage && (
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={triggerCameraInput}
              variant="outline"
              className="h-24 flex flex-col gap-2"
              disabled={loading}
            >
              <Camera className="w-6 h-6" />
              <span className="text-xs">Tirar Foto</span>
            </Button>

            <Button
              onClick={triggerFileInput}
              variant="outline"
              className="h-24 flex flex-col gap-2"
              disabled={loading}
            >
              <Upload className="w-6 h-6" />
              <span className="text-xs">Galeria</span>
            </Button>
          </div>
        )}

        {/* Input files ocultos */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={loading}
        />

        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
          disabled={loading}
        />

        {/* Descrição */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>
            A IA analisará sua imagem e tentará identificar automaticamente:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Nome e modelo do item</li>
            <li>Marca/Série</li>
            <li>Cor e condição</li>
            <li>Ano de lançamento aproximado</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
