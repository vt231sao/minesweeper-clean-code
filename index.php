<?php
session_start();
if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}
$username = $_SESSION['username'];
?>
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title>Сапер</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<h1>Гра Сапер</h1>
<p id="timer">⏱ Час: 0 с</p>
<p>👋 Вітаємо, <strong><?= htmlspecialchars($username) ?></strong>!</p>
<form method="POST" action="logout.php" style="margin-bottom: 10px;">
    <button type="submit">Вийти</button>
</form>
<div id="game"></div>
<script src="script.js"></script>
</body>
</html>
