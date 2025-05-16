<?php
global $conn;
require 'db_config.php';

function getTopPlayers($conn, $difficulty) {
    $stmt = $conn->prepare("
        SELECT player_name, MIN(time_seconds) as best_time 
        FROM scores 
        WHERE difficulty = ? 
        GROUP BY player_name 
        ORDER BY best_time ASC 
        LIMIT 5
    ");
    $stmt->bind_param("s", $difficulty);
    $stmt->execute();
    return $stmt->get_result();
}

$easyResults = getTopPlayers($conn, 'easy');
$mediumResults = getTopPlayers($conn, 'medium');
$hardResults = getTopPlayers($conn, 'hard');
?>
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title>Топ гравців</title>
    <link rel="stylesheet" href="style.css">
    <style>
        table {
            margin: 20px auto;
            border-collapse: collapse;
        }
        th, td {
            padding: 8px 16px;
            border: 1px solid #ccc;
        }
        h2 {
            text-align: center;
        }
    </style>
</head>
<body>
<h2>🏆 Лідери гри Сапер</h2>

<h3>🟢 Легкий рівень</h3>
<table>
    <tr><th>Гравець</th><th>Найкращий час (сек)</th></tr>
    <?php while ($row = $easyResults->fetch_assoc()): ?>
        <tr>
            <td><?= htmlspecialchars($row['player_name']) ?></td>
            <td><?= $row['best_time'] ?></td>
        </tr>
    <?php endwhile; ?>
</table>

<h3>🟡 Середній рівень</h3>
<table>
    <tr><th>Гравець</th><th>Найкращий час (сек)</th></tr>
    <?php while ($row = $mediumResults->fetch_assoc()): ?>
        <tr>
            <td><?= htmlspecialchars($row['player_name']) ?></td>
            <td><?= $row['best_time'] ?></td>
        </tr>
    <?php endwhile; ?>
</table>

<h3>🔴 Складний рівень</h3>
<table>
    <tr><th>Гравець</th><th>Найкращий час (сек)</th></tr>
    <?php while ($row = $hardResults->fetch_assoc()): ?>
        <tr>
            <td><?= htmlspecialchars($row['player_name']) ?></td>
            <td><?= $row['best_time'] ?></td>
        </tr>
    <?php endwhile; ?>
</table>

<p style="text-align: center;"><a href="index.php">← Назад до гри</a></p>
</body>
</html>
