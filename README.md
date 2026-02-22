# Coollects v2 - Plataforma Moderna para Colecionadores

[![Next.js](https://img.shields.io/badge/Next.js-16.0+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.0+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-5.7+-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io)

> **Catalogar, organizar e compartilhar suas coleções com inteligência artificial** 🚀

**v2.0 - Completamente reescrito em React/Next.js com IA Vision, Autenticação Segura, e Deploy Pronto para Produção**

## Índice

- [Características](#-características)
- [Tecnologias](#️-tecnologias)
- [Quick Start](#-quick-start)
- [Instalação Completa](#-instalação-completa)
- [Deploy](#-deploy)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Documentação](#-documentação)
- [Licença](#-licença)

## Características

### IA Vision
- **Identificação Automática** - Tire uma foto e a IA identifica marca, modelo, cor, ano e série
- **Google Vision API** - Tecnologia de ponta para reconhecimento de objetos
- **Preenchimento Automático** - Campos preenchidos automaticamente após identificação
- **Fallback Manual** - Opção de preenchimento manual sempre disponível

### Coleções Avançadas
- **5 Filtros Poderosos** - Organize por cor, marca, modelo, ano e série
- **Compartilhamento Público** - Gere links únicos para compartilhar coleções
- **Acesso Anônimo** - Outros usuários veem suas coleções sem precisar fazer login
- **Gerenciamento Completo** - CRUD de coleções e items com permissões

### Upload e Armazenamento
- **Vercel Blob** - CDN automático e rápido para suas imagens
- **Drag & Drop** - Interface intuitiva de upload
- **Suporte a Galeria** - Envie fotos que já tem no seu dispositivo
- **Otimização Automática** - Imagens otimizadas para web

### Autenticação e Segurança
- **Auth.js** - Autenticação moderna e segura
- **Email/Senha** - Registro com hash bcrypt
- **OAuth Google** - Login social integrado
- **Sessões Seguras** - HTTP-only cookies com refresh tokens
- **HTTPS Obrigatório** - Em produção sempre

### Interface Moderna
- **React 19 + Next.js 16** - Framework mais moderno do mercado
- **TypeScript 100%** - Sem erros de tipo
- **Tailwind CSS** - Estilos modernos e responsivos
- **shadcn/ui** - Componentes acessíveis e polidos
- **Mobile-First** - Funciona perfeitamente em qualquer dispositivo

## Tecnologias

### Frontend
- **Next.js 16** - React framework com API routes integradas
- **React 19** - Componentes com Server Components e hooks modernos
- **TypeScript 5.3** - Type safety completo
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **shadcn/ui** - Componentes React acessíveis
- **Lucide React** - Ícones SVG modernos

### Backend
- **Next.js API Routes** - Backend sem servidor
- **Auth.js (NextAuth)** - Autenticação moderna
- **Prisma 5.7** - ORM type-safe
- **Zod** - Validação de schemas

### Database & Storage
- **PostgreSQL 15** - Banco de dados relacional
- **Vercel Blob** - Cloud storage para imagens
- **pgvector** - Extensão para busca vetorial (futuro)

### IA & APIs
- **Google Vision API** - Reconhecimento de imagens
- **Vercel AI Gateway** - Integração centralizada com modelos
- **Vercel Workflows** - Orquestração de processamento

## Quick Start

```bash
# 1. Instale dependências
npm install

# 2. Configure variáveis de ambiente
cp .env.example .env.local

# 3. Configure banco de dados
npm run db:push

# 4. Inicie desenvolvimento
npm run dev

# Abra http://localhost:3000
```

## Instalação Completa

### Pré-requisitos
- Node.js 18+ e npm/pnpm/yarn
- PostgreSQL 14+ (local ou serviço cloud como Neon)
- Conta Vercel (opcional para deploy)
- Chave API Google Cloud (para Vision API)

### Passo a Passo

1. **Clone e configure**
```bash
git clone https://github.com/seu-usuario/coollects-v2.git
cd coollects-v2
npm install
```

2. **Variáveis de Ambiente**
```bash
cp .env.example .env.local
# Edite .env.local com:
# DATABASE_URL - PostgreSQL connection string
# BLOB_READ_WRITE_TOKEN - Vercel Blob token
# GOOGLE_CLIENT_ID - Google OAuth
# GOOGLE_CLIENT_SECRET - Google OAuth
# NEXTAUTH_SECRET - gerado com: openssl rand -base64 32
```

3. **Database**
```bash
npm run db:push      # Sincroniza schema
npm run db:seed      # (Opcional) Popula dados de teste
```

4. **Desenvolvimento**
```bash
npm run dev          # Inicia em http://localhost:3000
npm run build        # Build para produção
npm start            # Inicia servidor de produção
```

## Deploy

### Vercel (Recomendado)
```bash
# 1. Push para GitHub
git push origin main

# 2. Import no Vercel Dashboard
# - Conecte seu repo GitHub
# - Configure variáveis de ambiente
# - Deploy automático

# 3. Sua app está em: https://seu-projeto.vercel.app
```

### Outras Plataformas
- **Railway** - Suporte PostgreSQL integrado
- **Render** - Deploy gratuito com banco
- **Fly.io** - Docker-based deployment
- **DigitalOcean** - Full control com App Platform

## Estrutura do Projeto

```
coollects-v2/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Grupo de rotas de autenticação
│   ├── api/                 # API routes
│   ├── collections/         # Páginas de coleções
│   ├── items/              # Páginas de items
│   ├── dashboard/          # Dashboard do usuário
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Landing page
│
├── components/              # React components
│   ├── ui/                 # Componentes base (button, card, etc)
│   ├── auth/               # Componentes de autenticação
│   ├── items/              # Componentes de items
│   └── collections/        # Componentes de coleções
│
├── lib/                    # Utilities e configuração
│   ├── prisma.ts          # Cliente Prisma
│   ├── auth.ts            # Configuração Auth.js
│   ├── schemas.ts         # Validações Zod
│   └── services/          # Serviços (Vision, etc)
│
├── prisma/                # Prisma ORM
│   └── schema.prisma      # Schema do banco
│
├── public/                # Assets estáticos
└── scripts/               # Scripts utilitários
```

## Segurança

### Implementado
- **Prisma** - Prepared statements automáticas
- **bcrypt** - Hash de senhas com custo 10
- **Auth.js** - Sessions seguras com refresh tokens
- **Zod** - Validação rigorosa de entrada
- **CORS** - Configurado corretamente
- **Rate Limiting** - No servidor (futuro)
- **HTTPS** - Obrigatório em produção
- **RLS (Row Level Security)** - No PostgreSQL (futuro)

### Checklist Pré-Produção
- [ ] `.env` configurado com credenciais seguras
- [ ] `NEXTAUTH_SECRET` gerado aleatoriamente
- [ ] Banco de dados em servidor seguro (não localhost)
- [ ] HTTPS habilitado em todas as rotas
- [ ] Variáveis sensíveis nunca commitadas
- [ ] Backups automáticos do banco configurados

## Documentação

### Guias
- **[START_HERE.md](./START_HERE.md)** - Comece aqui! Guia rápido
- **[SETUP.md](./SETUP.md)** - Instalação detalhada
- **[PROJECT_COMPLETE.md](./PROJECT_COMPLETE.md)** - Documentação completa
- **[PHASE_1_*.md](./PHASE_1_IA_VISION.md)** - Detalhes de cada feature

### Variáveis de Ambiente Necessárias

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/coollects

# Vercel Blob
BLOB_READ_WRITE_TOKEN=your_token_here

# Google OAuth
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx

# Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generated_with_openssl

# Opcional - Google Vision (se usar localmente)
GOOGLE_CLOUD_PROJECT_ID=your_project_id
```

## Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev              # Servidor com hot reload
npm run lint            # Lint com ESLint
npm run type-check      # Type check TypeScript

# Banco de dados
npm run db:push         # Sincronizar schema
npm run db:pull         # Puxar schema existente
npm run db:generate     # Gerar tipos Prisma
npm run db:seed         # Popular com dados de teste
npm run db:studio       # Abrir Prisma Studio (UI do banco)

# Produção
npm run build           # Build otimizado
npm start               # Rodar build localmente
npm run analyze         # Analisar bundle size
```

## Troubleshooting

### Erro: "DATABASE_URL não definida"
```bash
# Verifique se .env.local existe
ls -la .env.local

# Regenere se necessário
cp .env.example .env.local
```

### Erro: "Prisma client not found"
```bash
# Regenere o cliente Prisma
npm run db:generate
```

### Erro: "Cannot find module"
```bash
# Limpe node_modules e reinstale
rm -rf node_modules package-lock.json
npm install
```

### Porta 3000 já em uso
```bash
# Use porta diferente
npm run dev -- -p 3001
```

### Google Vision não funciona
```bash
# Verifique se a API está habilitada na Google Cloud
# Teste com curl:
curl -X POST "https://vision.googleapis.com/v1/images:annotate?key=YOUR_KEY"
```

## Roadmap Futuro

- [ ] Busca por similaridade visual com pgvector
- [ ] Feed social de coleções populares
- [ ] Sistema de favoritos global
- [ ] Mobile app nativo (React Native)
- [ ] API REST pública
- [ ] Sistema de recomendações com IA
- [ ] Modo offline com Service Workers
- [ ] Backup automático para cloud
- [ ] Dark mode completo
- [ ] Multi-idioma (i18n)

## Licença

MIT - Veja [LICENSE](LICENSE) para detalhes

## Autores e Créditos

- **Rogério Beatz** - Product Owner e Development Lead
- **v0 by Vercel** - AI-powered implementation

## Suporte e Contato

- GitHub Issues para bugs e sugestões
- Email: rogeriobeatz@gmail.com
- Documentação: Veja [START_HERE.md](./START_HERE.md)

---

Feito com dedicação para a comunidade de colecionadores 🏎️

Se este projeto ajudou você, considere deixar uma estrela ⭐ 
