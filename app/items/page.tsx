import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ItemCard } from '@/components/items/ItemCard'

export const metadata = {
  title: 'Meus Items - Coollects',
  description: 'Visualize todos os seus items',
}

async function deleteItem(id: string, userId: string) {
  'use server'

  const item = await prisma.item.findFirst({
    where: { id, userId },
  })

  if (!item) {
    throw new Error('Item não encontrado')
  }

  await prisma.item.delete({
    where: { id },
  })
}

export default async function ItemsPage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect('/login')
  }

  const items = await prisma.item.findMany({
    where: { userId: session.user.id },
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
          <h2 className="text-3xl font-bold">Meus Items</h2>
          <Link href="/items/new">
            <Button>Novo Item</Button>
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Você ainda não adicionou nenhum item.</p>
            <Link href="/items/new">
              <Button>Adicionar Primeiro Item</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => (
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
                onDelete={async () => {
                  'use server'
                  await deleteItem(item.id, session.user.id!)
                }}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
