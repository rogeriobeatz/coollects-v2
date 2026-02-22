# Setup Coollects v2

## Pré-requisitos

- Node.js 18+
- PostgreSQL 14+
- conta Vercel (para Blob storage)
- Google Cloud Project (para Vision API e OAuth)

## Instalação Local

### 1. Clonar repositório
```bash
git clone <repo>
cd coollects-v2
```

### 2. Instalar dependências
```bash
npm install
# ou
pnpm install
```

### 3. Configurar banco de dados PostgreSQL

Criar um banco de dados:
```bash
createdb coollects
```

Ou usar um serviço como:
- Vercel Postgres
- Neon
- Supabase
- Railway

### 4. Configurar variáveis de ambiente

Copiar `.env.example` para `.env.local`:
```bash
cp .env.example .env.local
```

Editar `.env.local` com suas credenciais:

```env
# Database (obrigatório)
DATABASE_URL="postgresql://user:password@localhost:5432/coollects"

# Auth (obrigatório)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="openssl rand -base64 32"  # Gerar uma chave segura

# Google OAuth (opcional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Google Vision API (obrigatório para IA)
GOOGLE_VISION_API_KEY=""

# Vercel Blob (obrigatório para upload)
BLOB_READ_WRITE_TOKEN=""
```

### 5. Gerar chaves necessárias

#### NEXTAUTH_SECRET
```bash
openssl rand -base64 32
```

#### GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET
1. Ir para [Google Cloud Console](https://console.cloud.google.com)
2. Criar novo projeto
3. Habilitar "Google+ API"
4. Criar OAuth 2.0 Client ID (Web Application)
5. Adicionar URLs autorizadas:
   - Redirect: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://seu-domain.com/api/auth/callback/google`

#### GOOGLE_VISION_API_KEY
1. No Google Cloud Console, habilitar "Cloud Vision API"
2. Criar API key (ou usar a mesma do OAuth)

#### BLOB_READ_WRITE_TOKEN
1. Ir para Vercel Dashboard
2. Settings → Storage → Create → Blob
3. Copiar token

### 6. Inicializar banco de dados
```bash
npm run db:push
# ou
npm run db:migrate
```

### 7. Iniciar servidor de desenvolvimento
```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Estrutura do Projeto

```
coollects-v2/
├── app/                      # Next.js App Router
│   ├── api/                 # API Routes
│   │   ├── auth/           # Authentication
│   │   ├── items/          # Items CRUD
│   │   ├── collections/    # Collections CRUD
│   │   ├── upload/         # Image upload
│   │   └── ai/             # AI Vision
│   ├── (auth)/             # Auth pages (login, signup)
│   ├── (app)/              # Protected app pages
│   ├── dashboard/          # Dashboard
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
│
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   ├── auth/              # Auth components
│   ├── items/             # Item components
│   └── collections/       # Collection components
│
├── lib/                    # Utilities
│   ├── auth.ts           # Auth.js configuration
│   ├── prisma.ts         # Prisma client
│   ├── schemas.ts        # Zod validation schemas
│   └── utils.ts          # Helper functions
│
├── prisma/               # Prisma ORM
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Database migrations
│
├── public/               # Static files
│   ├── icons/           # App icons
│   └── manifest.json    # PWA manifest
│
└── scripts/              # Database scripts
```

## Desenvolvimento

### Adicionar novas features

#### 1. Adicionar rota API
```typescript
// app/api/minha-feature/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
  // Sua lógica aqui
  return NextResponse.json({ data: 'success' })
}
```

#### 2. Adicionar página
```typescript
// app/minha-pagina/page.tsx
export default function MinhaPage() {
  return <div>Conteúdo</div>
}
```

#### 3. Adicionar componente
```typescript
// components/MeuComponente.tsx
'use client'

export function MeuComponente() {
  return <div>Meu componente</div>
}
```

#### 4. Atualizar schema Prisma
```prisma
// prisma/schema.prisma
model MinhaTabela {
  id String @id @default(cuid())
  // campos aqui
}
```

Depois rodar:
```bash
npm run db:push
```

## Deploy no Vercel

### 1. Conectar repo ao Vercel
```bash
vercel link
```

### 2. Adicionar variáveis de ambiente no Vercel Dashboard
- Database URL (PostgreSQL)
- NEXTAUTH_SECRET (importante: gerar nova chave segura)
- NEXTAUTH_URL (seu domain)
- Google keys
- Blob token

### 3. Deploy
```bash
vercel deploy
```

## Troubleshooting

### Erro: "DATABASE_URL não encontrado"
- Verificar `.env.local` existe
- Verificar variável está corretamente setada
- Reiniciar servidor dev

### Erro de conexão PostgreSQL
- Verificar credentials
- Verificar firewall permite conexão
- Testar com `psql` diretamente

### Erro ao fazer upload de imagem
- Verificar `BLOB_READ_WRITE_TOKEN`
- Verificar Vercel Blob está ativado

### Erro de autenticação Google
- Verificar `GOOGLE_CLIENT_ID` e `GOOGLE_CLIENT_SECRET`
- Verificar redirect URI no Google Console

## Próximos passos

1. ✅ Setup inicial (você está aqui)
2. 🔜 Implementar autenticação (Fase 2)
3. 🔜 CRUD de items (Fase 3)
4. 🔜 Sistema de coleções (Fase 4)
5. 🔜 Upload de imagens (Fase 5)
6. 🔜 IA Vision (Fase 6)
7. 🔜 Compartilhamento (Fase 7)
8. 🔜 Dashboard (Fase 8)

## Suporte

Para questões, abrir issue no repositório ou ver documentação:
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Auth.js Docs](https://authjs.dev)
- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
