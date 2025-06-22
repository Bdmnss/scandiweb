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

        $products = Product::getAll($filters);

        if (empty($products)) {
            abort(404, "No products found in the selected category.");
        }

        return $products;
    }

    public static function getOne(string $id): ?array
    {
        $product = Product::getOne($id);

        if (empty($product)) {
            abort(404, "Product with ID '$id' not found.");
        }

        return $product;
    }
}
