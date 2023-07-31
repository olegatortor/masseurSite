<?php

$host = 'ваш_хост';
$user = 'ваш_користувач';
$password = 'ваш_пароль';
$dbname = 'ваша_база_даних';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT * FROM ваша_таблиця";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
} catch(PDOException $e) {
    echo "Помилка: " . $e->getMessage();
}

?>