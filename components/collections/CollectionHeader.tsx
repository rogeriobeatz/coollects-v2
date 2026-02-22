'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShareDialog } from './ShareDialog'
import { Share2 } from 'lucide-react'

interface CollectionHeaderProps {
  id: string
  name: string
  description?: string | null
  itemCount: number
}

export function CollectionHeader({
  id,
  name,
  description,
  itemCount,
}: CollectionHeaderProps) {
  const [showShare, setShowShare] = useState(false)

  return (
    <>
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-2">{name}</h2>
        {description && (
          <p className="text-muted-foreground text-lg">{description}</p>
        )}
        <div className="text-sm text-muted-foreground mt-2 mb-4">
          {itemCount} {itemCount === 1 ? 'item' : 'items'} na coleção
        </div>
        <div className="flex gap-2 mt-4 flex-wrap">
          <Link href={`/collections/${id}/edit`}>
            <Button>Editar</Button>
          </Link>
          <Link href={`/collections/${id}/items/add`}>
            <Button variant="secondary">Adicionar Items</Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => setShowShare(true)}
            className="flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Compartilhar
          </Button>
        </div>
      </div>

      {showShare && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <ShareDialog
            collectionId={id}
            collectionName={name}
            onClose={() => setShowShare(false)}
          />
        </div>
      )}
    </>
  )
}
