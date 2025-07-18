<?php
include('config.php');
require_login();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meus Itens - Coollects</title>
    <link rel="stylesheet" href="style/style.css">
    <link rel="stylesheet" href="style/normalize.css">
</head>
<body>
    <?php include('header.php'); ?>
    
    <div class="app-view">
        <div class="app-container">
            <div class="page-header">
                <h1>Meus Itens</h1>
                <a href="?page=new_item" class="btn btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Novo Item
                </a>
            </div>
            
            <div class="itens-grid">
                <?php
                $user_id = (int)$_SESSION['id'];
                
                // Consulta para buscar todos os itens do usuário com informações da coleção
                $sql = "SELECT i.*, c.col_name, c.col_color, cat.emoji_cat, cat.name_cat 
                        FROM itens i
                        INNER JOIN collections c ON i.col_id = c.id
                        INNER JOIN categorias cat ON c.categoria = cat.cat_id
                        WHERE i.owner_id = ?
                        ORDER BY i.data_cadastro DESC";
                
                $stmt = $mysqli->prepare($sql);
                
                if ($stmt) {
                    $stmt->bind_param("i", $user_id);
                    $stmt->execute();
                    $result = $stmt->get_result();
                    
                    if ($result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                            echo '<div class="item-card">';
                            echo '<div class="item-image">';
                            if (!empty($row['item_img_url'])) {
                                echo '<img src="' . htmlspecialchars($row['item_img_url']) . '" alt="' . htmlspecialchars($row['item_name']) . '" loading="lazy">';
                            } else {
                                echo '<div class="no-image">';
                                echo '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">';
                                echo '<path d="M21 13V17C21 18.1046 20.1046 19 19 19H9M5 19C3.89543 19 3 18.1046 3 17V9C3 7.89543 3.89543 7 5 7H7.5C8.05228 7 8.5 6.55228 8.5 6C8.5 5.44772 8.94772 5 9.5 5H14.5C15.0523 5 15.5 5.44772 15.5 6C15.5 6.55228 15.9477 7 16.5 7H19C20.1046 7 21 7.89543 21 9M9 13C9 14.6569 10.3431 16 12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>';
                                echo '</svg>';
                                echo '</div>';
                            }
                            echo '</div>';
                            
                            echo '<div class="item-info">';
                            echo '<h3>' . htmlspecialchars($row['item_name']) . '</h3>';
                            
                            if (!empty($row['item_series'])) {
                                echo '<p class="item-series">' . htmlspecialchars($row['item_series']);
                                if (!empty($row['item_series_year'])) {
                                    echo ' (' . htmlspecialchars($row['item_series_year']) . ')';
                                }
                                echo '</p>';
                            }
                            
                            echo '<div class="collection-badge" style="background-color: ' . htmlspecialchars($row['col_color']) . '">';
                            echo '<span>' . htmlspecialchars($row['emoji_cat']) . ' ' . htmlspecialchars($row['col_name']) . '</span>';
                            echo '</div>';
                            
                            if (!empty($row['item_desc'])) {
                                echo '<p class="item-desc">' . htmlspecialchars(substr($row['item_desc'], 0, 100)) . (strlen($row['item_desc']) > 100 ? '...' : '') . '</p>';
                            }
                            
                            echo '<div class="item-actions">';
                            echo '<a href="item.php?item_id=' . $row['item_id'] . '" class="btn btn-small">Ver Detalhes</a>';
                            echo '<a href="colecao.php?collection_id=' . $row['col_id'] . '" class="btn btn-small btn-secondary">Ver Coleção</a>';
                            echo '</div>';
                            
                            echo '</div>';
                            echo '</div>';
                        }
                    } else {
                        echo '<div class="empty-state">';
                        echo '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none">';
                        echo '<path d="M21 13V17C21 18.1046 20.1046 19 19 19H9M5 19C3.89543 19 3 18.1046 3 17V9C3 7.89543 3.89543 7 5 7H7.5C8.05228 7 8.5 6.55228 8.5 6C8.5 5.44772 8.94772 5 9.5 5H14.5C15.0523 5 15.5 5.44772 15.5 6C15.5 6.55228 15.9477 7 16.5 7H19C20.1046 7 21 7.89543 21 9M9 13C9 14.6569 10.3431 16 12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>';
                        echo '</svg>';
                        echo '<h2>Nenhum item encontrado</h2>';
                        echo '<p>Você ainda não cadastrou nenhum item. Comece criando uma coleção e adicionando itens!</p>';
                        echo '<div class="empty-actions">';
                        echo '<a href="?page=new_col" class="btn btn-primary">Criar Coleção</a>';
                        echo '<a href="?page=new_item" class="btn btn-secondary">Adicionar Item</a>';
                        echo '</div>';
                        echo '</div>';
                    }
                    $stmt->close();
                } else {
                    echo '<div class="error-message">';
                    echo '<p>Erro ao carregar itens. Tente novamente.</p>';
                    echo '</div>';
                }
                ?>
            </div>
        </div>
    </div>
</body>
</html> 