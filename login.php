<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST['username']);
    if (!empty($name)) {
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
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
    <h2>🔐 Вхід до гри Сапер</h2>
    <a href="leaderboard.php" class="button">Таблиця лідерів</a>
    <form method="POST">
        <label>Ваше ім’я:</label><br>
        <input type="text" name="username" required><br><br>
        <button type="submit">Увійти</button>
    </form>
</div>
</body>

</html>
