import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { CollectionForm } from '@/components/collections/CollectionForm'
import { CollectionInput } from '@/lib/schemas'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Nova Coleção - Coollects',
  description: 'Crie uma nova coleção',
}

async function createCollection(data: CollectionInput) {
  'use server'
  
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/login')
  }

  const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/collections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Erro ao criar coleção')
  }

  return response.json()
}

export default async function NewCollectionPage() {
  const session = await auth()
  
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Coollects</h1>
          <Link href="/dashboard">
            <Button variant="outline">Voltar</Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CollectionForm 
          onSubmit={async (data) => {
            try {
              await createCollection(data)
            } catch (error) {
              throw error
            }
          }}
        />
      </main>
    </div>
  )
}
