<?php
function preprocessData($data)
{
    return array_map(function ($product) {
        $product['gallery'] = json_decode($product['gallery'], true); // Parse gallery JSON
        $product['prices'] = json_decode($product['prices'], true); // Parse prices JSON
        $product['attributes'] = json_decode($product['attributes'], true); // Parse attributes JSON
        $product['inStock'] = $product['in_stock'] === "1"; // Convert in_stock to boolean
        unset($product['in_stock']); // Remove the original in_stock field
        return $product;
    }, $data);
}
