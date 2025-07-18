<?php
include("config.php");

// Verifica se foi fornecido o ID da coleção na URL
if(isset($_GET['item_id'])) {
    $item_id = $_GET['item_id'];
    
    // Consulta os itens da coleção no banco de dados
    $sql = "SELECT * FROM itens WHERE item_id = $item_id";
    $result = $mysqli->query($sql);
}
?>

<?php
// Verifique se o parâmetro item_id está presente na URL
if (isset($_GET['item_id'])) {
    $item_id = $_GET['item_id'];

    // Consulta SQL para buscar os detalhes da coleção
    $itemDetailsSql = "SELECT * FROM itens WHERE item_id = $item_id";
    $itemDetailsResult = $mysqli->query($itemDetailsSql);

}
?>


<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> </title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="style/normalize.css">
</head>
<body>

<?php include('header.php'); ?>

    <div class="app-view">
        <?php
if ($itemDetailsResult && $itemDetailsResult->num_rows > 0) {
    $itemDetails = $itemDetailsResult->fetch_object();
    // Agora você pode exibir os detalhes da coleção

    echo "<div class=\"top-col-banner\" style=\"background-color:".$itemDetails->col_color."\">";
    echo "<h1 style=\"color:".$itemDetails->col_color."\">" . $itemDetails->col_name . "</h1>";
    echo "<p>" . $itemDetails->col_desc . "</p>";
    echo "</div>";


    // ... outros detalhes da coleção que desejar exibir ...
} else {
    echo "<p>Coleção não encontrada.</p>";
}
        ?>



        <div class="app-container itens-cont">
<?php

if(isset($result) && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        // Exibe os detalhes de cada item da coleção
        echo "<div class=\"item\">";
        echo "<img src='".$row['item_img_url']."' alt='".$row['item_name']."' />";
        echo "<h2>".$row['item_name']."</h2>";
        echo "<p>".$row['item_series']."</p>";
        
        echo "</div>";
    }
} else {
    echo "<p>Nenhum item encontrado para esta coleção.</p>";
}
?>
        </div>
    </div>
    

</body>
</html>
