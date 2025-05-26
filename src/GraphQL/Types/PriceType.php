<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;


class CurrencyType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Currency',
            'fields' => [
                'label' => Type::string(),
                'symbol' => Type::string(),
            ],
        ]);
    }
}

class PriceType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Price',
            'fields' => [
                'amount' => Type::string(),
                'currency' => new CurrencyType(),
            ],
        ]);
    }
}
