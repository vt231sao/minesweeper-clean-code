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
    <p id="timer">⏱ Час: 0 с</p>
    <p>👋 Вітаємо, <strong><?= htmlspecialchars($username) ?></strong>!</p>
    <div id="difficulty" style="margin-bottom: 10px;">
        <label>Рівень:</label>
        <button onclick="setDifficulty('easy')">Легкий(10 мін)</button>
        <button onclick="setDifficulty('medium')">Середній(40 мін)</button>
        <button onclick="setDifficulty('hard')">Складний(99 мін)</button>
    </div>

    <button onclick="restartGame()" id="restart-btn">🔁 Рестарт</button>
    <div id="game"></div>
    <form method="POST" action="logout.php" style="margin-bottom: 10px;">
        <button type="submit">Вийти</button>
    </form>
</div>
<script src="script.js?v=1" defer></script>
</body>

</html>
