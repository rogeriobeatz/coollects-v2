import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ItemCard } from '@/components/items/ItemCard'
import { CollectionFilters } from '@/components/collections/CollectionFilters'

export const metadata = {
  title: 'Detalhes da Coleção - Coollects',
  description: 'Visualize os detalhes de sua coleção',
}

export default async function CollectionDetailPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: Record<string, string | string[]>
}) {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect('/login')
  }

  const collection = await prisma.collection.findFirst({
    where: { id: params.id, userId: session.user.id },
    include: {
      items: true,
    },
  })

  if (!collection) {
    redirect('/collections')
  }

  // Build filter conditions
  const where: any = {
    collections: {
      some: {
        collectionId: params.id,
      },
    },
  }

  const color = Array.isArray(searchParams.color) ? searchParams.color[0] : searchParams.color
  const brand = Array.isArray(searchParams.brand) ? searchParams.brand[0] : searchParams.brand
  const model = Array.isArray(searchParams.model) ? searchParams.model[0] : searchParams.model
  const year = Array.isArray(searchParams.year) ? searchParams.year[0] : searchParams.year
  const series = Array.isArray(searchParams.series) ? searchParams.series[0] : searchParams.series

  if (color) where.color = { contains: color, mode: 'insensitive' }
  if (brand) where.brand = { contains: brand, mode: 'insensitive' }
  if (model) where.model = { contains: model, mode: 'insensitive' }
  if (year) where.year = parseInt(year)
  if (series) where.series = { contains: series, mode: 'insensitive' }

  // Get filtered items
  const filteredItems = await prisma.item.findMany({
    where,
  })

  // Get unique values for filters from all items in collection
  const allCollectionItems = collection.items
  const colors = [...new Set(allCollectionItems.map(i => i.color).filter(Boolean))]
  const brands = [...new Set(allCollectionItems.map(i => i.brand).filter(Boolean))]
  const models = [...new Set(allCollectionItems.map(i => i.model).filter(Boolean))]
  const years = [...new Set(allCollectionItems.map(i => i.year).filter(Boolean))] as number[]
  const seriesArray = [...new Set(allCollectionItems.map(i => i.series).filter(Boolean))]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Coollects</h1>
          <Link href="/collections">
            <Button variant="outline">Voltar</Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">{collection.name}</h2>
          {collection.description && (
            <p className="text-muted-foreground text-lg">{collection.description}</p>
          )}
          <div className="flex gap-2 mt-4">
            <Link href={`/collections/${collection.id}/edit`}>
              <Button>Editar</Button>
            </Link>
            <Link href={`/collections/${collection.id}/items/add`}>
              <Button variant="secondary">Adicionar Items</Button>
            </Link>
          </div>
        </div>

        {allCollectionItems.length > 0 && (
          <CollectionFilters
            colors={colors}
            brands={brands}
            models={models}
            years={years}
            series={seriesArray}
          />
        )}

        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            {allCollectionItems.length === 0 ? (
              <>
                <p className="text-muted-foreground mb-4">
                  Você ainda não adicionou items nesta coleção.
                </p>
                <Link href={`/collections/${collection.id}/items/add`}>
                  <Button>Adicionar Primeiro Item</Button>
                </Link>
              </>
            ) : (
              <p className="text-muted-foreground">
                Nenhum item encontrado com os filtros selecionados.
              </p>
            )}
          </div>
        ) : (
          <div>
            <p className="text-muted-foreground mb-4">
              {filteredItems.length} de {allCollectionItems.length} items
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <ItemCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  brand={item.brand || undefined}
                  model={item.model || undefined}
                  color={item.color || undefined}
                  imageUrl={item.imageUrl || undefined}
                  condition={item.condition || undefined}
                  value={item.value || undefined}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
