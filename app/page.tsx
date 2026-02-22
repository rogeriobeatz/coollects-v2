import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sparkles, Grid3x3, Share2, Zap, Shield, Smartphone } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      {/* Header/Navigation */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Coollects
          </h1>
          <div className="flex gap-2">
            <Link href="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link href="/signup">
              <Button>Criar Conta</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
              Catalogar, Organizar e
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Compartilhar Suas Coleções
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A plataforma completa para colecionadores. De Hot Wheels a qualquer outro colecionável, identifique automaticamente com IA, organize com filtros avançados e compartilhe com a comunidade.
            </p>
          </div>

          <div className="flex gap-4 justify-center flex-wrap pt-4">
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                <Sparkles className="w-4 h-4" />
                Começar Agora
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">
                Já tenho conta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Recursos Principais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow border-primary/10">
            <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold text-lg mb-2">IA Vision</h4>
            <p className="text-muted-foreground">
              Tire uma foto de seu item. A IA identifica automaticamente marca, modelo, cor, ano e série em segundos.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-green-500/10">
            <div className="p-3 rounded-lg bg-green-500/10 w-fit mb-4">
              <Grid3x3 className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Filtros Avançados</h4>
            <p className="text-muted-foreground">
              Organize por cor, marca, modelo, ano e série. Encontre exatamente o que procura em segundos.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-blue-500/10">
            <div className="p-3 rounded-lg bg-blue-500/10 w-fit mb-4">
              <Share2 className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Compartilhamento</h4>
            <p className="text-muted-foreground">
              Gere links públicos para suas coleções. Mostre seu acervo para a comunidade sem autenticação.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-purple-500/10">
            <div className="p-3 rounded-lg bg-purple-500/10 w-fit mb-4">
              <Smartphone className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Mobile First</h4>
            <p className="text-muted-foreground">
              Funciona perfeitamente em smartphones, tablets e desktops. Acesse de qualquer lugar.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-orange-500/10">
            <div className="p-3 rounded-lg bg-orange-500/10 w-fit mb-4">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Rápido e Responsivo</h4>
            <p className="text-muted-foreground">
              Interface ultra-rápida com sincronização em tempo real. Nenhuma espera desnecessária.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-red-500/10">
            <div className="p-3 rounded-lg bg-red-500/10 w-fit mb-4">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Seguro e Privado</h4>
            <p className="text-muted-foreground">
              Seus dados são seus. Controle total sobre o que é público ou privado.
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Como Funciona</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { num: '1', title: 'Registre', desc: 'Crie sua conta em segundos' },
            { num: '2', title: 'Fotografe', desc: 'Tire foto do seu item' },
            { num: '3', title: 'Organize', desc: 'A IA identifica automaticamente' },
            { num: '4', title: 'Compartilhe', desc: 'Gere link público se quiser' },
          ].map((step, idx) => (
            <div key={idx} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">{step.num}</span>
              </div>
              <h4 className="font-semibold mb-2">{step.title}</h4>
              <p className="text-muted-foreground text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <Card className="p-12 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <h3 className="text-3xl font-bold mb-4">Pronto para começar?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de colecionadores que já estão usando Coollects para catalogar e compartilhar suas coleções.
          </p>
          <Link href="/signup">
            <Button size="lg" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Criar Conta Agora
            </Button>
          </Link>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; 2026 Coollects. Feito para colecionadores, por colecionadores.</p>
        </div>
      </footer>
    </main>
  )
}
