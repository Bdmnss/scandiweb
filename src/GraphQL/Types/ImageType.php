<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ImageType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Image',
            'fields' => [
                'url' => Type::string(),
            ],
        ]);
    }
}
