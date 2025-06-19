<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\InputObjectType;

class OrderItemAttributeType extends InputObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'OrderItemAttribute',
            'fields' => [
                'id' => ['type' => Type::nonNull(Type::string())],
                'value' => ['type' => Type::nonNull(Type::string())],
            ],
        ]);
    }
}
