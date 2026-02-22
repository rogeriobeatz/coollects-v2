'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ImageUpload } from '@/components/ui/image-upload'
import { ItemInput } from '@/lib/schemas'

interface ItemFormProps {
  initialData?: ItemInput & { id?: string }
  isLoading?: boolean
  onSubmit: (data: ItemInput) => Promise<void>
}

const conditions = [
  { value: 'mint', label: 'Mint (Em Caixa)' },
  { value: 'near-mint', label: 'Near Mint' },
  { value: 'excellent', label: 'Excelente' },
  { value: 'good', label: 'Bom' },
  { value: 'fair', label: 'Razoável' },
  { value: 'poor', label: 'Pobre' },
]

export function ItemForm({ initialData, isLoading = false, onSubmit }: ItemFormProps) {
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState<string | null>(initialData?.id ? null : null)
  const [formData, setFormData] = useState<ItemInput & { imageUrl?: string }>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    color: initialData?.color || '',
    brand: initialData?.brand || '',
    model: initialData?.model || '',
    year: initialData?.year || undefined,
    series: initialData?.series || '',
    condition: initialData?.condition || '',
    value: initialData?.value || undefined,
    imageUrl: undefined,
  })
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const numericFields = ['year', 'value']
    
    if (numericFields.includes(name) && value) {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'year' ? parseInt(value) : parseFloat(value),
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
      const dataToSubmit: ItemInput = {
        name: formData.name,
        description: formData.description,
        color: formData.color,
        brand: formData.brand,
        model: formData.model,
        year: formData.year,
        series: formData.series,
        condition: formData.condition,
        value: formData.value,
      }
      
      // Add imageUrl if present - we'll update the item creation API to accept it
      const fullData = imageUrl ? { ...dataToSubmit, imageUrl } : dataToSubmit
      
      await onSubmit(fullData as ItemInput)
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar item')
    } finally {
      setSubmitting(false)
    }
  }

  const handleImageUpload = (url: string) => {
    setImageUrl(url)
    setFormData(prev => ({
      ...prev,
      imageUrl: url,
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? 'Editar Item' : 'Novo Item'}</CardTitle>
        <CardDescription>
          Preencha os detalhes do seu item colecionável
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
              {error}
            </div>
          )}

          {/* Image Upload */}
          <ImageUpload
            onImageUpload={handleImageUpload}
            currentImage={imageUrl || undefined}
            label="Foto do Item"
          />

          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Informações Básicas</h3>
            
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                name="name"
                placeholder="ex: Hot Wheels Fast Felony"
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
                placeholder="Adicione detalhes sobre o item"
                value={formData.description || ''}
                onChange={handleChange}
                className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-4">
            <h3 className="font-semibold">Detalhes do Item</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Marca</Label>
                <Input
                  id="brand"
                  name="brand"
                  placeholder="ex: Mattel, Hot Wheels"
                  value={formData.brand || ''}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="model">Modelo</Label>
                <Input
                  id="model"
                  name="model"
                  placeholder="ex: Fast Felony"
                  value={formData.model || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Cor</Label>
                <Input
                  id="color"
                  name="color"
                  placeholder="ex: Vermelho"
                  value={formData.color || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="series">Série</Label>
                <Input
                  id="series"
                  name="series"
                  placeholder="ex: Track Stars"
                  value={formData.series || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Ano</Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  placeholder="ex: 2023"
                  value={formData.year || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Condição</Label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition || ''}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Selecione uma condição</option>
                  {conditions.map(cond => (
                    <option key={cond.value} value={cond.value}>
                      {cond.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">Valor Estimado (R$)</Label>
              <Input
                id="value"
                name="value"
                type="number"
                step="0.01"
                placeholder="ex: 150.00"
                value={formData.value || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={submitting || isLoading}
              className="flex-1"
            >
              {submitting || isLoading ? 'Salvando...' : 'Salvar Item'}
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
