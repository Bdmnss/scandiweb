<?php

namespace App\Models;

class Attribute extends Model
{
    protected static string $table = 'attributes';

    public static function getAttributesByProductId(string $productId): array
    {
        $results = (new static())->db->query(
            'SELECT
                a.id as attribute_id, a.name, a.type, pa.displayValue, pa.value, pa.id as item_id
            FROM
                product_attributes pa
            INNER JOIN
                attributes a ON pa.attribute_id = a.id
            WHERE
                pa.product_id = :productId',
            ['productId' => $productId]
        )->get();

        $attributes = [];

        foreach ($results as $row) {
            $attrId = $row['attribute_id'];

            if (!isset($attributes[$attrId])) {
                $attributes[$attrId] = [
                    'id' => $productId . '-' . $attrId,
                    'name' => $row['name'],
                    'type' => $row['type'],
                    'items' => [],
                ];
            }

            $attributes[$attrId]['items'][] = [
                'id' => $row['item_id'],
                'displayValue' => $row['displayValue'],
                'value' => $row['value'],
            ];
        }

        return $attributes;
    }
}
