<?php
require_once "db_connection.php";

// Initialisation des variables
$username = $password = "";
$username_err = $password_err = "";

// Traitement du formulaire lorsque soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validation du nom d'utilisateur
    if (empty(trim($_POST["username"]))) {
        $username_err = "Veuillez entrer un nom d'utilisateur.";
    } else {
        // Vérifiez si le nom d'utilisateur existe déjà
        $sql = "SELECT id FROM users WHERE username = ?";
        
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("s", $param_username);
            
            // Définir les paramètres
            $param_username = trim($_POST["username"]);
            
            // Exécutez la déclaration préparée
            if ($stmt->execute()) {
                // Stocker le résultat
                $stmt->store_result();
                
                if ($stmt->num_rows == 1) {
                    $username_err = "Ce nom d'utilisateur est déjà pris.";
                } else {
                    $username = trim($_POST["username"]);
                }
            } else {
                echo "Oops! Quelque chose s'est mal passé. Veuillez réessayer plus tard.";
            }

            // Fermez la déclaration
            $stmt->close();
        }
    }
    
    // Validation du mot de passe
    if (empty(trim($_POST["password"]))) {
        $password_err = "Veuillez entrer un mot de passe.";     
    } elseif (strlen(trim($_POST["password"])) < 6) {
        $password_err = "Le mot de passe doit contenir au moins 6 caractères.";
    } else {
        $password = trim($_POST["password"]);
    }
    
    // Vérification des erreurs de saisie avant l'insertion dans la base de données
    if (empty($username_err) && empty($password_err)) {
        // Préparez une instruction d'insertion
        $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
         
        if ($stmt = $conn->prepare($sql)) {
            // Lier des variables à la déclaration préparée en tant que paramètres
            $stmt->bind_param("ss", $param_username, $param_password);
            
            // Définir les paramètres
            $param_username = $username;
            $param_password = password_hash($password, PASSWORD_DEFAULT); // Créez un hachage de mot de passe
            
            // Exécutez la déclaration préparée
            if ($stmt->execute()) {
                // Redirigez l'utilisateur vers la page de connexion
                header("location: login.php");
            } else {
                echo "Oops! Quelque chose s'est mal passé. Veuillez réessayer plus tard.";
            }

            // Fermez la déclaration
            $stmt->close();
        }
    }
    
    // Fermez la connexion
    $conn->close();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription</title>
    <style>
        .wrapper {
            width: 360px;
            padding: 20px;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <h2>Inscription</h2>
        <p>Remplissez ce formulaire pour créer un compte.</p>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <div <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                <label>Nom d'utilisateur</label>
                <input type="text" name="username" class="form-control" value="<?php echo $username; ?>">
                <span><?php echo $username_err; ?></span>
            </div>    
            <div <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                <label>Mot de passe</label>
                <input type="password" name="password" class="form-control" value="<?php echo $password; ?>">
                <span><?php echo $password_err; ?></span>
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-primary" value="S'inscrire">
                <input type="reset" class="btn btn-default" value="Réinitialiser">
            </div>
            <p>Vous avez déjà un compte? <a href="login.php">Connectez-vous ici</a>.</p>
        </form>
    </div>    
</body>
</html>
