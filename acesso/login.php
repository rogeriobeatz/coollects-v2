<?php
include('../config.php');

$error_message = '';
$success_message = '';

if(isset($_POST['email']) && isset($_POST['senha'])) {
    $email = sanitize_input($_POST['email']);
    $senha = $_POST['senha']; // Não sanitizar senha antes da verificação

    if(empty($email)) {
        $error_message = "Preencha seu e-mail";
    } elseif(empty($senha)) {
        $error_message = "Preencha sua senha";
    } else {
        // Usar prepared statement para prevenir SQL injection
        $sql = "SELECT id, nome, email, senha FROM usuarios WHERE email = ?";
        $stmt = $mysqli->prepare($sql);
        
        if ($stmt) {
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows == 1) {
                $usuario = $result->fetch_assoc();
                
                // Verificar se a senha está em hash ou texto plano (para migração)
                if (password_verify($senha, $usuario['senha']) || $senha === $usuario['senha']) {
                    // Se a senha estava em texto plano, atualizar para hash
                    if ($senha === $usuario['senha']) {
                        $new_hash = hash_password($senha);
                        $update_sql = "UPDATE usuarios SET senha = ? WHERE id = ?";
                        $update_stmt = $mysqli->prepare($update_sql);
                        $update_stmt->bind_param("si", $new_hash, $usuario['id']);
                        $update_stmt->execute();
                    }
                    
                    // Configurar sessão
                    $_SESSION['id'] = $usuario['id'];
                    $_SESSION['nome'] = $usuario['nome'];
                    $_SESSION['email'] = $usuario['email'];
                    $_SESSION['login_time'] = time();
                    
                    // Log da atividade
                    log_activity($usuario['id'], 'login', 'Login realizado com sucesso');
                    
                    header("Location: ../pre-home.php");
                    exit();
                } else {
                    $error_message = "Email ou senha incorretos";
                }
            } else {
                $error_message = "Email ou senha incorretos";
            }
            $stmt->close();
        } else {
            $error_message = "Erro interno do servidor";
            error_log("Erro no prepared statement de login: " . $mysqli->error);
        }
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Coollects</title>
    <link rel="stylesheet" href="../style/style.css">
    <link rel="stylesheet" href="../style/normalize.css">
</head>
<body>
    <div class="login-overlay">
        <div class="login-modal">
            <img src="../images/coollects.png" alt="Coollects Logo" class="logo">
            <h3 class="alg-cnt">Faça seu login</h3>
            
            <?php if ($error_message): ?>
                <div class="alert alert-error">
                    <?php echo htmlspecialchars($error_message); ?>
                </div>
            <?php endif; ?>
            
            <?php if ($success_message): ?>
                <div class="alert alert-success">
                    <?php echo htmlspecialchars($success_message); ?>
                </div>
            <?php endif; ?>
            
            <form action="" method="post" class="form" id="loginForm">
                <label for="email">Email</label>
                <input placeholder="Seu Email" type="email" name="email" id="email" required 
                       value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>">
                
                <label for="senha">Senha</label>
                <input placeholder="Sua Senha" type="password" name="senha" id="senha" required>
                
                <button type="submit" class="orange">Entrar</button>
            </form>
            
            <div class="form-footer">
                <a href="#" onclick="history.back()" class="link-align">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M20 12L4 12L10 18M7 9L10 6" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg> 
                    Voltar
                </a>
                
                <a href="?page=novo" class="link-align">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5V19M5 12H19" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Criar conta
                </a>
            </div>
        </div>
    </div>

    <script>
        // Validação do lado do cliente
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            const email = document.getElementById('email').value.trim();
            const senha = document.getElementById('senha').value.trim();
            
            if (!email) {
                e.preventDefault();
                alert('Por favor, preencha seu email');
                return false;
            }
            
            if (!senha) {
                e.preventDefault();
                alert('Por favor, preencha sua senha');
                return false;
            }
            
            // Validação básica de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Por favor, insira um email válido');
                return false;
            }
        });
    </script>
</body>
</html>