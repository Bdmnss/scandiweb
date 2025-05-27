<?php

namespace App\GraphQL\Resolvers;

use App\Models\Product;

class ProductsResolver
{
    public static function resolve(?string $category = null): array
    {
        $products = Product::getAllWithDetails($category);
        return is_array($products) ? $products : [];
    }
}
