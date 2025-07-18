<?php 
include('protect.php');
?>

<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Coollects</title>
        <link rel="stylesheet" href="style/style.css" />
        <link rel="stylesheet" href="style/normalize.css" />
    </head>

    <body>
        <?php
            include('header.php');
        ?>

        <?php 
        include("config.php");
        switch(@$_REQUEST["page"]){
            case "listar-colecoes":
                include("listar-colecoes.php");
                break;
            case "listar":
                include("listar-usuario.php");
            break;
            case "salvar":
                include("salvar-usuario.php");
                break;

            case 'salvar-col':
                include("salvar-collection.php");
                break;

            case 'salvar-item':
                include("salvar-item.php");
                break;

            case "new_col":
                include("nova-colecao.php");
                break;
        
            case "new_item":
                include("novo-item.php");
                break;
            case "list_item":
                include("listar-item.php");
                break;
        }
    ?>
    </body>
</html>
