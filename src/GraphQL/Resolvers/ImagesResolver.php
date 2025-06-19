<?php

namespace App\GraphQL\Resolvers;

use App\Models\Image;

class ImagesResolver
{
    public static function resolve(array $product): array
    {
        return Image::getImagesByProductId($product['id']);
    }
}
