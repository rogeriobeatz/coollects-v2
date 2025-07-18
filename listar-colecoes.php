<?php
include('config.php');
require_login();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minhas Coleções - Coollects</title>
    <link rel="stylesheet" href="style/style.css">
    <link rel="stylesheet" href="style/normalize.css">
</head>
<body>
    <?php include('header.php'); ?>
    
    <div class="app-view">
        <div class="app-container">
            <div class="page-header">
                <h1>Minhas Coleções</h1>
                <a href="?page=new_col" class="btn btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Nova Coleção
                </a>
            </div>
            
            <div class="col_section">
                <?php
                $user_id = (int)$_SESSION['id'];

                // Consulta usando prepared statement
                $sql = "SELECT c.*, cat.emoji_cat, cat.name_cat,
                        (SELECT COUNT(*) FROM itens WHERE col_id = c.id) as num_items
                        FROM collections c
                        INNER JOIN categorias cat ON c.categoria = cat.cat_id
                        WHERE c.owner_id = ?
                        ORDER BY c.data_criacao DESC";

                $stmt = $mysqli->prepare($sql);
                
                if ($stmt) {
                    $stmt->bind_param("i", $user_id);
                    $stmt->execute();
                    $result = $stmt->get_result();
                    
                    if ($result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                            echo '<a href="colecao.php?collection_id=' . $row['id'] . '">';
                            echo '<div style="background-color:' . htmlspecialchars($row['col_color']) . ';" class="col_card">';
                            echo '<h2 style="color:' . htmlspecialchars($row['col_color']) . ';">' . htmlspecialchars($row['col_name']) . '</h2>';
                            echo '<h4>' . htmlspecialchars($row['emoji_cat']) . ' ' . htmlspecialchars($row['name_cat']) . ' | ' . $row['num_items'] . ' itens</h4>';
                            echo '<p>' . htmlspecialchars($row['col_desc']) . '</p>';
                            echo '</div>';
                            echo '</a>';
                        }
                    } else {
                        echo '<div class="empty-state">';
                        echo '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none">';
                        echo '<path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>';
                        echo '</svg>';
                        echo '<h2>Nenhuma coleção encontrada</h2>';
                        echo '<p>Você ainda não criou nenhuma coleção. Comece criando sua primeira coleção!</p>';
                        echo '<div class="empty-actions">';
                        echo '<a href="?page=new_col" class="btn btn-primary">Criar Primeira Coleção</a>';
                        echo '</div>';
                        echo '</div>';
                    }
                    $stmt->close();
                } else {
                    echo '<div class="error-message">';
                    echo '<p>Erro ao carregar coleções. Tente novamente.</p>';
                    echo '</div>';
                }
                ?>
            </div>
        </div>
    </div>
</body>
</html>