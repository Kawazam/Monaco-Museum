<?php
session_start();
require_once "db_connection.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Vérifiez les identifiants de connexion
    $username = $_POST["username"];
    $password = $_POST["password"];
    
    // Vérifiez les identifiants dans la base de données (supposons que vous avez déjà une table "users" avec les champs "username" et "password")
    $db_username = "votre_nom_utilisateur";
    $db_password = "votre_mot_de_passe";
    
    if ($username == $db_username && $password == $db_password) {
        $_SESSION["username"] = $username;
        // Redirigez l'utilisateur vers la page d'accueil ou toute autre page de votre choix
        header("Location: index.php");
        exit;
    } else {
        echo "Identifiants invalides. Veuillez réessayer.";
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Connexion</title>
</head>
<body>
    <h2>Connexion</h2>
    <form method="post" action="">
        <label for="username">Nom d'utilisateur:</label><br>
        <input type="text" id="username" name="username"><br>
        <label for="password">Mot de passe:</label><br>
        <input type="password" id="password" name="password"><br><br>
        <input type="submit" value="Se connecter">
    </form>
</body>
</html>
