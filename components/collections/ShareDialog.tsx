'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Copy, Check, Share2, Lock, Globe } from 'lucide-react'

interface ShareDialogProps {
  collectionId: string
  collectionName: string
  onClose: () => void
}

export function ShareDialog({ collectionId, collectionName, onClose }: ShareDialogProps) {
  const [loading, setLoading] = useState(false)
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleShare = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/collections/${collectionId}/share`, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Erro ao gerar link de compartilhamento')
      }

      const data = await response.json()
      setShareUrl(data.shareUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  const handleCopyLink = async () => {
    if (!shareUrl) return

    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('Erro ao copiar link')
    }
  }

  const handleRemoveShare = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/collections/${collectionId}/share`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Erro ao remover compartilhamento')
      }

      setShareUrl(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          Compartilhar Coleção
        </CardTitle>
        <CardDescription>
          {collectionName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {!shareUrl ? (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Gere um link público para compartilhar sua coleção com outras pessoas.</p>
              <p>Quem receber o link poderá:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Ver todos os items da coleção</li>
                <li>Conhecer seu perfil como colecionador</li>
                <li>Favoritar items (se estiver logado)</li>
              </ul>
            </div>

            <Button
              onClick={handleShare}
              disabled={loading}
              className="w-full"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Gerar Link de Compartilhamento
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center gap-2 text-sm text-green-800 mb-2">
                <Globe className="w-4 h-4" />
                <span className="font-medium">Coleção Compartilhada</span>
              </div>
              <p className="text-xs text-green-700">
                O link está ativo e qualquer pessoa pode acessar
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Link de Compartilhamento</label>
              <div className="flex gap-2">
                <Input
                  value={shareUrl}
                  readOnly
                  className="text-sm"
                />
                <Button
                  onClick={handleCopyLink}
                  size="sm"
                  variant="outline"
                  disabled={!shareUrl}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Opções</label>
              <Button
                onClick={handleRemoveShare}
                disabled={loading}
                variant="destructive"
                className="w-full"
                size="sm"
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Remover Compartilhamento
              </Button>
            </div>
          </div>
        )}

        <Button
          onClick={onClose}
          variant="ghost"
          className="w-full"
        >
          Fechar
        </Button>
      </CardContent>
    </Card>
  )
}
