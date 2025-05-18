<?php
function getDatabaseConnection()
{
    $conn = mysqli_connect("localhost", "root", "", "scandiweb");
    if (!$conn) {
        echo json_encode(["error" => "Connection failed: " . mysqli_connect_error()]);
        exit;
    }
    return $conn;
}
