'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ItemCard } from '@/components/items/ItemCard'

export default function AddItemsToCollectionPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const [items, setItems] = useState<any[]>([])
  const [collectionItems, setCollectionItems] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsRes = await fetch('/api/items')
        const itemsData = await itemsRes.json()
        setItems(itemsData.items || [])

        const collectionRes = await fetch(`/api/collections/${params.id}`)
        const collectionData = await collectionRes.json()
        const collectionItemIds = new Set(
          collectionData.collection.items.map((i: any) => i.itemId)
        )
        setCollectionItems(collectionItemIds)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  const handleToggleItem = async (itemId: string) => {
    const isAdded = collectionItems.has(itemId)

    try {
      if (isAdded) {
        await fetch(`/api/collections/${params.id}/items`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ itemId }),
        })
        collectionItems.delete(itemId)
      } else {
        await fetch(`/api/collections/${params.id}/items`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ itemId }),
        })
        collectionItems.add(itemId)
      }

      setCollectionItems(new Set(collectionItems))
    } catch (error) {
      console.error('Error toggling item:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Coollects</h1>
          <Link href={`/collections/${params.id}`}>
            <Button variant="outline">Concluir</Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Adicionar Items à Coleção</h2>
          <p className="text-muted-foreground">
            Selecione os items que deseja adicionar ou remover desta coleção
          </p>
        </div>

        {items.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">
              Você não tem nenhum item criado ainda.
            </p>
            <Link href="/items/new">
              <Button>Criar Primeiro Item</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => (
              <div key={item.id} className="relative">
                <ItemCard
                  id={item.id}
                  name={item.name}
                  brand={item.brand || undefined}
                  model={item.model || undefined}
                  color={item.color || undefined}
                  imageUrl={item.imageUrl || undefined}
                  condition={item.condition || undefined}
                  value={item.value || undefined}
                />
                <Button
                  className="absolute top-2 right-2"
                  variant={collectionItems.has(item.id) ? 'default' : 'outline'}
                  onClick={() => handleToggleItem(item.id)}
                >
                  {collectionItems.has(item.id) ? '✓ Adicionado' : 'Adicionar'}
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
