import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { CollectionForm } from '@/components/collections/CollectionForm'
import { CollectionInput } from '@/lib/schemas'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Editar Coleção - Coollects',
  description: 'Edite os detalhes de sua coleção',
}

async function updateCollection(id: string, data: CollectionInput) {
  'use server'
  
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/login')
  }

  const collection = await prisma.collection.findFirst({
    where: { id, userId: session.user.id },
  })

  if (!collection) {
    throw new Error('Coleção não encontrada')
  }

  const updated = await prisma.collection.update({
    where: { id },
    data,
  })

  return updated
}

export default async function EditCollectionPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect('/login')
  }

  const collection = await prisma.collection.findFirst({
    where: { id: params.id, userId: session.user.id },
  })

  if (!collection) {
    redirect('/collections')
  }

  const initialData: CollectionInput & { id?: string } = {
    id: collection.id,
    name: collection.name,
    description: collection.description || undefined,
    isPublic: collection.isPublic,
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Coollects</h1>
          <Link href={`/collections/${params.id}`}>
            <Button variant="outline">Voltar</Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CollectionForm 
          initialData={initialData}
          onSubmit={async (data) => {
            await updateCollection(params.id, data)
          }}
        />
      </main>
    </div>
  )
}
