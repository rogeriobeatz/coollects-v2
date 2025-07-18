# 🎯 Coollects - App para Colecionadores

Uma plataforma web moderna e segura para colecionadores gerenciarem suas coleções de forma organizada e intuitiva.

## ✨ Características

- 🔐 **Sistema de autenticação seguro** com hash de senhas
- 🛡️ **Proteção contra SQL Injection** usando prepared statements
- 📱 **Design responsivo** para desktop e mobile
- 🎨 **Interface moderna** com animações suaves
- 📊 **Gestão completa** de coleções e itens
- 🖼️ **Upload de imagens** com integração ImgBB
- 📈 **Logs de atividades** para auditoria
- 🔍 **Busca e filtros** avançados
- 📱 **PWA** (Progressive Web App) para instalação

## 🚀 Instalação

### Pré-requisitos

- PHP 7.4 ou superior
- MySQL 5.7 ou superior
- Servidor web (Apache/Nginx)
- Extensões PHP: mysqli, json, mbstring

### Passos de Instalação

1. **Clone ou baixe o projeto**
   ```bash
   git clone https://github.com/seu-usuario/coollects.git
   cd coollects
   ```

2. **Configure o banco de dados**
   - Crie um banco de dados MySQL
   - Execute o arquivo `database_setup.sql` no seu banco de dados
   - Isso criará todas as tabelas necessárias e dados iniciais

3. **Configure as credenciais**
   - Edite o arquivo `config.php`
   - Atualize as constantes de conexão com o banco:
   ```php
   define('HOST', 'seu-host');
   define('USER', 'seu-usuario');
   define('PASS', 'sua-senha');
   define('BASE', 'seu-banco');
   ```

4. **Configure o upload de imagens (opcional)**
   - Crie uma conta no [ImgBB](https://imgbb.com/)
   - Obtenha sua API key
   - Atualize a chave no arquivo `novo-item.php` (linha ~150)

5. **Configure as permissões**
   ```bash
   chmod 755 log/
   chmod 644 log/error.log
   ```

6. **Acesse a aplicação**
   - Abra seu navegador
   - Acesse: `http://localhost/coollects`

## 📁 Estrutura do Projeto

```
coollects/
├── acesso/                 # Sistema de autenticação
│   ├── login.php          # Página de login
│   ├── novo-usuario.php   # Cadastro de usuários
│   └── salvar-usuario.php # Processamento de cadastro
├── assets/                # Recursos estáticos
│   ├── intro-anim.json    # Animações Lottie
│   └── WorkSans-*.ttf     # Fontes
├── icons/                 # Ícones PWA
├── images/                # Imagens do sistema
├── js/                    # JavaScript
├── log/                   # Logs de erro
├── style/                 # Estilos CSS
├── config.php             # Configurações
├── database_setup.sql     # Estrutura do banco
├── index.php              # Página inicial
├── home.php               # Dashboard principal
├── pre-home.php           # Tela de boas-vindas
├── nova-colecao.php       # Criação de coleções
├── novo-item.php          # Adição de itens
├── listar-colecoes.php    # Lista de coleções
├── listar-item.php        # Lista de itens
├── colecao.php            # Visualização de coleção
├── item.php               # Visualização de item
├── salvar-collection.php  # Processamento de coleções
├── salvar-item.php        # Processamento de itens
├── logout.php             # Logout
├── manifest.json          # Configuração PWA
├── sw.js                  # Service Worker
└── README.md              # Este arquivo
```

## 🔧 Configuração Avançada

### Variáveis de Ambiente

Para maior segurança, você pode usar variáveis de ambiente:

```php
// config.php
define('HOST', $_ENV['DB_HOST'] ?? 'localhost');
define('USER', $_ENV['DB_USER'] ?? 'root');
define('PASS', $_ENV['DB_PASS'] ?? '');
define('BASE', $_ENV['DB_NAME'] ?? 'coollects');
```

### Configuração de Sessão

O sistema já está configurado com sessões seguras, mas você pode personalizar:

```php
// config.php
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1); // Para HTTPS
ini_set('session.use_strict_mode', 1);
ini_set('session.gc_maxlifetime', 3600); // 1 hora
```

### Logs e Monitoramento

Os logs são salvos em `log/error.log`. Para monitoramento:

```bash
# Ver logs em tempo real
tail -f log/error.log

# Limpar logs antigos
find log/ -name "*.log" -mtime +30 -delete
```

## 🎨 Personalização

### Cores e Tema

Edite as variáveis CSS em `style/style.css`:

```css
:root {
    --color-primary: #650fee;      /* Cor principal */
    --color-secondary: #F15700;    /* Cor secundária */
    --color-grey: #F3F3F3;         /* Cor de fundo */
    --color-white: #fffefb;        /* Cor branca */
    --color-dark: #1b1a1b;         /* Cor escura */
}
```

### Categorias

Para adicionar novas categorias, edite o arquivo `database_setup.sql` ou insira diretamente no banco:

```sql
INSERT INTO categorias (name_cat, emoji_cat, desc_cat) 
VALUES ('Nova Categoria', '🎯', 'Descrição da categoria');
```

## 🔒 Segurança

### Recursos de Segurança Implementados

- ✅ **Prepared Statements** para prevenir SQL Injection
- ✅ **Hash de senhas** com bcrypt
- ✅ **Sanitização de inputs** 
- ✅ **Validação de dados** no cliente e servidor
- ✅ **Controle de sessão** seguro
- ✅ **Logs de atividades** para auditoria
- ✅ **Verificação de permissões** por usuário
- ✅ **Headers de segurança** configurados

### Recomendações Adicionais

1. **Use HTTPS** em produção
2. **Configure um firewall** no servidor
3. **Mantenha o PHP atualizado**
4. **Faça backups regulares** do banco de dados
5. **Monitore os logs** regularmente

## 📱 PWA (Progressive Web App)

O Coollects funciona como um PWA, permitindo:

- 📲 **Instalação** no dispositivo
- 🔄 **Funcionamento offline** básico
- 📱 **Interface nativa** no mobile
- 🔔 **Notificações push** (futuro)

### Configuração PWA

Edite `manifest.json` para personalizar:

```json
{
  "name": "Coollects - App para Colecionadores",
  "short_name": "Coollects",
  "theme_color": "#F15700",
  "background_color": "#ffffff"
}
```

## 🐛 Solução de Problemas

### Problemas Comuns

1. **Erro de conexão com banco**
   - Verifique as credenciais em `config.php`
   - Confirme se o MySQL está rodando

2. **Página em branco**
   - Verifique os logs em `log/error.log`
   - Confirme se o PHP tem permissão de escrita

3. **Upload de imagens não funciona**
   - Verifique a API key do ImgBB
   - Confirme se o PHP tem extensão cURL

4. **Sessão não persiste**
   - Verifique as permissões da pasta de sessão
   - Confirme se o PHP tem extensão session

### Logs de Debug

Para ativar logs detalhados, edite `config.php`:

```php
error_reporting(E_ALL);
ini_set('display_errors', 1); // Apenas em desenvolvimento
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Suporte

- 📧 **Email**: suporte@coollects.com
- 💬 **Discord**: [Link do servidor]
- 📖 **Documentação**: [Link da documentação]

## 🔄 Changelog

### v2.0.0 (Atual)
- ✨ Sistema de autenticação seguro
- 🛡️ Proteção contra SQL Injection
- 📱 Design responsivo melhorado
- 🎨 Interface moderna
- 📊 Gestão completa de coleções
- 🔍 Sistema de busca
- 📱 Suporte PWA

### v1.0.0
- 🎯 Versão inicial
- 📝 Funcionalidades básicas
- 🎨 Design simples

---

**Desenvolvido com ❤️ para a comunidade de colecionadores brasileiros** 