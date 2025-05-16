<?php
function getDbConnection(): mysqli {
    $host = 'localhost';
    $user = 'root';
    $password = '';
    $dbname = 'minesweeper';

    $conn = new mysqli($host, $user, $password, $dbname);
    if ($conn->connect_error) {
        die("Помилка підключення: " . $conn->connect_error);
    }
    return $conn;
}
?>
