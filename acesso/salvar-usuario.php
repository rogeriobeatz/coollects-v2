<?php
include('../config.php');

$error_message = '';
$success_message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao']) && $_POST['acao'] === 'cadastrar') {
    
    // Sanitizar e validar dados
    $nome = sanitize_input($_POST['nome'] ?? '');
    $sobrenome = sanitize_input($_POST['sobrenome'] ?? '');
    $email = sanitize_input($_POST['email'] ?? '');
    $senha = $_POST['senha'] ?? '';
    $data_nasc = sanitize_input($_POST['data_nasc'] ?? '');
    
    // Validações
    if (empty($nome) || strlen($nome) < 2) {
        $error_message = "Nome deve ter pelo menos 2 caracteres";
    } elseif (empty($sobrenome) || strlen($sobrenome) < 2) {
        $error_message = "Sobrenome deve ter pelo menos 2 caracteres";
    } elseif (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error_message = "Email inválido";
    } elseif (empty($senha) || strlen($senha) < 6) {
        $error_message = "Senha deve ter pelo menos 6 caracteres";
    } elseif (empty($data_nasc)) {
        $error_message = "Data de nascimento é obrigatória";
    } else {
        
        // Verificar se email já existe
        $check_sql = "SELECT id FROM usuarios WHERE email = ?";
        $check_stmt = $mysqli->prepare($check_sql);
        
        if ($check_stmt) {
            $check_stmt->bind_param("s", $email);
            $check_stmt->execute();
            $check_result = $check_stmt->get_result();
            
            if ($check_result->num_rows > 0) {
                $error_message = "Este email já está cadastrado";
            } else {
                // Hash da senha
                $senha_hash = hash_password($senha);
                
                // Inserir usuário
                $insert_sql = "INSERT INTO usuarios (nome, sobrenome, email, senha, data_nasc, data_cadastro) VALUES (?, ?, ?, ?, ?, NOW())";
                $insert_stmt = $mysqli->prepare($insert_sql);
                
                if ($insert_stmt) {
                    $insert_stmt->bind_param("sssss", $nome, $sobrenome, $email, $senha_hash, $data_nasc);
                    
                    if ($insert_stmt->execute()) {
                        $user_id = $mysqli->insert_id;
                        
                        // Log da atividade
                        log_activity($user_id, 'register', 'Novo usuário cadastrado');
                        
                        $success_message = "Cadastro realizado com sucesso! Faça login para continuar.";
                        
                        // Redirecionar após 2 segundos
                        header("refresh:2;url=../index.php?page=login");
                    } else {
                        $error_message = "Erro ao cadastrar usuário";
                        error_log("Erro ao inserir usuário: " . $insert_stmt->error);
                    }
                    $insert_stmt->close();
                } else {
                    $error_message = "Erro interno do servidor";
                    error_log("Erro no prepared statement de inserção: " . $mysqli->error);
                }
            }
            $check_stmt->close();
        } else {
            $error_message = "Erro interno do servidor";
            error_log("Erro no prepared statement de verificação: " . $mysqli->error);
        }
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Novo Usuário - Coollects</title>
    <link rel="stylesheet" href="../style/style.css">
    <link rel="stylesheet" href="../style/normalize.css">
</head>
<body>
    <div class="login-overlay">
        <div class="login-modal form">
            <img src="../images/coollects.png" alt="Coollects Logo" class="logo">
            <h3 class="alg-cnt">Crie uma nova conta!</h3>
            
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
            
            <form action="" method="POST" class="form" id="registerForm">
                <input type="hidden" name="acao" value="cadastrar">
                
                <label for="nome">Nome</label>
                <input type="text" name="nome" id="nome" required 
                       value="<?php echo isset($_POST['nome']) ? htmlspecialchars($_POST['nome']) : ''; ?>"
                       minlength="2" maxlength="50">
                
                <label for="sobrenome">Sobrenome</label>
                <input type="text" name="sobrenome" id="sobrenome" required 
                       value="<?php echo isset($_POST['sobrenome']) ? htmlspecialchars($_POST['sobrenome']) : ''; ?>"
                       minlength="2" maxlength="50">
                
                <label for="email">Email</label>
                <input type="email" name="email" id="email" required 
                       value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>">
                
                <label for="senha">Senha</label>
                <input type="password" name="senha" id="senha" required minlength="6">
                
                <label for="data_nasc">Data de Nascimento</label>
                <input type="date" name="data_nasc" id="data_nasc" required 
                       value="<?php echo isset($_POST['data_nasc']) ? htmlspecialchars($_POST['data_nasc']) : ''; ?>">
                
                <button type="submit" class="orange">Cadastrar</button>
            </form>
            
            <div class="form-footer">
                <a href="#" onclick="history.back()" class="link-align">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M20 12L4 12L10 18M7 9L10 6" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg> 
                    Voltar
                </a>
                
                <a href="?page=login" class="link-align">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15M10 17L15 12M15 12L10 7M15 12H3" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Já tenho conta
                </a>
            </div>
        </div>
    </div>

    <script>
        // Validação do lado do cliente
        document.getElementById('registerForm').addEventListener('submit', function(e) {
            const nome = document.getElementById('nome').value.trim();
            const sobrenome = document.getElementById('sobrenome').value.trim();
            const email = document.getElementById('email').value.trim();
            const senha = document.getElementById('senha').value;
            const dataNasc = document.getElementById('data_nasc').value;
            
            // Validações
            if (nome.length < 2) {
                e.preventDefault();
                alert('Nome deve ter pelo menos 2 caracteres');
                return false;
            }
            
            if (sobrenome.length < 2) {
                e.preventDefault();
                alert('Sobrenome deve ter pelo menos 2 caracteres');
                return false;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Por favor, insira um email válido');
                return false;
            }
            
            if (senha.length < 6) {
                e.preventDefault();
                alert('Senha deve ter pelo menos 6 caracteres');
                return false;
            }
            
            if (!dataNasc) {
                e.preventDefault();
                alert('Por favor, selecione sua data de nascimento');
                return false;
            }
            
            // Verificar se a data não é no futuro
            const hoje = new Date();
            const dataNascimento = new Date(dataNasc);
            if (dataNascimento > hoje) {
                e.preventDefault();
                alert('Data de nascimento não pode ser no futuro');
                return false;
            }
        });
    </script>
</body>
</html>



