<?php

namespace App\GraphQL\Resolvers;

use App\Models\Attribute;

class AttributesResolver
{
    public static function resolve(array $product): array
    {
        return Attribute::getAttributesByProductId($product['id']);
    }
}
