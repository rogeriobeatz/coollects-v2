'use client'

import { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CollectionFiltersProps {
  colors: string[]
  brands: string[]
  models: string[]
  years: number[]
  series: string[]
}

export function CollectionFilters({
  colors,
  brands,
  models,
  years,
  series,
}: CollectionFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`?${params.toString()}`)
    },
    [router, searchParams]
  )

  const clearFilters = useCallback(() => {
    router.push('?')
  }, [router])

  const hasFilters = Array.from(searchParams.keys()).length > 0

  return (
    <div className="bg-secondary p-6 rounded-lg mb-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Filtros</h3>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
          >
            Limpar Filtros
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {colors.length > 0 && (
          <div className="space-y-2">
            <Label htmlFor="color">Cor</Label>
            <select
              id="color"
              value={searchParams.get('color') || ''}
              onChange={(e) => updateFilter('color', e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Todas as cores</option>
              {colors.map(color => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
        )}

        {brands.length > 0 && (
          <div className="space-y-2">
            <Label htmlFor="brand">Marca</Label>
            <select
              id="brand"
              value={searchParams.get('brand') || ''}
              onChange={(e) => updateFilter('brand', e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Todas as marcas</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
        )}

        {models.length > 0 && (
          <div className="space-y-2">
            <Label htmlFor="model">Modelo</Label>
            <select
              id="model"
              value={searchParams.get('model') || ''}
              onChange={(e) => updateFilter('model', e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Todos os modelos</option>
              {models.map(model => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        )}

        {years.length > 0 && (
          <div className="space-y-2">
            <Label htmlFor="year">Ano</Label>
            <select
              id="year"
              value={searchParams.get('year') || ''}
              onChange={(e) => updateFilter('year', e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Todos os anos</option>
              {years.sort((a, b) => b - a).map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        )}

        {series.length > 0 && (
          <div className="space-y-2">
            <Label htmlFor="series">Série</Label>
            <select
              id="series"
              value={searchParams.get('series') || ''}
              onChange={(e) => updateFilter('series', e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Todas as séries</option>
              {series.map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  )
}
