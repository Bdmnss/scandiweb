<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class OrderType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Order',
            'fields' => function () {
                return [
                    'id' => Type::id(),
                    'total_amount' => Type::float(),
                    'total_currency' => Type::string(),
                    'items' => [
                        'type' => Type::listOf(new OrderItemType()),
                        'resolve' => function ($order) {
                            return \App\Models\OrderItem::getByOrderId($order['id']);
                        }
                    ],
                ];
            }
        ]);
    }
}
