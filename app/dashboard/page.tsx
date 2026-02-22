import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { signOut } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { Package, FolderOpen, Sparkles, Share2, Home, LogOut, PlusIcon } from 'lucide-react'

export const metadata = {
  title: 'Dashboard - Coollects',
  description: 'Seu dashboard Coollects com estatísticas e ações rápidas',
}

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect('/login')
  }

  // Fetch statistics
  const [itemCount, collectionCount, recentItems, recentCollections] = await Promise.all([
    prisma.item.count({ where: { userId: session.user.id } }),
    prisma.collection.count({ where: { userId: session.user.id } }),
    prisma.item.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 4,
    }),
    prisma.collection.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 4,
    }),
  ])

  const totalValue = recentItems.reduce((sum, item) => sum + (item.value || 0), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Coollects
              </h1>
              <p className="text-sm text-muted-foreground">Bem-vindo, {session.user?.name || 'usuário'}</p>
            </div>
            <form
              action={async () => {
                'use server'
                await signOut({ redirectTo: '/' })
              }}
            >
              <Button type="submit" variant="ghost" size="sm" className="gap-2">
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/items/create">
              <div className="p-6 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent hover:border-primary/50 transition-all cursor-pointer h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Adicionar Item</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use IA para identificar automaticamente
                </p>
              </div>
            </Link>

            <Link href="/collections/new">
              <div className="p-6 rounded-lg border border-green-500/20 bg-gradient-to-br from-green-500/10 to-transparent hover:border-green-500/50 transition-all cursor-pointer h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <FolderOpen className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Nova Coleção</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Organize seus items em temas
                </p>
              </div>
            </Link>

            <Link href="/items">
              <div className="p-6 rounded-lg border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-transparent hover:border-blue-500/50 transition-all cursor-pointer h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Ver Items</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Gerencie sua coleção completa
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Suas Estatísticas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Items</CardTitle>
                <Package className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{itemCount}</div>
                <p className="text-xs text-muted-foreground">
                  {itemCount === 1 ? '1 item' : `${itemCount} items`} na sua coleção
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Coleções</CardTitle>
                <FolderOpen className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{collectionCount}</div>
                <p className="text-xs text-muted-foreground">
                  {collectionCount === 1 ? '1 coleção ativa' : `${collectionCount} coleções ativas`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
                <Package className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {totalValue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Valor estimado dos items</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Recent Items and Collections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Items */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Items Recentes</h2>
              <Link href="/items">
                <Button variant="ghost" size="sm">Ver todos</Button>
              </Link>
            </div>

            {recentItems.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground mb-4">Você ainda não tem items</p>
                  <Link href="/items/create">
                    <Button size="sm">
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Adicionar Item
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {recentItems.map(item => (
                  <Link key={item.id} href={`/items/${item.id}/edit`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="py-4">
                        <div className="flex gap-4">
                          {item.imageUrl && (
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                              <Image
                                src={item.imageUrl}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">{item.name}</p>
                            {item.brand && (
                              <p className="text-sm text-muted-foreground truncate">
                                {item.brand}
                                {item.model && ` - ${item.model}`}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">
                              Adicionado {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          {item.value && (
                            <div className="text-right flex-shrink-0">
                              <p className="font-semibold">R$ {item.value.toFixed(2)}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Recent Collections */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Coleções Recentes</h2>
              <Link href="/collections">
                <Button variant="ghost" size="sm">Ver todas</Button>
              </Link>
            </div>

            {recentCollections.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground mb-4">Você ainda não tem coleções</p>
                  <Link href="/collections/new">
                    <Button size="sm">
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Criar Coleção
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {recentCollections.map(collection => (
                  <Link key={collection.id} href={`/collections/${collection.id}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="py-4">
                        <div className="flex gap-4">
                          {collection.imageUrl && (
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                              <Image
                                src={collection.imageUrl}
                                alt={collection.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">{collection.name}</p>
                            {collection.description && (
                              <p className="text-sm text-muted-foreground truncate">
                                {collection.description}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                              {collection.isPublic && (
                                <div className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                                  <Share2 className="w-3 h-3" />
                                  Pública
                                </div>
                              )}
                              <p className="text-xs text-muted-foreground">
                                Criada {new Date(collection.createdAt).toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* CTA Section */}
        {collectionCount > 0 && (
          <section className="mt-12">
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Compartilhe Suas Coleções
                </CardTitle>
                <CardDescription>
                  Gere links públicos para suas coleções e compartilhe com outros colecionadores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/collections">
                  <Button>Compartilhar Coleção</Button>
                </Link>
              </CardContent>
            </Card>
          </section>
        )}
      </main>
    </div>
  )
}
