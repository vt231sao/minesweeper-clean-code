<?php
global $conn;
session_start();
require 'db_config.php';

if (!isset($_SESSION['username'])) {
    http_response_code(401);
    echo "Неавторизований доступ";
    exit();
}

$player = $_SESSION['username'];
$time = isset($_POST['time']) ? intval($_POST['time']) : 0;
$difficulty = isset($_POST['difficulty']) ? $_POST['difficulty'] : 'easy';

if ($time <= 0 || !in_array($difficulty, ['easy', 'medium', 'hard'])) {
    http_response_code(400);
    echo "Невірні дані";
    exit();
}

$sql = "INSERT INTO scores (player_name, time_seconds, difficulty) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sis", $player, $time, $difficulty);
$stmt->execute();
$stmt->close();
$conn->close();

echo "OK";
