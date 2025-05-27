<?php

namespace App\Models;

use App\Models\Image;
use App\Models\Price;
use App\Models\Attribute;

class Product extends Model
{
    protected static string $table = 'products';

    public static function getAllWithDetails(?string $category = null): array
    {
        $query = 'SELECT * FROM ' . static::$table;
        $params = [];

        if ($category && strtolower($category) !== 'all') {
            $query .= ' WHERE category = :category';
            $params['category'] = $category;
        }

        $products = (new static())->db->query($query, $params)->get();

        if (empty($products)) {
            return [];
        }

        foreach ($products as &$product) {
            self::attachRelations($product);
        }

        return $products;
    }

    public static function getByIdWithDetails(string $id): ?array
    {
        $query = 'SELECT * FROM ' . static::$table . ' WHERE id = :id';
        $params = ['id' => $id];
        $results = (new static())->db->query($query, $params)->get();
        $product = $results[0] ?? null;

        if (!$product) {
            return null;
        }

        self::attachRelations($product);
        return $product;
    }

    private static function attachRelations(array &$product): void
    {
        if (empty($product['id'])) {
            $product['images'] = [];
            $product['prices'] = [];
            $product['attributes'] = [];
            return;
        }

        $product['images'] = Image::getImagesByProductId($product['id']);
        $product['prices'] = Price::getPricesByProductId($product['id']);
        $product['attributes'] = Attribute::getAttributesByProductId($product['id']);
    }
}
