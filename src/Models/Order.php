<?php

namespace App\Models;

use App\Database;

class Order extends Model
{
    protected static string $table = 'orders';

    private const DEFAULT_TOTAL_AMOUNT = 0;
    private const DEFAULT_CURRENCY = 'USD';

    public static function create(Database $db): array
    {
        $result = $db->query(
            'INSERT INTO ' . static::$table . ' (total_amount, total_currency) VALUES (?, ?)',
            [self::DEFAULT_TOTAL_AMOUNT, self::DEFAULT_CURRENCY]
        );

        if (!$result) {
            return [
                'success' => false,
                'orderId' => null,
                'error' => 'Failed to create order'
            ];
        }

        return [
            'success' => true,
            'orderId' => $db->getLastInsertId(),
            'error' => null
        ];
    }

    public static function update(Database $db, int $orderId, float $totalAmount, string $currency): array
    {
        $result = $db->query(
            'UPDATE ' . static::$table . ' SET total_amount = ?, total_currency = ? WHERE id = ?',
            [$totalAmount, $currency, $orderId]
        );

        if (!$result) {
            return [
                'success' => false,
                'error' => 'Failed to update order'
            ];
        }

        return [
            'success' => true,
            'error' => null
        ];
    }
}
