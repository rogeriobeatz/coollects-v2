import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ItemForm } from '@/components/items/ItemForm'
import { ItemInput } from '@/lib/schemas'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Editar Item - Coollects',
  description: 'Edite os detalhes do seu item',
}

async function updateItem(id: string, data: ItemInput) {
  'use server'
  
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/login')
  }

  // Verify ownership
  const item = await prisma.item.findFirst({
    where: { id, userId: session.user.id },
  })

  if (!item) {
    throw new Error('Item não encontrado')
  }

  const updated = await prisma.item.update({
    where: { id },
    data,
  })

  return updated
}

export default async function EditItemPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect('/login')
  }

  const item = await prisma.item.findFirst({
    where: { id: params.id, userId: session.user.id },
  })

  if (!item) {
    redirect('/items')
  }

  const initialData: ItemInput & { id?: string } = {
    id: item.id,
    name: item.name,
    description: item.description || undefined,
    color: item.color || undefined,
    brand: item.brand || undefined,
    model: item.model || undefined,
    year: item.year || undefined,
    series: item.series || undefined,
    condition: item.condition || undefined,
    value: item.value || undefined,
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Coollects</h1>
          <Link href="/items">
            <Button variant="outline">Voltar</Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ItemForm 
          initialData={initialData}
          onSubmit={async (data) => {
            await updateItem(params.id, data)
          }}
        />
      </main>
    </div>
  )
}
