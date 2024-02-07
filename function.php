<?php
// Inclure le fichier de connexion à la base de données
require_once "db_connection.php";

// Fonction pour récupérer l'inventaire de l'utilisateur dans la base de données
function getInventory($username) {
    global $conn;
    $inventory = array();
    // Écrivez votre requête SQL pour récupérer l'inventaire de l'utilisateur en fonction de son nom d'utilisateur
    $sql = "SELECT item_name, quantity FROM inventory WHERE username = ?";
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("s", $username);
        if ($stmt->execute()) {
            $result = $stmt->get_result();
            while ($row = $result->fetch_assoc()) {
                $inventory[$row["item_name"]] = $row["quantity"];
            }
        }
        $stmt->close();
    }
    return $inventory;
}

// Fonction pour ajouter un nouvel élément à l'inventaire de l'utilisateur
function addItemToInventory($username, $item_name, $quantity) {
    global $conn;
    // Écrivez votre code pour ajouter un nouvel élément à l'inventaire de l'utilisateur dans la base de données
    // Vous devez gérer les cas où l'élément existe déjà dans l'inventaire de l'utilisateur et où il doit être ajouté comme un nouvel élément
    // Si l'élément existe déjà, vous pouvez simplement mettre à jour la quantité
    
    // Vérifier si l'élément existe déjà dans l'inventaire de l'utilisateur
    $sql_check = "SELECT COUNT(*) AS count FROM inventory WHERE username = ? AND item_name = ?";
    if ($stmt_check = $conn->prepare($sql_check)) {
        $stmt_check->bind_param("ss", $username, $item_name);
        $stmt_check->execute();
        $result = $stmt_check->get_result();
        $row = $result->fetch_assoc();
        $count = $row["count"];
        $stmt_check->close();
        
        // Si l'élément existe déjà, mettre à jour la quantité
        if ($count > 0) {
            $sql_update = "UPDATE inventory SET quantity = quantity + ? WHERE username = ? AND item_name = ?";
            if ($stmt_update = $conn->prepare($sql_update)) {
                $stmt_update->bind_param("iss", $quantity, $username, $item_name);
                $stmt_update->execute();
                $stmt_update->close();
            }
        } else { // Sinon, ajouter le nouvel élément à l'inventaire
            $sql_insert = "INSERT INTO inventory (username, item_name, quantity) VALUES (?, ?, ?)";
            if ($stmt_insert = $conn->prepare($sql_insert)) {
                $stmt_insert->bind_param("ssi", $username, $item_name, $quantity);
                $stmt_insert->execute();
                $stmt_insert->close();
            }
        }
    }
}

// Fonction pour supprimer un élément de l'inventaire de l'utilisateur
function removeItemFromInventory($username, $item_name) {
    global $conn;
    // Écrivez votre code pour supprimer un élément de l'inventaire de l'utilisateur dans la base de données
    $sql_delete = "DELETE FROM inventory WHERE username = ? AND item_name = ?";
    if ($stmt_delete = $conn->prepare($sql_delete)) {
        $stmt_delete->bind_param("ss", $username, $item_name);
        $stmt_delete->execute();
        $stmt_delete->close();
    }
}
?>
