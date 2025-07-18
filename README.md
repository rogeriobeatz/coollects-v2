# 🎯 Coollects - Sistema de Coleções

[![PHP](https://img.shields.io/badge/PHP-8.0+-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://php.net)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)

> **Sistema completo e seguro para gerenciamento de coleções pessoais** 🚀

## 📋 Índice

- [✨ Características](#-características)
- [🛠️ Tecnologias](#️-tecnologias)
- [📦 Instalação](#-instalação)
- [⚙️ Configuração](#️-configuração)
- [🔐 Segurança](#-segurança)
- [📱 PWA](#-pwa)
- [🎨 Personalização](#-personalização)
- [🐛 Troubleshooting](#-troubleshooting)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)

## ✨ Características

### 🔐 **Segurança Avançada**
- ✅ **Prepared Statements** - Proteção contra SQL Injection
- ✅ **Hash de Senhas** - Bcrypt com custo configurável
- ✅ **Sanitização de Entrada** - Proteção contra XSS
- ✅ **Sessões Seguras** - Configurações HTTPOnly e Secure
- ✅ **Validação Dupla** - Server-side e Client-side
- ✅ **Log de Atividades** - Auditoria completa

### 🎯 **Funcionalidades Principais**
- 👤 **Sistema de Usuários** - Registro e login seguro
- 📚 **Gerenciamento de Coleções** - CRUD completo
- 🎨 **Categorização** - Sistema flexível de categorias
- 🖼️ **Upload de Imagens** - Integração com ImgBB API
- 📱 **Interface Responsiva** - Mobile-first design
- 🔍 **Busca e Filtros** - Navegação intuitiva

### 🎨 **Interface Moderna**
- 🎭 **Animações Lottie** - Introdução elegante
- 🎨 **Design System** - Componentes consistentes
- 📱 **PWA Ready** - Instalação como app nativo
- 🌙 **Tema Adaptativo** - Suporte a modo escuro
- ♿ **Acessibilidade** - ARIA labels e navegação por teclado

## 🛠️ Tecnologias

### **Backend**
- **PHP 8.0+** - Linguagem principal
- **MySQL 8.0+** - Banco de dados
- **MySQLi** - Driver de conexão

### **Frontend**
- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos com variáveis
- **JavaScript ES6+** - Interatividade
- **Lottie** - Animações vetoriais

### **APIs e Serviços**
- **ImgBB API** - Upload de imagens
- **PWA Manifest** - Configuração de app
- **Service Worker** - Cache offline

## 📦 Instalação

### **Pré-requisitos**
- PHP 8.0 ou superior
- MySQL 8.0 ou superior
- Servidor web (Apache/Nginx)
- Extensões PHP: mysqli, json, session

### **Passo a Passo**

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/coollects.git
cd coollects
```

2. **Configure o banco de dados**
```bash
# Acesse seu MySQL
mysql -u root -p

# Crie o banco de dados
CREATE DATABASE coollects CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Execute o script de setup
mysql -u root -p coollects < database_setup.sql
```

3. **Configure as credenciais**
```bash
# Copie o arquivo de exemplo
cp config.example.php config.php

# Edite com suas credenciais
nano config.php
```

4. **Configure o servidor web**
```apache
# Apache (.htaccess já incluído)
# Certifique-se que mod_rewrite está habilitado
```

5. **Configure permissões**
```bash
# Crie diretórios necessários
mkdir log
mkdir uploads
chmod 755 log uploads
```

## ⚙️ Configuração

### **Arquivo config.php**
```php
// Configurações do banco de dados
define('HOST', 'localhost');
define('USER', 'seu_usuario');
define('PASS', 'sua_senha');
define('BASE', 'coollects');

// Configurações da aplicação
define('APP_NAME', 'Coollects');
define('APP_VERSION', '2.0.0');
define('APP_URL', 'https://seu-dominio.com');

// Configurações de segurança
define('HASH_COST', 12);
define('SESSION_TIMEOUT', 3600);
```

### **Variáveis de Ambiente (Opcional)**
```bash
# .env (se implementado)
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=coollects
```

### **Configurações de Sessão**
```php
// Configurações automáticas no config.php
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1);
ini_set('session.use_strict_mode', 1);
```

## 🔐 Segurança

### **Implementado**
- ✅ **Prepared Statements** em todas as queries
- ✅ **Hash de senhas** com bcrypt
- ✅ **Sanitização de entrada** global
- ✅ **Validação server-side** rigorosa
- ✅ **Sessões seguras** com configurações adequadas
- ✅ **Log de atividades** para auditoria
- ✅ **Proteção contra XSS** com htmlspecialchars

### **Recomendações Adicionais**
- 🔒 **HTTPS** - Use sempre em produção
- 🔒 **Rate Limiting** - Implemente limitação de tentativas
- 🔒 **2FA** - Autenticação de dois fatores
- 🔒 **Backup** - Backup regular do banco
- 🔒 **Monitoramento** - Logs de segurança

## 📱 PWA

### **Características**
- 📱 **Instalável** - Adicione à tela inicial
- 🔄 **Offline** - Cache de recursos essenciais
- 📲 **App-like** - Experiência nativa
- 🔔 **Notificações** - Push notifications (futuro)

### **Configuração**
```json
// manifest.json
{
  "name": "Coollects",
  "short_name": "Coollects",
  "description": "Sistema de Coleções",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#6366f1",
  "background_color": "#ffffff"
}
```

## 🎨 Personalização

### **Cores e Temas**
```css
/* style/style.css */
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --success-color: #10b981;
  --error-color: #ef4444;
  --warning-color: #f59e0b;
  --info-color: #3b82f6;
}
```

### **Categorias**
```sql
-- Adicione novas categorias
INSERT INTO categorias (name_cat, emoji_cat, desc_cat) 
VALUES ('Livros', '📚', 'Coleção de livros');
```

### **Ícones e Imagens**
- Substitua arquivos em `/icons/`
- Atualize `manifest.json`
- Modifique `sw.js` se necessário

## 🐛 Troubleshooting

### **Problemas Comuns**

#### **Erro de Conexão com Banco**
```bash
# Verifique as credenciais em config.php
# Teste a conexão
php -r "include 'config.php'; echo 'Conexão OK';"
```

#### **Erro de Permissões**
```bash
# Configure permissões corretas
chmod 755 log uploads
chmod 644 config.php
```

#### **Página em Branco**
```bash
# Ative logs de erro
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

#### **Upload de Imagens Não Funciona**
```bash
# Verifique a API key do ImgBB
# Teste a conexão com a API
curl -X POST "https://api.imgbb.com/1/upload" \
  -F "key=SUA_API_KEY" \
  -F "image=@teste.jpg"
```

### **Logs e Debug**
```bash
# Verifique logs de erro
tail -f log/error.log

# Log de atividades
SELECT * FROM activity_log ORDER BY timestamp DESC LIMIT 10;
```

## 🤝 Contribuição

### **Como Contribuir**
1. **Fork** o projeto
2. **Crie** uma branch para sua feature
3. **Commit** suas mudanças
4. **Push** para a branch
5. **Abra** um Pull Request

### **Padrões de Código**
- **PHP**: PSR-12
- **CSS**: BEM methodology
- **JavaScript**: ES6+ standards
- **Commits**: Conventional Commits

### **Testes**
```bash
# Execute testes (se implementados)
php vendor/bin/phpunit

# Verifique sintaxe
php -l arquivo.php
```

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

- 📧 **Email**: rogeriobeatz@gmail.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/seu-usuario/coollects/issues)
- 📖 **Documentação**: [Wiki](https://github.com/seu-usuario/coollects/wiki)

## 📈 Roadmap

### **v2.1.0** (Próxima versão)
- 🔍 **Sistema de busca avançada**
- 📊 **Estatísticas e relatórios**
- 🔔 **Notificações push**
- 🌙 **Modo escuro completo**

### **v2.2.0** (Futuro)
- 📱 **App nativo** (React Native)
- 🔗 **API REST** completa
- 🤖 **Integração com IA**
- 🌍 **Multi-idioma**

---

<div align="center">
  <p>Feito com ❤️ por <strong>Rogério</strong></p>
  <p>⭐ Se este projeto te ajudou, considere dar uma estrela!</p>
</div> 