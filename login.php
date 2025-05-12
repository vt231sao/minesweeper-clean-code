<?php
global $conn;
session_start();
require 'db_config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST['username']);

    if (!empty($name)) {
        $stmt = $conn->prepare("SELECT id FROM users WHERE name = ?");
        $stmt->bind_param("s", $name);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows == 0) {
            $stmt->close();
            $stmt = $conn->prepare("INSERT INTO users (name) VALUES (?)");
            $stmt->bind_param("s", $name);
            $stmt->execute();
        }
        $stmt->close();

        $_SESSION['username'] = $name;
        header("Location: index.php");
        exit();
    }
}
?>
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title>Вхід</title>
</head>
<body>
<h2>Вхід до гри Сапер</h2>
<form method="POST">
    <label>Ваше ім’я:</label><br>
    <input type="text" name="username" required><br><br>
    <button type="submit">Увійти</button>
</form>
</body>
</html>
