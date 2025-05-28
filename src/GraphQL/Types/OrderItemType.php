<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class OrderItemType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'OrderItem',
            'fields' => [
                'id' => Type::id(),
                'product_id' => Type::string(),
                'product_name' => Type::string(),
                'attribute_values' => Type::string(),
                'quantity' => Type::int(),
                'paid_amount' => Type::float(),
                'paid_currency' => Type::string(),
                'created_at' => Type::string(),
                'updated_at' => Type::string(),
            ],
        ]);
    }
}
