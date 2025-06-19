<?php

namespace App\GraphQL\Resolvers;

use App\Models\Category;

class CategoriesResolver
{
    public static function resolve(): array
    {
        return Category::getAll();
    }
}
