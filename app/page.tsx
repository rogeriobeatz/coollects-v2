import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-primary">Coollects</h1>
          <p className="text-xl text-muted-foreground">
            Catalogar, organizar e compartilhar suas coleções
          </p>
        </div>

        <p className="text-lg text-foreground max-w-md mx-auto">
          O aplicativo perfeito para colecionadores de Hot Wheels e muito mais. 
          Tire fotos dos seus itens e a IA identifica automaticamente!
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/login"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition"
          >
            Entrar
          </Link>
          <Link
            href="/signup"
            className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition border border-border"
          >
            Criar Conta
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 bg-secondary rounded-lg">
            <div className="text-3xl mb-2">📷</div>
            <h3 className="font-semibold mb-2">Foto → Cadastro</h3>
            <p className="text-sm text-muted-foreground">
              Tire uma foto e a IA identifica o item automaticamente
            </p>
          </div>
          <div className="p-6 bg-secondary rounded-lg">
            <div className="text-3xl mb-2">🎨</div>
            <h3 className="font-semibold mb-2">Organize com Filtros</h3>
            <p className="text-sm text-muted-foreground">
              Crie coleções filtradas por cor, marca, modelo, ano e série
            </p>
          </div>
          <div className="p-6 bg-secondary rounded-lg">
            <div className="text-3xl mb-2">🔗</div>
            <h3 className="font-semibold mb-2">Compartilhe</h3>
            <p className="text-sm text-muted-foreground">
              Compartilhe suas coleções via link público
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
