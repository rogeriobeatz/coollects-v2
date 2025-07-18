<h1>
    Salvar Item
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
            $col_id = (int)$_POST['col_id'];
            $item_name = sanitize_input($_POST['item_name'] ?? '');
            $item_img_url = sanitize_input($_POST['item_img_url'] ?? '');
            $item_series = sanitize_input($_POST['item_series'] ?? '');
            $item_series_year = (int)$_POST['item_series_year'];
            $item_desc = sanitize_input($_POST['item_desc'] ?? '');
            
            // Validações
            if ($owner_id !== (int)$_SESSION['id']) {
                $error_message = "Erro de autenticação";
                break;
            }
            
            if (empty($col_id)) {
                $error_message = "Selecione uma coleção";
                break;
            }
            
            if (empty($item_name) || strlen($item_name) < 2) {
                $error_message = "Nome do item deve ter pelo menos 2 caracteres";
                break;
            }
            
            if (strlen($item_name) > 100) {
                $error_message = "Nome do item muito longo (máximo 100 caracteres)";
                break;
            }
            
            if (strlen($item_series) > 50) {
                $error_message = "Nome da série muito longo (máximo 50 caracteres)";
                break;
            }
            
            if ($item_series_year < 1900 || $item_series_year > 2099) {
                $error_message = "Ano da série deve estar entre 1900 e 2099";
                break;
            }
            
            if (strlen($item_desc) > 500) {
                $error_message = "Descrição muito longa (máximo 500 caracteres)";
                break;
            }
            
            // Verificar se a coleção existe e pertence ao usuário
            $check_col_sql = "SELECT id FROM collections WHERE id = ? AND owner_id = ?";
            $check_col_stmt = $mysqli->prepare($check_col_sql);
            
            if ($check_col_stmt) {
                $check_col_stmt->bind_param("ii", $col_id, $owner_id);
                $check_col_stmt->execute();
                $col_result = $check_col_stmt->get_result();
                
                if ($col_result->num_rows === 0) {
                    $error_message = "Coleção inválida ou não encontrada";
                    $check_col_stmt->close();
                    break;
                }
                $check_col_stmt->close();
            }
            
            // Validar URL da imagem se fornecida
            if (!empty($item_img_url) && !filter_var($item_img_url, FILTER_VALIDATE_URL)) {
                $error_message = "URL da imagem inválida";
                break;
            }
            
            // Inserir item
            $insert_sql = "INSERT INTO itens (owner_id, col_id, item_name, item_img_url, item_series, item_series_year, item_desc, data_cadastro) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())";
            $insert_stmt = $mysqli->prepare($insert_sql);
            
            if ($insert_stmt) {
                $insert_stmt->bind_param("iisssis", $owner_id, $col_id, $item_name, $item_img_url, $item_series, $item_series_year, $item_desc);
                
                if ($insert_stmt->execute()) {
                    $item_id = $mysqli->insert_id;
                    
                    // Log da atividade
                    log_activity($owner_id, 'create_item', "Item criado: $item_name (ID: $item_id)");
                    
                    $success_message = "Item cadastrado com sucesso!";
                    
                    // Redirecionar após 1 segundo
                    header("refresh:1;url=colecao.php?collection_id=$col_id");
                } else {
                    $error_message = "Erro ao cadastrar item";
                    error_log("Erro ao inserir item: " . $insert_stmt->error);
                }
                $insert_stmt->close();
            } else {
                $error_message = "Erro interno do servidor";
                error_log("Erro no prepared statement de inserção: " . $mysqli->error);
            }
            break;
            
        case 'editar':
            // Implementar edição de item
            $item_id = (int)$_POST['item_id'];
            $owner_id = (int)$_POST['owner_id'];
            
            if ($owner_id !== (int)$_SESSION['id']) {
                $error_message = "Acesso negado";
                break;
            }
            
            $item_name = sanitize_input($_POST['item_name'] ?? '');
            $item_img_url = sanitize_input($_POST['item_img_url'] ?? '');
            $item_series = sanitize_input($_POST['item_series'] ?? '');
            $item_series_year = (int)$_POST['item_series_year'];
            $item_desc = sanitize_input($_POST['item_desc'] ?? '');
            
            if (empty($item_name) || strlen($item_name) < 2) {
                $error_message = "Nome do item deve ter pelo menos 2 caracteres";
                break;
            }
            
            $update_sql = "UPDATE itens SET item_name = ?, item_img_url = ?, item_series = ?, item_series_year = ?, item_desc = ? WHERE item_id = ? AND owner_id = ?";
            $update_stmt = $mysqli->prepare($update_sql);
            
            if ($update_stmt) {
                $update_stmt->bind_param("sssisii", $item_name, $item_img_url, $item_series, $item_series_year, $item_desc, $item_id, $owner_id);
                
                if ($update_stmt->execute()) {
                    log_activity($owner_id, 'edit_item', "Item editado: $item_name (ID: $item_id)");
                    $success_message = "Item atualizado com sucesso!";
                    header("refresh:1;url=item.php?item_id=$item_id");
                } else {
                    $error_message = "Erro ao atualizar item";
                }
                $update_stmt->close();
            }
            break;
            
        case 'excluir':
            // Implementar exclusão de item
            $item_id = (int)$_POST['item_id'];
            $owner_id = (int)$_POST['owner_id'];
            
            if ($owner_id !== (int)$_SESSION['id']) {
                $error_message = "Acesso negado";
                break;
            }
            
            // Obter col_id antes de excluir para redirecionamento
            $get_col_sql = "SELECT col_id FROM itens WHERE item_id = ? AND owner_id = ?";
            $get_col_stmt = $mysqli->prepare($get_col_sql);
            
            if ($get_col_stmt) {
                $get_col_stmt->bind_param("ii", $item_id, $owner_id);
                $get_col_stmt->execute();
                $col_result = $get_col_stmt->get_result();
                
                if ($col_result->num_rows > 0) {
                    $col_data = $col_result->fetch_assoc();
                    $col_id = $col_data['col_id'];
                    $get_col_stmt->close();
                    
                    $delete_sql = "DELETE FROM itens WHERE item_id = ? AND owner_id = ?";
                    $delete_stmt = $mysqli->prepare($delete_sql);
                    
                    if ($delete_stmt) {
                        $delete_stmt->bind_param("ii", $item_id, $owner_id);
                        
                        if ($delete_stmt->execute()) {
                            log_activity($owner_id, 'delete_item', "Item excluído (ID: $item_id)");
                            $success_message = "Item excluído com sucesso!";
                            header("refresh:1;url=colecao.php?collection_id=$col_id");
                        } else {
                            $error_message = "Erro ao excluir item";
                        }
                        $delete_stmt->close();
                    }
                } else {
                    $error_message = "Item não encontrado";
                    $get_col_stmt->close();
                }
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
    <title>Gerenciar Item - Coollects</title>
    <link rel="stylesheet" href="style/style.css">
    <link rel="stylesheet" href="style/normalize.css">
</head>
<body>
    <?php include('header.php'); ?>
    
    <div class="app-view">
        <div class="app-container">
            <h1>Gerenciar Item</h1>
            
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