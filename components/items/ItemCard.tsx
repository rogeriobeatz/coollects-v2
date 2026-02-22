'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrashIcon, EditIcon } from 'lucide-react'

interface ItemCardProps {
  id: string
  name: string
  brand?: string
  model?: string
  color?: string
  imageUrl?: string
  condition?: string
  value?: number
  onDelete?: (id: string) => Promise<void>
}

export function ItemCard({ id, name, brand, model, color, imageUrl, condition, value, onDelete }: ItemCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition">
      {imageUrl && (
        <div className="relative w-full h-48 bg-muted">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2">{name}</CardTitle>
        {brand && <CardDescription>{brand} {model && `- ${model}`}</CardDescription>}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          {color && (
            <div>
              <span className="text-muted-foreground">Cor:</span>
              <p className="font-medium">{color}</p>
            </div>
          )}
          {condition && (
            <div>
              <span className="text-muted-foreground">Condição:</span>
              <p className="font-medium">{condition}</p>
            </div>
          )}
        </div>

        {value && (
          <div className="text-lg font-bold text-primary">
            R$ {value.toFixed(2)}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Link href={`/items/${id}/edit`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <EditIcon className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </Link>
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(id)}
              className="flex-1"
            >
              <TrashIcon className="w-4 h-4 mr-2" />
              Deletar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
