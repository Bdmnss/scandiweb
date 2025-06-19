<?php

namespace App\GraphQL\Resolvers;

use App\Models\Product;

class ProductsResolver
{
    public static function getAll(?string $category = null): array
    {
        $filters = [];

        if ($category && strtolower($category) !== 'all') {
            $filters['category'] = $category;
        }

        return Product::getAll($filters);
    }

    public static function getOne(string $id): ?array
    {
        return Product::getOne($id);
    }
}
