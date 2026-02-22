import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { ItemForm } from '@/components/items/ItemForm'
import { ItemInput } from '@/lib/schemas'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Novo Item - Coollects',
  description: 'Adicione um novo item à sua coleção',
}

async function createItem(data: ItemInput) {
  'use server'
  
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/login')
  }

  const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `__Host-authjs.csrf-token=${process.env.NEXTAUTH_SECRET}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Erro ao criar item')
  }

  return response.json()
}

export default async function NewItemPage() {
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
        <ItemForm 
          onSubmit={async (data) => {
            try {
              await createItem(data)
            } catch (error) {
              throw error
            }
          }}
        />
      </main>
    </div>
  )
}
