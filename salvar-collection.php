<h1>
    Salvar Coleção
</h1>

<?php
include('config.php');
require_login();

$error_message = '';
$success_message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao'])) {
    
    switch ($_POST['acao']) {
        case 'cadastrar':
            // Sanitizar e validar dados
            $owner_id = (int)$_POST['owner_id'];
            $categoria = sanitize_input($_POST['categoria'] ?? '');
            $col_name = sanitize_input($_POST['col_name'] ?? '');
            $col_color = sanitize_input($_POST['col_color'] ?? '#650fee');
            $col_desc = sanitize_input($_POST['col_desc'] ?? '');
            
            // Validações
            if ($owner_id !== (int)$_SESSION['id']) {
                $error_message = "Erro de autenticação";
                break;
            }
            
            if (empty($categoria)) {
                $error_message = "Selecione uma categoria";
                break;
            }
            
            if (empty($col_name) || strlen($col_name) < 3) {
                $error_message = "Nome da coleção deve ter pelo menos 3 caracteres";
                break;
            }
            
            if (empty($col_color) || !preg_match('/^#[a-fA-F0-9]{6}$/', $col_color)) {
                $col_color = '#650fee'; // Cor padrão se inválida
            }
            
            if (strlen($col_desc) > 500) {
                $error_message = "Descrição muito longa (máximo 500 caracteres)";
                break;
            }
            
            // Verificar se a categoria existe
            $check_cat_sql = "SELECT cat_id FROM categorias WHERE cat_id = ?";
            $check_cat_stmt = $mysqli->prepare($check_cat_sql);
            
            if ($check_cat_stmt) {
                $check_cat_stmt->bind_param("i", $categoria);
                $check_cat_stmt->execute();
                $cat_result = $check_cat_stmt->get_result();
                
                if ($cat_result->num_rows === 0) {
                    $error_message = "Categoria inválida";
                    $check_cat_stmt->close();
                    break;
                }
                $check_cat_stmt->close();
            }
            
            // Inserir coleção
            $insert_sql = "INSERT INTO collections (owner_id, categoria, col_name, col_color, col_desc, data_criacao) VALUES (?, ?, ?, ?, ?, NOW())";
            $insert_stmt = $mysqli->prepare($insert_sql);
            
            if ($insert_stmt) {
                $insert_stmt->bind_param("iisss", $owner_id, $categoria, $col_name, $col_color, $col_desc);
                
                if ($insert_stmt->execute()) {
                    $collection_id = $mysqli->insert_id;
                    
                    // Log da atividade
                    log_activity($owner_id, 'create_collection', "Coleção criada: $col_name (ID: $collection_id)");
                    
                    $success_message = "Coleção criada com sucesso!";
                    
                    // Redirecionar após 1 segundo
                    header("refresh:1;url=?page=listar-colecoes");
                } else {
                    $error_message = "Erro ao criar coleção";
                    error_log("Erro ao inserir coleção: " . $insert_stmt->error);
                }
                $insert_stmt->close();
            } else {
                $error_message = "Erro interno do servidor";
                error_log("Erro no prepared statement de inserção: " . $mysqli->error);
            }
            break;
            
        case 'editar':
            // Implementar edição de coleção
            $collection_id = (int)$_POST['collection_id'];
            $owner_id = (int)$_POST['owner_id'];
            
            // Verificar se a coleção pertence ao usuário
            if ($owner_id !== (int)$_SESSION['id']) {
                $error_message = "Acesso negado";
                break;
            }
            
            $col_name = sanitize_input($_POST['col_name'] ?? '');
            $col_color = sanitize_input($_POST['col_color'] ?? '#650fee');
            $col_desc = sanitize_input($_POST['col_desc'] ?? '');
            
            if (empty($col_name) || strlen($col_name) < 3) {
                $error_message = "Nome da coleção deve ter pelo menos 3 caracteres";
                break;
            }
            
            $update_sql = "UPDATE collections SET col_name = ?, col_color = ?, col_desc = ? WHERE id = ? AND owner_id = ?";
            $update_stmt = $mysqli->prepare($update_sql);
            
            if ($update_stmt) {
                $update_stmt->bind_param("sssii", $col_name, $col_color, $col_desc, $collection_id, $owner_id);
                
                if ($update_stmt->execute()) {
                    log_activity($owner_id, 'edit_collection', "Coleção editada: $col_name (ID: $collection_id)");
                    $success_message = "Coleção atualizada com sucesso!";
                    header("refresh:1;url=?page=listar-colecoes");
                } else {
                    $error_message = "Erro ao atualizar coleção";
                }
                $update_stmt->close();
            }
            break;
            
        case 'excluir':
            // Implementar exclusão de coleção
            $collection_id = (int)$_POST['collection_id'];
            $owner_id = (int)$_POST['owner_id'];
            
            if ($owner_id !== (int)$_SESSION['id']) {
                $error_message = "Acesso negado";
                break;
            }
            
            // Verificar se há itens na coleção
            $check_items_sql = "SELECT COUNT(*) as total FROM itens WHERE col_id = ?";
            $check_items_stmt = $mysqli->prepare($check_items_sql);
            
            if ($check_items_stmt) {
                $check_items_stmt->bind_param("i", $collection_id);
                $check_items_stmt->execute();
                $items_result = $check_items_stmt->get_result();
                $items_count = $items_result->fetch_assoc()['total'];
                $check_items_stmt->close();
                
                if ($items_count > 0) {
                    $error_message = "Não é possível excluir uma coleção que possui itens. Remova os itens primeiro.";
                    break;
                }
            }
            
            $delete_sql = "DELETE FROM collections WHERE id = ? AND owner_id = ?";
            $delete_stmt = $mysqli->prepare($delete_sql);
            
            if ($delete_stmt) {
                $delete_stmt->bind_param("ii", $collection_id, $owner_id);
                
                if ($delete_stmt->execute()) {
                    log_activity($owner_id, 'delete_collection', "Coleção excluída (ID: $collection_id)");
                    $success_message = "Coleção excluída com sucesso!";
                    header("refresh:1;url=?page=listar-colecoes");
                } else {
                    $error_message = "Erro ao excluir coleção";
                }
                $delete_stmt->close();
            }
            break;
            
        default:
            $error_message = "Ação inválida";
            break;
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerenciar Coleção - Coollects</title>
    <link rel="stylesheet" href="style/style.css">
    <link rel="stylesheet" href="style/normalize.css">
</head>
<body>
    <?php include('header.php'); ?>
    
    <div class="app-view">
        <div class="app-container">
            <h1>Gerenciar Coleção</h1>
            
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
            
            <div class="action-buttons">
                <a href="?page=listar-colecoes" class="btn btn-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M20 12L4 12L10 18M7 9L10 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Voltar às Coleções
                </a>
            </div>
        </div>
    </div>
</body>
</html>