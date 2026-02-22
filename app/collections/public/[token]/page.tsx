'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, Heart, Download, Grid3x3 } from 'lucide-react'

interface PublicCollectionPageProps {
  params: {
    token: string
  }
}

interface Item {
  id: string
  name: string
  brand?: string | null
  model?: string | null
  color?: string | null
  year?: number | null
  series?: string | null
  condition?: string | null
  imageUrl?: string | null
  value?: number | null
  createdAt: string
}

interface CollectionData {
  collection: {
    id: string
    name: string
    description?: string | null
    imageUrl?: string | null
    createdAt: string
    updatedAt: string
    itemCount: number
    owner: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
  items: Item[]
}

export default function PublicCollectionPage({ params }: PublicCollectionPageProps) {
  const [data, setData] = useState<CollectionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await fetch(`/api/collections/public/${params.token}`)

        if (!response.ok) {
          throw new Error('Coleção não encontrada')
        }

        const jsonData = await response.json()
        setData(jsonData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar coleção')
      } finally {
        setLoading(false)
      }
    }

    fetchCollection()
  }, [params.token])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Carregando coleção...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 space-y-4 text-center">
            <h2 className="text-2xl font-bold">Coleção Não Encontrada</h2>
            <p className="text-muted-foreground">
              {error || 'A coleção que você está tentando acessar não existe ou foi removida.'}
            </p>
            <Link href="/">
              <Button className="w-full">Voltar para Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { collection, items } = data

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Coollects</h1>
              <p className="text-sm text-muted-foreground">Coleção Pública</p>
            </div>
            <Link href="/">
              <Button variant="outline">Início</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Collection Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Collection Image */}
          <div className="md:col-span-1">
            {collection.imageUrl ? (
              <div className="relative aspect-square rounded-lg overflow-hidden border border-border">
                <Image
                  src={collection.imageUrl}
                  alt={collection.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square rounded-lg border-2 border-dashed border-border bg-muted flex items-center justify-center">
                <Grid3x3 className="w-12 h-12 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Collection Info */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <h2 className="text-4xl font-bold mb-2">{collection.name}</h2>
              {collection.description && (
                <p className="text-lg text-muted-foreground">{collection.description}</p>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Items na Coleção</p>
                <p className="text-3xl font-bold">{collection.itemCount}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Adicionada</p>
                <p className="text-sm font-medium">
                  {new Date(collection.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            {/* Owner Info */}
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-2">Coletor</p>
                <div className="flex items-center gap-3">
                  {collection.owner.image && (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-border">
                      <Image
                        src={collection.owner.image}
                        alt={collection.owner.name || 'Coletor'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{collection.owner.name || 'Anônimo'}</p>
                    <p className="text-xs text-muted-foreground">Colecionador</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Items Grid */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">Items da Coleção</h3>

          {items.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  Esta coleção não possui items ainda.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map(item => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  {/* Item Image */}
                  <div className="relative aspect-square bg-muted overflow-hidden border-b border-border">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Grid3x3 className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Item Info */}
                  <CardContent className="pt-4 space-y-3">
                    <div>
                      <h4 className="font-semibold text-lg">{item.name}</h4>
                      {item.brand && (
                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                      )}
                    </div>

                    {/* Specs */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {item.color && (
                        <div>
                          <p className="text-muted-foreground">Cor</p>
                          <p className="font-medium">{item.color}</p>
                        </div>
                      )}
                      {item.year && (
                        <div>
                          <p className="text-muted-foreground">Ano</p>
                          <p className="font-medium">{item.year}</p>
                        </div>
                      )}
                      {item.condition && (
                        <div>
                          <p className="text-muted-foreground">Condição</p>
                          <p className="font-medium capitalize">{item.condition}</p>
                        </div>
                      )}
                      {item.value && (
                        <div>
                          <p className="text-muted-foreground">Valor</p>
                          <p className="font-medium">R$ {item.value}</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Favoritar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20 p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Gostou dessa coleção?</h3>
          <p className="text-muted-foreground mb-6">
            Baixe o Coollects e comece sua própria coleção de items incríveis!
          </p>
          <Link href="/signup">
            <Button size="lg">
              <Download className="w-4 h-4 mr-2" />
              Baixar Coollects
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
