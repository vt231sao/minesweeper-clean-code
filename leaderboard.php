<?php
global $conn;
require 'db_config.php';

$result = $conn->query("SELECT player_name, MIN(time_seconds) as best_time FROM scores GROUP BY player_name ORDER BY best_time ASC LIMIT 10");
?>
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title>Топ гравців</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<h2>🏆 Топ 10 гравців</h2>
<table border="1" style="margin: 0 auto;">
    <tr>
        <th>Гравець</th>
        <th>Найкращий час (сек)</th>
    </tr>
    <?php while ($row = $result->fetch_assoc()): ?>
        <tr>
            <td><?= htmlspecialchars($row['player_name']) ?></td>
            <td><?= $row['best_time'] ?></td>
        </tr>
    <?php endwhile; ?>
</table>
<p><a href="index.php">← Назад до гри</a></p>
</body>
</html>
