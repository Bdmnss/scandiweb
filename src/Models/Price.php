<?php

namespace App\Models;

class Price extends Model
{
    protected static string $table = 'prices';

    public static function getOne(string $value, ?string $column = 'product_id'): array
    {
        $result = (new static())->db->query(
            'SELECT
                p.amount, c.label, c.symbol
            FROM
                prices p
            INNER JOIN
                currencies c ON p.currency = c.label
            WHERE
                p.product_id = :value LIMIT 1',
            ['value' => $value]
        )->fetch();

        return [
            'amount' => number_format((float)$result['amount'], 2, '.', ''),
            'currency' => [
                'label' => $result['label'],
                'symbol' => $result['symbol'],
            ],
        ];
    }
}
