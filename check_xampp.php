<?php
// Script para verificar configuração do XAMPP
echo "<h1>🔍 Verificação da Configuração XAMPP</h1>";

echo "<h2>📁 Informações do Sistema</h2>";
echo "📂 Diretório atual: " . __DIR__ . "<br>";
echo "🌐 URL atual: " . $_SERVER['REQUEST_URI'] . "<br>";
echo "🔧 Servidor: " . $_SERVER['SERVER_SOFTWARE'] . "<br>";
echo "📊 PHP Version: " . phpversion() . "<br><br>";

echo "<h2>🔧 Verificação do XAMPP</h2>";

// Verificar se estamos na pasta htdocs
$current_path = __DIR__;
$htdocs_path = strpos($current_path, 'htdocs');

if ($htdocs_path !== false) {
    echo "✅ <strong>Projeto está na pasta htdocs do XAMPP!</strong><br>";
    echo "📂 Caminho: " . $current_path . "<br><br>";
} else {
    echo "⚠️ <strong>Atenção:</strong> Projeto pode não estar na pasta htdocs do XAMPP<br>";
    echo "📂 Caminho atual: " . $current_path . "<br>";
    echo "💡 Para funcionar corretamente, mova o projeto para a pasta htdocs do XAMPP<br>";
    echo "🔧 Exemplo: C:\\xampp\\htdocs\\coollects<br><br>";
}

echo "<h2>🔌 Verificação de Extensões PHP</h2>";

$required_extensions = ['mysqli', 'json', 'session'];
$missing_extensions = [];

foreach ($required_extensions as $ext) {
    if (extension_loaded($ext)) {
        echo "✅ $ext - Carregada<br>";
    } else {
        echo "❌ $ext - Não encontrada<br>";
        $missing_extensions[] = $ext;
    }
}

if (empty($missing_extensions)) {
    echo "<br>✅ <strong>Todas as extensões necessárias estão disponíveis!</strong><br>";
} else {
    echo "<br>❌ <strong>Extensões faltando:</strong> " . implode(', ', $missing_extensions) . "<br>";
    echo "💡 Verifique se o XAMPP está instalado corretamente<br>";
}

echo "<br><h2>🌐 Teste de Acesso Web</h2>";

if (isset($_SERVER['HTTP_HOST'])) {
    echo "✅ <strong>Servidor web detectado!</strong><br>";
    echo "🌐 Host: " . $_SERVER['HTTP_HOST'] . "<br>";
    echo "🔗 Protocolo: " . (isset($_SERVER['HTTPS']) ? 'HTTPS' : 'HTTP') . "<br>";
} else {
    echo "❌ <strong>Servidor web não detectado!</strong><br>";
    echo "💡 Certifique-se de que o Apache está rodando no XAMPP<br>";
}

echo "<br><h2>📋 Próximos Passos</h2>";

if ($htdocs_path !== false && empty($missing_extensions)) {
    echo "✅ <strong>Tudo configurado corretamente!</strong><br>";
    echo "🚀 <a href='setup_database.php' style='color: #6366f1; font-weight: bold;'>Clique aqui para configurar o banco de dados</a><br>";
    echo "🌐 <a href='index.php' style='color: #6366f1; font-weight: bold;'>Clique aqui para acessar o Coollects</a><br>";
} else {
    echo "⚠️ <strong>Configuração incompleta!</strong><br>";
    echo "🔧 Ações necessárias:<br>";
    echo "1. Mova o projeto para a pasta htdocs do XAMPP<br>";
    echo "2. Inicie o Apache e MySQL no XAMPP Control Panel<br>";
    echo "3. Execute este script novamente<br>";
}

echo "<br><hr>";
echo "<p><strong>🔧 Comandos úteis:</strong></p>";
echo "• XAMPP Control Panel: Inicie Apache e MySQL<br>";
echo "• phpMyAdmin: http://localhost/phpmyadmin<br>";
echo "• Projeto: http://localhost/coollects<br>";
?> 