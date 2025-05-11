<?php
global $conn;
require 'db_config.php';

$result = $conn->query("SELECT * FROM scores ORDER BY time_seconds ASC LIMIT 10");
$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}
echo json_encode($data);
$conn->close();
?>
