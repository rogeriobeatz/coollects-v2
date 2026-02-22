import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { signOut } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
  title: 'Dashboard - Coollects',
  description: 'Seu dashboard Coollects',
}

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Coollects</h1>
          <div className="flex items-center gap-4">
            <span className="text-foreground">Olá, {session.user?.name || 'usuário'}</span>
            <form
              action={async () => {
                'use server'
                await signOut({ redirectTo: '/' })
              }}
            >
              <Button type="submit" variant="outline">
                Sair
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 border border-border rounded-lg hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">Novo Item</h3>
            <p className="text-muted-foreground mb-4">
              Adicione um novo item manualmente
            </p>
            <Link href="/items/new">
              <Button className="w-full">Criar Item</Button>
            </Link>
          </div>

          <div className="p-6 border border-border rounded-lg hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">Item via Foto</h3>
            <p className="text-muted-foreground mb-4">
              Tire uma foto e deixe a IA identificar
            </p>
            <Link href="/items/new/from-photo">
              <Button className="w-full" variant="secondary">
                Foto
              </Button>
            </Link>
          </div>

          <div className="p-6 border border-border rounded-lg hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">Nova Coleção</h3>
            <p className="text-muted-foreground mb-4">
              Organize seus itens em coleções
            </p>
            <Link href="/collections/new">
              <Button className="w-full" variant="secondary">
                Criar Coleção
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="p-6 border border-border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Seus Items</h2>
            <p className="text-muted-foreground mb-4">
              Gerencie todos os seus itens colecionáveis
            </p>
            <Link href="/items">
              <Button>Ver Todos os Items</Button>
            </Link>
          </div>

          <div className="p-6 border border-border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Suas Coleções</h2>
            <p className="text-muted-foreground mb-4">
              Organize seus itens em coleções temáticas
            </p>
            <Link href="/collections">
              <Button>Ver Todas as Coleções</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
