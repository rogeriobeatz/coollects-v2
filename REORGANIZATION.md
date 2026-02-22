## Reorganização do Projeto - PHP → React/Next.js

### O que mudou?

Este projeto foi **completamente refatorado** de uma aplicação PHP/MySQL para uma **moderna arquitetura React/Next.js** com TypeScript, Prisma, PostgreSQL e IA integrada.

### Arquivos Movidos para `old/` (Legado PHP)

Todos os arquivos antigos do projeto em PHP foram movidos para a pasta `/old/` para referência histórica:

**PHP Files:**
- `acesso/` - Sistema de autenticação antigo
- `index.php` - Home page antiga
- `home.php` - Dashboard antigo
- `item.php`, `novo-item.php`, `listar-item.php`, `salvar-item.php`
- `colecao.php`, `nova-colecao.php`, `listar-colecoes.php`, `salvar-collection.php`
- `login.php`, `logout.php`, `novo-usuario.php`, `salvar-usuario.php`
- Outros arquivos PHP de suporte

**Database:**
- `database_setup.sql` - Schema MySQL antigo
- `config.example.php` - Configurações PHP antigas

### Nova Estrutura (Next.js/React)

```
coollects-v2/
├── app/                    # Next.js App Router (novo)
├── components/             # React components (novo)
├── lib/                    # Utilities e serviços (novo)
├── prisma/                # ORM e schema PostgreSQL (novo)
├── package.json           # Node.js dependencies (novo)
├── tsconfig.json          # TypeScript config (novo)
├── .env.example           # Env vars modernas (novo)
├── .gitignore            # Git ignore atualizado (modificado)
├── README.md             # Documentação atualizada (modificado)
└── old/                  # Arquivos PHP antigos (archived)
```

### Mudanças Tecnológicas

| Aspecto | Antes (PHP) | Depois (Next.js) |
|---------|-----------|-----------------|
| **Runtime** | PHP 8.0+ | Node.js 18+ |
| **Linguagem** | PHP | TypeScript |
| **Frontend** | HTML + CSS + JS | React 19 + Tailwind |
| **Backend** | PHP (mesmo arquivo) | Next.js API Routes |
| **Database** | MySQL | PostgreSQL |
| **ORM** | MySQLi native | Prisma |
| **Auth** | Sessions PHP | Auth.js (NextAuth) |
| **IA** | Não tinha | Google Vision API |
| **Storage** | ImgBB API | Vercel Blob |
| **Deploy** | Hosting tradicional | Vercel (serverless) |

### Como Migrar Dados

Se você tem dados no banco MySQL antigo, consulte:
- `/old/database_setup.sql` - Schema MySQL original
- `/scripts/migrate-mysql-to-postgres.sql` - Script de migração

### IDE e GitHub

#### VSCode
O VSCode agora reconhece automaticamente o projeto como:
- **Workspace**: JavaScript/TypeScript (Next.js)
- **Inteligência**: Suporte completo a TypeScript, React, Tailwind
- **Extensões Recomendadas**:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - Prisma
  - Thunder Client (para testar APIs)

#### GitHub
O repositório agora mostra:
- **Linguagem principal**: TypeScript (não mais PHP)
- **Build**: Next.js (deploy automático no Vercel)
- **Dependências**: npm/yarn/pnpm
- **CI/CD**: Vercel deployment automático

### Começar com o Novo Projeto

```bash
# 1. Instale dependências Node.js
npm install

# 2. Configure variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais

# 3. Setup do banco de dados
npm run db:push

# 4. Inicie desenvolvimento
npm run dev

# 5. Acesse em http://localhost:3000
```

### Referência aos Arquivos Antigos

Os arquivos antigos em PHP ainda estão disponíveis em `/old/` para:
- **Referência de lógica** - Se precisar ver como algo funcionava antes
- **Migração de dados** - Scripts e queries SQL
- **Histórico** - Mantido para fins de documentação

### Não há mais suporte para

- ❌ Arquivos `.php` na raiz do projeto
- ❌ MySQL (migramos para PostgreSQL)
- ❌ Configurações em `config.php`
- ❌ Session middleware PHP
- ❌ ImgBB para upload (usando Vercel Blob)

### Próximos Passos

1. **Leia** [START_HERE.md](./START_HERE.md) - Guia rápido
2. **Configure** variáveis de ambiente
3. **Execute** `npm install && npm run db:push`
4. **Inicie** com `npm run dev`
5. **Explore** a interface em http://localhost:3000

---

**Este é o novo Coollects v2! 🚀**

Um projeto moderno, escalável e pronto para produção com IA integrada.
