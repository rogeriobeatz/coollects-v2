'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CollectionInput } from '@/lib/schemas'

interface CollectionFormProps {
  initialData?: CollectionInput & { id?: string }
  isLoading?: boolean
  onSubmit: (data: CollectionInput) => Promise<void>
}

export function CollectionForm({ initialData, isLoading = false, onSubmit }: CollectionFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<CollectionInput>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    isPublic: initialData?.isPublic ?? false,
  })
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value || undefined,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      await onSubmit(formData)
      router.push('/collections')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar coleção')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? 'Editar Coleção' : 'Nova Coleção'}</CardTitle>
        <CardDescription>
          Crie uma coleção para organizar seus items
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Nome da Coleção *</Label>
            <Input
              id="name"
              name="name"
              placeholder="ex: Hot Wheels Raros"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <textarea
              id="description"
              name="description"
              placeholder="Descreva sua coleção"
              value={formData.description || ''}
              onChange={handleChange}
              className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              id="isPublic"
              name="isPublic"
              type="checkbox"
              checked={formData.isPublic}
              onChange={handleChange}
              className="w-4 h-4 rounded border-input"
            />
            <Label htmlFor="isPublic" className="mb-0">
              Compartilhar publicamente
            </Label>
          </div>

          {formData.isPublic && (
            <div className="p-3 bg-accent text-accent-foreground rounded-md text-sm">
              Sua coleção será visível via link público. Qualquer pessoa com o link poderá visualizar.
            </div>
          )}

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={submitting || isLoading}
              className="flex-1"
            >
              {submitting || isLoading ? 'Salvando...' : 'Salvar Coleção'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={submitting || isLoading}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
