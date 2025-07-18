<?php
// Configurações de segurança
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', 'log/error.log');

// Configurações do banco de dados
define('HOST', 'seu_host_aqui');
define('USER', 'seu_usuario_aqui');
define('PASS', 'sua_senha_aqui');
define('BASE', 'seu_banco_aqui');

// Configurações da aplicação
define('APP_NAME', 'Coollects');
define('APP_VERSION', '2.0.0');
define('APP_URL', 'https://seu-dominio.com');

// Configurações de segurança
define('HASH_COST', 12);
define('SESSION_TIMEOUT', 3600); // 1 hora

// Inicialização da sessão com configurações seguras
if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.cookie_httponly', 1);
    ini_set('session.cookie_secure', 1);
    ini_set('session.use_strict_mode', 1);
    session_start();
}

// Conexão com o banco de dados com tratamento de erro
try {
    $conn = new mysqli(HOST, USER, PASS, BASE);
    $mysqli = new mysqli(HOST, USER, PASS, BASE);
    
    if ($conn->connect_error) {
        error_log("Erro de conexão com banco: " . $conn->connect_error);
        die("Erro de conexão com o banco de dados");
    }
    
    // Configurar charset
    $conn->set_charset("utf8mb4");
    $mysqli->set_charset("utf8mb4");
    
} catch (Exception $e) {
    error_log("Erro fatal de conexão: " . $e->getMessage());
    die("Erro interno do servidor");
}

// Funções de segurança
function sanitize_input($data) {
    global $mysqli;
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $mysqli->real_escape_string($data);
}

function hash_password($password) {
    return password_hash($password, PASSWORD_BCRYPT, ['cost' => HASH_COST]);
}

function verify_password($password, $hash) {
    return password_verify($password, $hash);
}

function is_logged_in() {
    return isset($_SESSION['id']) && isset($_SESSION['nome']);
}

function require_login() {
    if (!is_logged_in()) {
        header("Location: index.php");
        exit();
    }
}

function log_activity($user_id, $action, $details = '') {
    $timestamp = date('Y-m-d H:i:s');
    $sql = "INSERT INTO activity_log (user_id, action, details, timestamp) VALUES (?, ?, ?, ?)";
    $stmt = $GLOBALS['mysqli']->prepare($sql);
    $stmt->bind_param("isss", $user_id, $action, $details, $timestamp);
    $stmt->execute();
}
?> 