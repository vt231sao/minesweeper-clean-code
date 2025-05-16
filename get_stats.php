<?php
require_once 'db_config.php';

$conn = getDbConnection();

$sql = "SELECT * FROM scores ORDER BY time_seconds ASC LIMIT 10";
$result = $conn->query($sql);

$scores = [];
while ($row = $result->fetch_assoc()) {
    $scores[] = $row;
}

header('Content-Type: application/json');
echo json_encode($scores);

$conn->close();
?>
