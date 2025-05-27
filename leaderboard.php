<?php
require_once 'db_config.php';

function getTopPlayers(mysqli $conn, string $difficulty): array
{
    $stmt = $conn->prepare("
        SELECT player_name, MIN(time_seconds) as best_time 
        FROM scores 
        WHERE difficulty = ? 
        GROUP BY player_name 
        ORDER BY best_time ASC 
        LIMIT 5
    ");

    if (!$stmt) {
        die("Помилка запиту: " . $conn->error);
    }

    $stmt->bind_param("s", $difficulty);
    $stmt->execute();
    $result = $stmt->get_result();

    if (!$result) {
        die("Помилка отримання результатів: " . $stmt->error);
    }

    return $result->fetch_all(MYSQLI_ASSOC);
}

function renderTable(array $results, string $title): void
{
    echo "<h3>$title</h3>";
    echo "<table>";
    echo "<tr><th>Гравець</th><th>Найкращий час (сек)</th></tr>";

    if (count($results) === 0) {
        echo "<tr><td colspan='2'>Немає даних</td></tr>";
    } else {
        foreach ($results as $row) {
            $name = htmlspecialchars($row['player_name']);
            $time = (int)$row['best_time'];
            echo "<tr><td>$name</td><td>$time</td></tr>";
        }
    }

    echo "</table>";
}

$conn = getDbConnection();

$topPlayers = [
    '🟢 Легкий рівень' => getTopPlayers($conn, 'easy'),
    '🟡 Середній рівень' => getTopPlayers($conn, 'medium'),
    '🔴 Складний рівень' => getTopPlayers($conn, 'hard'),
];

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

        th,
        td {
            padding: 8px 16px;
            border: 1px solid #ccc;
        }

        h2,
        h3 {
            text-align: center;
        }
    </style>
</head>

<body>
    <h2>🏆 Лідери гри Сапер</h2>

    <?php
    foreach ($topPlayers as $title => $results) {
        renderTable($results, $title);
    }
    ?>

    <p style="text-align: center;"><a href="index.php">← Назад до гри</a></p>
</body>

</html>