<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once 'getDatabaseConnection.php';
include_once 'fetchData.php';
include_once 'preprocessData.php';

if (!isset($_GET['id'])) {
    echo json_encode(["error" => "Product ID is required"]);
    exit;
}

$productId = $_GET['id'];

$conn = getDatabaseConnection();

$sql = "SELECT * FROM tech WHERE id = '$productId'
        UNION ALL
        SELECT * FROM clothes WHERE id = '$productId'";

$data = fetchData($conn, $sql);
$processedData = preprocessData($data);

mysqli_close($conn);

if (count($processedData) > 0) {
    echo json_encode($processedData[0]);
} else {
    echo json_encode(["error" => "Product not found"]);
}
