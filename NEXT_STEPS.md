# Próximos Passos - Coollects v2

Parabéns! 5 de 8 fases foram implementadas. Este guia ajudará você a continuar o desenvolvimento.

---

## Checklist Imediato (Hoje)

### 1. Configurar Ambiente Local
```bash
# Clonar/Acessar projeto
cd coollects-v2

# Instalar dependências
npm install

# Copiar exemplo de ambiente
cp .env.example .env.local
```

### 2. Configurar Variáveis de Ambiente
Edite `.env.local`:

```env
# Database (OBRIGATÓRIO)
DATABASE_URL="postgresql://user:password@localhost:5432/coollects"

# Auth (OBRIGATÓRIO)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"

# Vercel Blob (OBRIGATÓRIO para imagens)
BLOB_READ_WRITE_TOKEN="seu_token_aqui"

# Google OAuth (OPCIONAL)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

### 3. Inicializar Banco de Dados
```bash
npm run db:push
```

### 4. Rodar Servidor de Desenvolvimento
```bash
npm run dev
```

### 5. Testar no Navegador
Abra http://localhost:3000 e teste:
- [x] Homepage
- [x] Signup (criar conta)
- [x] Login
- [x] Dashboard
- [x] Criar item
- [x] Upload de imagem
- [x] Criar coleção
- [x] Adicionar items à coleção
- [x] Filtrar por atributos

---

## Próxima Fase: IA Vision (Fase 6)

### Pré-requisitos
- [ ] Ter conta Google Cloud
- [ ] Ativar Google Vision API
- [ ] Obter API key

### Implementação (Estimada: 2-3 horas)

#### Passo 1: Obter Google Vision API Key
1. Ir para [Google Cloud Console](https://console.cloud.google.com)
2. Criar novo projeto (ou usar existente)
3. Habilitar "Cloud Vision API"
4. Criar credencial (API key)
5. Adicionar a `.env.local`:
```env
GOOGLE_VISION_API_KEY="seu_key_aqui"
```

#### Passo 2: Criar API Route para Vision
Criar arquivo: `app/api/ai/identify-item/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { imageUrl } = await req.json()

  // Chamar Google Vision API
  // Extrair: nome, marca, modelo, cor, etc
  // Retornar dados estruturados

  return NextResponse.json({ data: {} })
}
```

#### Passo 3: Criar Página de Upload com IA
Criar: `app/items/new/from-photo/page.tsx`

- Interface para upload de foto
- Botão "Identificar com IA"
- Mostrar resultado da IA
- Form pré-preenchido
- Permitir edições
- Salvar item

#### Passo 4: Componente para Vision
Criar: `components/ai/VisionIdentifier.tsx`

- Upload de imagem
- Chamada a `/api/ai/identify-item`
- Mostrar resultado
- Indicador de confiança
- Botão para confirmar/editar

### Checklist Fase 6
- [ ] Setup Google Vision API
- [ ] Criar API route
- [ ] Integrar @google-cloud/vision
- [ ] Criar página from-photo
- [ ] Criar componente VisionIdentifier
- [ ] Testar identificação
- [ ] Adicionar tratamento de erro
- [ ] Documentar no README

---

## Fase 7: Compartilhamento (Estimada: 1-2 horas)

### O que Implementar

#### 1. Gerar Share Token
```typescript
// Já existe no schema (shareToken)
// Adicionar função para gerar UUID
function generateShareToken(): string {
  return crypto.randomUUID()
}
```

#### 2. API de Share
```typescript
// POST /api/collections/[id]/share
// DELETE /api/collections/[id]/share
// Gerar/revogar token
```

#### 3. Página Pública
Criar: `app/share/[token]/page.tsx`

- Layout público (sem auth)
- Mostrar coleção pública
- Mostrar items da coleção
- Botão para baixar app
- Social share buttons

#### 4. Sistema de Favoritos
Criar: `app/api/favorites/route.ts`

- POST: Favoritar item (requer auth)
- DELETE: Desfavoritar
- GET: Listar favoritos do usuário

### Checklist Fase 7
- [ ] Atualizar schema (se necessário)
- [ ] Criar API de share
- [ ] Criar página pública
- [ ] Implementar favoritos
- [ ] Adicionar OG tags
- [ ] Social share buttons
- [ ] Testar link público
- [ ] Documentar

---

## Fase 8: Dashboard & Polish (Estimada: 2-3 horas)

### O que Implementar

#### 1. Dashboard Aprimorado
- [ ] Estatísticas (total items, coleções, valor)
- [ ] Gráficos (usando charts shadcn)
- [ ] Items recentes
- [ ] Coleções mais populares
- [ ] Sugestões de items

#### 2. Navegação Principal
- [ ] Sidebar fixa
- [ ] Menu responsivo
- [ ] Breadcrumbs
- [ ] Avatar do usuário

#### 3. Loading & Error States
- [ ] Skeletons de loading
- [ ] Error boundaries
- [ ] Mensagens de erro amigáveis
- [ ] Fallback pages

#### 4. Notificações
- [ ] Instalar Sonner
- [ ] Toasts de sucesso/erro
- [ ] Notificações de ações

#### 5. Dark Mode
- [ ] Detectar preferência do sistema
- [ ] Toggle de tema
- [ ] Persistir escolha

#### 6. Melhorias de UX
- [ ] Confirmação antes de deletar
- [ ] Undo de ações
- [ ] Shortcuts de teclado
- [ ] Busca global

---

## Deployment

### Opção 1: Vercel (Recomendado)
```bash
# Conectar projeto
vercel link

# Puxar variáveis de produção
vercel env pull

# Deploy automático ao fazer push no main
# ou manual:
vercel deploy --prod
```

### Opção 2: Railway
1. Conectar GitHub
2. Criar projeto Railway
3. Adicionar variáveis de ambiente
4. Deploy automático

### Opção 3: Render
1. Conectar GitHub
2. Criar Web Service
3. Adicionar ambiente
4. Deploy automático

### Variáveis de Produção
```env
DATABASE_URL=postgresql://...  # DB em produção
NEXTAUTH_URL=https://seu-dominio.com
NEXTAUTH_SECRET=chave-secreta-forte
BLOB_READ_WRITE_TOKEN=seu-token
GOOGLE_CLIENT_ID=seu-id
GOOGLE_CLIENT_SECRET=seu-secret
GOOGLE_VISION_API_KEY=sua-key
```

---

## Melhorias Futuras (Roadmap)

### Curto Prazo
- [ ] Fase 6: IA Vision
- [ ] Fase 7: Compartilhamento
- [ ] Fase 8: Polish
- [ ] Deploy para produção
- [ ] Testes automatizados

### Médio Prazo
- [ ] Mobile app (React Native)
- [ ] Busca por similaridade (pgvector)
- [ ] Feed social
- [ ] Sistema de recomendações
- [ ] Analytics dashboard
- [ ] Email notifications

### Longo Prazo
- [ ] Admin panel
- [ ] Marketplace de coleções
- [ ] Integração com APIs de preços
- [ ] Geolocalização de colecionadores
- [ ] Webhooks para eventos
- [ ] GraphQL API

---

## Recursos Úteis

### Documentação Oficial
- [Next.js 16](https://nextjs.org/docs)
- [Prisma](https://www.prisma.io/docs)
- [Auth.js](https://authjs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)

### Projeto
- [SETUP.md](./SETUP.md) - Configuração local
- [PROJECT_STATUS.md](./PROJECT_STATUS.md) - Status do projeto
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Resumo técnico

### Community
- [Next.js Discord](https://discord.gg/bUG9dS9)
- [Prisma Community](https://www.prisma.io/community)
- [shadcn/ui Discussions](https://github.com/shadcn-ui/ui/discussions)

---

## Debugging

### Banco de Dados
```bash
# Ver BD com interface visual
npm run db:studio

# Reset DB (cuidado!)
npx prisma migrate reset
```

### Logs
```bash
# Logs do servidor (veja no console)
npm run dev

# Logs do browser (F12 → Console)
```

### Problemas Comuns

**"DATABASE_URL não encontrado"**
- Verificar `.env.local` existe
- Verificar variável está escrita corretamente
- Reiniciar servidor dev

**"BLOB_READ_WRITE_TOKEN erro"**
- Verificar token no .env.local
- Verificar token é válido (Vercel)
- Renovar token se expirou

**"Google Vision error"**
- Verificar API habilitada (Google Cloud)
- Verificar key no .env.local
- Verificar quotas não foram excedidas

**"Auth error after logout"**
- Limpar cookies do navegador
- Fazer hard refresh (Ctrl+Shift+R)

---

## Dicas Produtividade

### Desenvolvimento Local
```bash
# Watch mode automático
npm run dev

# Studio Prisma em tempo real
npm run db:studio

# Linting automático
npm run lint
```

### Commits Git
```bash
# Estrutura recomendada
git commit -m "Feature: Descrição curta

- Detalhe 1
- Detalhe 2
- Detalhe 3"
```

### Branches
```bash
# Main branch = sempre pronto para deploy
git checkout main

# Feature branch
git checkout -b feature/nova-feature

# Bugfix branch
git checkout -b fix/bug-description
```

---

## Teste de Funcionalidades

### Teste Manual Completo

```bash
# 1. Auth Flow
[ ] Signup com email/senha
[ ] Signup com Google
[ ] Login com email/senha
[ ] Login com Google
[ ] Logout
[ ] Dashboard acesso

# 2. Items
[ ] Criar item manual
[ ] Upload imagem
[ ] Editar item
[ ] Deletar item
[ ] Listar items
[ ] Ver detalhe

# 3. Coleções
[ ] Criar coleção
[ ] Editar coleção
[ ] Deletar coleção
[ ] Adicionar items
[ ] Remover items
[ ] Filtrar por cor
[ ] Filtrar por marca
[ ] Filtrar por modelo
[ ] Filtrar por ano
[ ] Filtrar por série

# 4. Imagens
[ ] Upload JPEG
[ ] Upload PNG
[ ] Upload WebP
[ ] Upload GIF
[ ] Rejeitar BMP
[ ] Rejeitar arquivo > 5MB
[ ] Ver preview
```

---

## Métricas a Monitorar

### Performance
- Tempo de carregamento da página
- Tempo de upload de imagem
- Tempo de query no banco
- Memory usage

### Qualidade
- Erros no console
- Warnings de TypeScript
- Coverage de testes (futuro)
- Acessibilidade (Lighthouse)

### Negócio
- Usuários registrados
- Items criados
- Coleções criadas
- Imagens uploaded

---

## Suporte & Ajuda

### Se Tiver Dúvidas
1. Ler documentação relevante (vide links acima)
2. Procurar em Stack Overflow
3. Consultar código existente
4. Perguntar à comunidade

### Reportar Bugs
1. Descrever problema detalhadamente
2. Incluir error message
3. Incluir steps para reproduzir
4. Incluir screenshots se relevante
5. Abrir issue no GitHub

---

## Timeline Estimado para MVP Final

| Fase | Estimativa | Status |
|------|-----------|--------|
| 1-5 | ~15h | ✅ CONCLUÍDO |
| 6 | 2-3h | 🔜 PRÓXIMA |
| 7 | 1-2h | 📋 PLANEJADA |
| 8 | 2-3h | 📋 PLANEJADA |
| **Total** | **~20-22h** | **~62.5%** |

**Estimativa para MVP Final: 1-2 semanas** (trabalhando ~2-3h por dia)

---

## Parabéns! 🎉

Você tem agora um MVP funcional e moderno do Coollects com:

✅ Autenticação completa  
✅ CRUD de items  
✅ Sistema de coleções  
✅ Upload de imagens  
✅ Code quality alto  
✅ Pronto para escalar  

**Próximo passo: Implementar Fase 6 (IA Vision)!**

---

**Boa sorte! 🚀**

Para questões, consulte os arquivos de documentação ou abra uma issue no repositório.
