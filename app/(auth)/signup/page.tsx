import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AuthForm } from '@/components/auth/AuthForm'

export const metadata = {
  title: 'Criar Conta - Coollects',
  description: 'Crie uma conta Coollects para começar a catalogar',
}

export default async function SignupPage() {
  const session = await auth()
  
  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Coollects</h1>
          <p className="text-muted-foreground">Comece a catalogar suas coleções</p>
        </div>
        <AuthForm type="signup" />
      </div>
    </div>
  )
}
