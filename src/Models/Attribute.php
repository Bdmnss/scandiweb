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

        $grouped = [];
        foreach ($results as $row) {
            $attrId = $row['attribute_id'];
            if (!isset($grouped[$attrId])) {
                $grouped[$attrId] = [
                    'id' => $attrId,
                    'name' => $row['name'],
                    'type' => $row['type'],
                    'items' => [],
                ];
            }
            $grouped[$attrId]['items'][] = [
                'id' => $row['item_id'],
                'displayValue' => $row['displayValue'],
                'value' => $row['value'],
            ];
        }
        return array_values($grouped);
    }
}
