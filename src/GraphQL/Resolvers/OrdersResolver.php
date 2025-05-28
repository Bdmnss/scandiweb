<?php

namespace App\GraphQL\Resolvers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Database;

class OrdersResolver
{
    public static function create($root, array $args)
    {
        $db = new Database();

        $orderResult = Order::create($db);
        if (!$orderResult['success']) {
            throw new \Exception($orderResult['error']);
        }
        $orderId = $orderResult['orderId'];

        $totalAmount = 0;
        $currency = 'USD';

        foreach ($args['items'] as $item) {
            $totalAmount += $item['paidAmount'] * $item['quantity'];
            $currency = $item['paidCurrency'] ?? $currency;
            $insertResult = OrderItem::insertItem($db, $orderId, $item);
            if (!$insertResult['success']) {
                throw new \Exception($insertResult['error']);
            }
        }

        $updateResult = Order::update($db, $orderId, $totalAmount, $currency);
        if (!$updateResult['success']) {
            throw new \Exception($updateResult['error']);
        }

        return [
            'id' => $orderId,
            'total_amount' => $totalAmount,
            'total_currency' => $currency,
        ];
    }
}
