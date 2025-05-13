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

if ($time <= 0) {
    http_response_code(400);
    echo "Невірний час";
    exit();
}

$sql = "INSERT INTO scores (player_name, time_seconds) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $player, $time);
$stmt->execute();
$stmt->close();
$conn->close();

echo "OK";
