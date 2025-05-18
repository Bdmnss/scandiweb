<?php
function fetchData($conn, $sql)
{
    $result = mysqli_query($conn, $sql);
    if (!$result) {
        echo json_encode(["error" => "Query failed: " . mysqli_error($conn)]);
        exit;
    }
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
    mysqli_free_result($result);
    return $data;
}
