<?php
// Script de configuração do banco de dados para XAMPP
echo "<h1>🔧 Configuração do Banco de Dados - Coollects</h1>";

// Configurações do XAMPP
$host = 'localhost';
$user = 'root';
$pass = '';
$database = 'coollects';

echo "<h2>📋 Passo 1: Testando conexão com MySQL</h2>";

try {
    // Conectar sem especificar banco de dados
    $mysqli = new mysqli($host, $user, $pass);
    
    if ($mysqli->connect_error) {
        throw new Exception("Erro de conexão: " . $mysqli->connect_error);
    }
    
    echo "✅ <strong>MySQL conectado com sucesso!</strong><br>";
    echo "📊 Versão do MySQL: " . $mysqli->server_info . "<br><br>";
    
} catch (Exception $e) {
    echo "❌ <strong>Erro ao conectar com MySQL:</strong> " . $e->getMessage() . "<br>";
    echo "💡 Certifique-se de que o XAMPP está rodando e o MySQL está ativo.<br>";
    echo "🔧 Para iniciar o XAMPP:<br>";
    echo "1. Abra o XAMPP Control Panel<br>";
    echo "2. Clique em 'Start' ao lado de MySQL<br>";
    echo "3. Clique em 'Start' ao lado de Apache<br>";
    exit();
}

echo "<h2>📋 Passo 2: Criando banco de dados</h2>";

try {
    // Criar banco de dados se não existir
    $sql = "CREATE DATABASE IF NOT EXISTS `$database` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
    
    if ($mysqli->query($sql) === TRUE) {
        echo "✅ <strong>Banco de dados '$database' criado/verificado com sucesso!</strong><br><br>";
    } else {
        throw new Exception("Erro ao criar banco: " . $mysqli->error);
    }
    
} catch (Exception $e) {
    echo "❌ <strong>Erro ao criar banco de dados:</strong> " . $e->getMessage() . "<br>";
    exit();
}

echo "<h2>📋 Passo 3: Selecionando banco de dados</h2>";

try {
    $mysqli->select_db($database);
    echo "✅ <strong>Banco de dados '$database' selecionado!</strong><br><br>";
    
} catch (Exception $e) {
    echo "❌ <strong>Erro ao selecionar banco:</strong> " . $e->getMessage() . "<br>";
    exit();
}

echo "<h2>📋 Passo 4: Criando tabelas</h2>";

// Ler o arquivo SQL
$sql_file = 'database_setup.sql';
if (!file_exists($sql_file)) {
    echo "❌ <strong>Arquivo '$sql_file' não encontrado!</strong><br>";
    exit();
}

$sql_content = file_get_contents($sql_file);

// Dividir em comandos individuais
$commands = array_filter(array_map('trim', explode(';', $sql_content)));

$success_count = 0;
$error_count = 0;

foreach ($commands as $command) {
    if (empty($command) || strpos($command, '--') === 0) {
        continue; // Pular comentários e linhas vazias
    }
    
    try {
        if ($mysqli->query($command) === TRUE) {
            $success_count++;
            echo "✅ Comando executado com sucesso<br>";
        } else {
            $error_count++;
            echo "❌ Erro no comando: " . $mysqli->error . "<br>";
        }
    } catch (Exception $e) {
        $error_count++;
        echo "❌ Exceção no comando: " . $e->getMessage() . "<br>";
    }
}

echo "<br><h2>📊 Resumo da Execução</h2>";
echo "✅ Comandos executados com sucesso: $success_count<br>";
echo "❌ Erros encontrados: $error_count<br>";

if ($error_count == 0) {
    echo "<br><h2>🎉 Configuração Concluída!</h2>";
    echo "✅ <strong>Banco de dados configurado com sucesso!</strong><br>";
    echo "🌐 <a href='index.php' style='color: #6366f1; text-decoration: none; font-weight: bold;'>Clique aqui para acessar o Coollects</a><br>";
    
    // Verificar tabelas criadas
    echo "<br><h3>📋 Tabelas criadas:</h3>";
    $result = $mysqli->query("SHOW TABLES");
    if ($result) {
        while ($row = $result->fetch_array()) {
            echo "📄 " . $row[0] . "<br>";
        }
    }
    
} else {
    echo "<br><h2>⚠️ Configuração com Problemas</h2>";
    echo "Alguns comandos falharam. Verifique os erros acima.<br>";
    echo "💡 Dica: Algumas tabelas podem já existir, o que é normal.<br>";
}

$mysqli->close();

echo "<br><hr>";
echo "<p><strong>🔧 Próximos passos:</strong></p>";
echo "1. Certifique-se de que o Apache está rodando no XAMPP<br>";
echo "2. Coloque este projeto na pasta htdocs do XAMPP<br>";
echo "3. Acesse: <a href='http://localhost/coollects' style='color: #6366f1;'>http://localhost/coollects</a><br>";
echo "4. Crie um usuário e comece a usar o sistema!<br>";
?> 