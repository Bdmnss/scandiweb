<?php

namespace App\GraphQL\Resolvers;

use App\Models\Price;

class PriceResolver
{
    public static function resolve(array $product): array
    {
        return Price::getOne($product['id']);
    }
}
