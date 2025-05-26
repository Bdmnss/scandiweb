<?php

namespace App\Models;

class Price extends Model
{
    protected static string $table = 'prices';

    public static function getPricesByProductId(string $productId): array
    {
        $results = (new static())->db->query(
            'SELECT 
                p.amount, c.label, c.symbol 
            FROM 
                prices p
            INNER JOIN
                currencies c ON p.currency = c.label
            WHERE
                p.product_id = :productId',
            ['productId' => $productId]
        )->get();

        return array_map(function ($row) {
            return [
                'amount' => number_format((float)$row['amount'], 2, '.', ''),
                'currency' => [
                    'label' => $row['label'],
                    'symbol' => $row['symbol'],
                ],
            ];
        }, $results);
    }
}
