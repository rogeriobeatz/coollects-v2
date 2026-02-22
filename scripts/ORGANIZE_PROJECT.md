## Organizando o Projeto - Removendo Arquivos Antigos PHP

Este arquivo lista os arquivos antigos que devem ser movidos para a pasta `old/`.

### Arquivos PHP Antigos para Mover:

**Raiz do projeto (22 arquivos):**
- acesso/login.php
- acesso/novo-usuario.php
- acesso/salvar-usuario.php
- check_xampp.php
- colecao.php
- config.example.php
- header.php
- home.php
- index.php
- item.php
- listar-colecoes.php
- listar-item.php
- listar-usuario.php
- logout.php
- nova-colecao.php
- novo-item.php
- pre-home.php
- protect.php
- salvar-collection.php
- salvar-item.php
- setup_database.php
- teste-upload.php

**Arquivos de configuração/database antigos:**
- database_setup.sql
- config.example.php

**Pastas antigas:**
- acesso/ (pasta inteira)
- imgs/ (pasta de imagens antigas)

### Manter no Projeto (Next.js):

✅ app/ - Novo app React
✅ components/ - Novos componentes React
✅ lib/ - Bibliotecas e utilitários (Prisma, Auth, etc)
✅ prisma/ - Schema do banco de dados
✅ public/ - Assets estáticos
✅ scripts/ - Scripts de utilidade
✅ package.json - Dependências Node.js
✅ tsconfig.json - Configuração TypeScript
✅ tailwind.config.ts - Tailwind CSS
✅ next.config.mjs - Next.js config
✅ middleware.ts - Middleware Next.js
✅ .env.example - Variáveis de ambiente modernas

### Como Executar a Reorganização:

1. Criar pasta `old/`
2. Mover arquivos PHP antigos para `old/`
3. Mover pastas antigas (acesso, imgs) para `old/`
4. Atualizar .gitignore
5. Fazer commit com mensagem: "refactor: reorganize project - move legacy PHP files to old/"
