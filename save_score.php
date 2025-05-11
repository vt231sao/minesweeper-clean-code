<?php
global $conn;
require 'db_config.php';

$player = $_POST['player'];
$time = $_POST['time'];

$sql = "INSERT INTO scores (player_name, time_seconds) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $player, $time);
$stmt->execute();
$stmt->close();
$conn->close();
?>
