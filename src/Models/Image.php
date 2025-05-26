<?php

namespace App\Models;

class Image extends Model
{
    protected static string $table = 'images';

    public static function getImagesByProductId(string $productId): array
    {
        $results = (new static())->db->query(
            'SELECT url FROM images WHERE product_id = :productId',
            ['productId' => $productId]
        )->get();

        return array_map(fn($row) => ['url' => $row['url']], $results);
    }
}
