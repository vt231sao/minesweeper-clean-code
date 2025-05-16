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
<div class="container">
    <h1>Гра Сапер</h1>
    <a href="leaderboard.php" class="button">Таблиця лідерів</a>
    <p id="timer">⏱ Час: 0 с</p>
    <p>👋 Вітаємо, <strong><?= htmlspecialchars($username) ?></strong>!</p>

    <div id="difficulty" style="margin-bottom: 10px;">
        <label>Рівень:</label>
        <button data-difficulty="easy">Легкий (10 мін)</button>
        <button data-difficulty="medium">Середній (40 мін)</button>
        <button data-difficulty="hard">Складний (99 мін)</button>
    </div>

    <button id="restart">🔁 Рестарт</button>
    <div id="game"></div>

    <form method="POST" action="logout.php" style="margin-top: 15px;">
        <button type="submit">Вийти</button>
    </form>
</div>

<script type="module" src="js/main.js?v=1"></script>
</body>
</html>
