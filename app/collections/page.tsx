import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export const metadata = {
  title: 'Minhas Coleções - Coollects',
  description: 'Visualize todas as suas coleções',
}

async function deleteCollection(id: string, userId: string) {
  'use server'

  const collection = await prisma.collection.findFirst({
    where: { id, userId },
  })

  if (!collection) {
    throw new Error('Coleção não encontrada')
  }

  await prisma.collection.delete({
    where: { id },
  })
}

export default async function CollectionsPage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect('/login')
  }

  const collections = await prisma.collection.findMany({
    where: { userId: session.user.id },
    include: {
      items: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Coollects</h1>
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Minhas Coleções</h2>
          <Link href="/collections/new">
            <Button>Nova Coleção</Button>
          </Link>
        </div>

        {collections.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Você ainda não criou nenhuma coleção.</p>
            <Link href="/collections/new">
              <Button>Criar Primeira Coleção</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map(collection => (
              <Card key={collection.id} className="p-6 hover:shadow-lg transition cursor-pointer">
                <Link href={`/collections/${collection.id}`}>
                  <h3 className="text-xl font-semibold mb-2 hover:text-primary">
                    {collection.name}
                  </h3>
                </Link>
                
                {collection.description && (
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {collection.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                  <span>{collection.items.length} items</span>
                  {collection.isPublic && (
                    <span className="px-2 py-1 bg-accent rounded text-xs font-medium">
                      Público
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link href={`/collections/${collection.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      Ver
                    </Button>
                  </Link>
                  <Link href={`/collections/${collection.id}/edit`} className="flex-1">
                    <Button variant="secondary" className="w-full">
                      Editar
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
