<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once 'getDatabaseConnection.php';
include_once 'fetchData.php';
include_once 'preprocessData.php';

$conn = getDatabaseConnection();

$sql = "SELECT * FROM tech UNION ALL SELECT * FROM clothes";

$data = fetchData($conn, $sql);
$processedData = preprocessData($data);

mysqli_close($conn);

header('Content-Type: application/json');
echo json_encode($processedData);
