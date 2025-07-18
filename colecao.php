<?php
include("config.php");
require_login();

$error_message = '';
$collection = null;
$items = [];

// Verificar se foi fornecido o ID da coleção na URL
if(isset($_GET['collection_id'])) {
    $collection_id = (int)$_GET['collection_id'];
    $user_id = (int)$_SESSION['id'];
    
    // Consulta os detalhes da coleção usando prepared statement
    $collection_sql = "SELECT c.*, cat.emoji_cat, cat.name_cat 
                       FROM collections c
                       INNER JOIN categorias cat ON c.categoria = cat.cat_id
                       WHERE c.id = ? AND c.owner_id = ?";
    
    $collection_stmt = $mysqli->prepare($collection_sql);
    
    if ($collection_stmt) {
        $collection_stmt->bind_param("ii", $collection_id, $user_id);
        $collection_stmt->execute();
        $collection_result = $collection_stmt->get_result();
        
        if ($collection_result->num_rows > 0) {
            $collection = $collection_result->fetch_assoc();
            
            // Consulta os itens da coleção
            $items_sql = "SELECT * FROM itens WHERE col_id = ? ORDER BY data_cadastro DESC";
            $items_stmt = $mysqli->prepare($items_sql);
            
            if ($items_stmt) {
                $items_stmt->bind_param("i", $collection_id);
                $items_stmt->execute();
                $items_result = $items_stmt->get_result();
                
                while ($item = $items_result->fetch_assoc()) {
                    $items[] = $item;
                }
                $items_stmt->close();
            }
        } else {
            $error_message = "Coleção não encontrada ou você não tem permissão para acessá-la.";
        }
        $collection_stmt->close();
    } else {
        $error_message = "Erro interno do servidor.";
    }
} else {
    $error_message = "ID da coleção não fornecido.";
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $collection ? htmlspecialchars($collection['col_name']) . ' - ' : ''; ?>Coleção - Coollects</title>
    <link rel="stylesheet" href="style/style.css">
    <link rel="stylesheet" href="style/normalize.css">
</head>
<body>
    <?php include('header.php'); ?>

    <div class="app-view">
        <?php if ($error_message): ?>
            <div class="app-container">
                <div class="alert alert-error">
                    <?php echo htmlspecialchars($error_message); ?>
                </div>
                <div class="action-buttons">
                    <a href="?page=listar-colecoes" class="btn btn-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M20 12L4 12L10 18M7 9L10 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Voltar às Coleções
                    </a>
                </div>
            </div>
        <?php elseif ($collection): ?>
            <!-- Banner da coleção -->
            <div class="top-col-banner" style="background-color: <?php echo htmlspecialchars($collection['col_color']); ?>">
                <div class="collection-header">
                    <h1 style="color: <?php echo htmlspecialchars($collection['col_color']); ?>">
                        <?php echo htmlspecialchars($collection['col_name']); ?>
                    </h1>
                    <p><?php echo htmlspecialchars($collection['col_desc']); ?></p>
                    <div class="collection-meta">
                        <span class="category-badge">
                            <?php echo htmlspecialchars($collection['emoji_cat']); ?> 
                            <?php echo htmlspecialchars($collection['name_cat']); ?>
                        </span>
                        <span class="items-count">
                            <?php echo count($items); ?> itens
                        </span>
                    </div>
                </div>
            </div>

            <div class="app-container">
                <div class="page-header">
                    <h2>Itens da Coleção</h2>
                    <a href="?page=new_item" class="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Adicionar Item
                    </a>
                </div>

                <div class="itens-cont">
                    <?php if (!empty($items)): ?>
                        <?php foreach ($items as $item): ?>
                            <a href="item.php?item_id=<?php echo $item['item_id']; ?>">
                                <div class="item">
                                    <?php if (!empty($item['item_img_url'])): ?>
                                        <img src="<?php echo htmlspecialchars($item['item_img_url']); ?>" 
                                             alt="<?php echo htmlspecialchars($item['item_name']); ?>" 
                                             loading="lazy">
                                    <?php else: ?>
                                        <div class="no-image">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
                                                <path d="M21 13V17C21 18.1046 20.1046 19 19 19H9M5 19C3.89543 19 3 18.1046 3 17V9C3 7.89543 3.89543 7 5 7H7.5C8.05228 7 8.5 6.55228 8.5 6C8.5 5.44772 8.94772 5 9.5 5H14.5C15.0523 5 15.5 5.44772 15.5 6C15.5 6.55228 15.9477 7 16.5 7H19C20.1046 7 21 7.89543 21 9M9 13C9 14.6569 10.3431 16 12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                            </svg>
                                        </div>
                                    <?php endif; ?>
                                    
                                    <h2><?php echo htmlspecialchars($item['item_name']); ?></h2>
                                    
                                    <?php if (!empty($item['item_series'])): ?>
                                        <p class="item-series">
                                            <?php echo htmlspecialchars($item['item_series']); ?>
                                            <?php if (!empty($item['item_series_year'])): ?>
                                                (<?php echo htmlspecialchars($item['item_series_year']); ?>)
                                            <?php endif; ?>
                                        </p>
                                    <?php endif; ?>
                                </div>
                            </a>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <div class="empty-state">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none">
                                <path d="M21 13V17C21 18.1046 20.1046 19 19 19H9M5 19C3.89543 19 3 18.1046 3 17V9C3 7.89543 3.89543 7 5 7H7.5C8.05228 7 8.5 6.55228 8.5 6C8.5 5.44772 8.94772 5 9.5 5H14.5C15.0523 5 15.5 5.44772 15.5 6C15.5 6.55228 15.9477 7 16.5 7H19C20.1046 7 21 7.89543 21 9M9 13C9 14.6569 10.3431 16 12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                            <h2>Nenhum item encontrado</h2>
                            <p>Esta coleção ainda não possui itens. Adicione seu primeiro item!</p>
                            <div class="empty-actions">
                                <a href="?page=new_item" class="btn btn-primary">Adicionar Primeiro Item</a>
                            </div>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>
