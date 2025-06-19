<?php

namespace App\Models;

use App\Models\Image;
use App\Models\Price;
use App\Models\Attribute;

class Product extends Model
{
    protected static string $table = 'products';

    public static function getAll(array $filters = []): array
    {
        return parent::getAll($filters);
    }

    public static function getOne(string $value, ?string $column = 'id'): ?array
    {
        $product = parent::getOne($value, $column);

        if (!$product) {
            return null;
        }

        return $product;
    }

    public static function getPrice(string $productId): array
    {
        return Price::getOne($productId);
    }
}
