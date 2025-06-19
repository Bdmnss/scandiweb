<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\GraphQL\Resolvers\AttributesResolver;
use App\GraphQL\Resolvers\ImagesResolver;
use App\GraphQL\Resolvers\PriceResolver;

class ProductType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Product',
            'fields' => [
                'id' => Type::string(),
                'name' => Type::string(),
                'inStock' => Type::boolean(),
                'description' => Type::string(),
                'category' => Type::string(),
                'brand' => Type::string(),
                'images' => [
                    'type' => Type::listOf(new ImageType()),
                    'resolve' => static fn(array $product): array => ImagesResolver::resolve($product),
                ],
                'price' => [
                    'type' => new PriceType(),
                    'resolve' => static fn(array $product): array => PriceResolver::resolve($product),
                ],
                'attributes' => [
                    'type' => Type::listOf(new AttributeSetType()),
                    'resolve' => static fn(array $product): array => AttributesResolver::resolve($product),
                ],
            ],
        ]);
    }
}
