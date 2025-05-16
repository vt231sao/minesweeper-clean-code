<?php
session_start();
require_once 'db_config.php';

if (!isset($_SESSION['username'])) {
    http_response_code(401);
    exit("Неавторизований доступ");
}

$player = $_SESSION['username'];
$time = filter_input(INPUT_POST, 'time', FILTER_VALIDATE_INT);
$difficulty = filter_input(INPUT_POST, 'difficulty', FILTER_SANITIZE_STRING);

if ($time <= 0 || !in_array($difficulty, ['easy', 'medium', 'hard'])) {
    http_response_code(400);
    exit("Невірні дані");
}

$conn = getDbConnection();

$sql = "INSERT INTO scores (player_name, time_seconds, difficulty) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sis", $player, $time, $difficulty);
$stmt->execute();

$stmt->close();
$conn->close();

echo "OK";
?>
