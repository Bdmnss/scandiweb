<?php

namespace App\GraphQL\Resolvers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Database;
use App\Models\Product;
use Exception;

class OrdersResolver
{
    public static function create($root, array $args)
    {
        $db = new Database();
        $db->beginTransaction();

        try {
            $orderResult = Order::create($db);

            if (!$orderResult['success']) {
                abort(500, $orderResult['error']);
            }

            $orderId = $orderResult['orderId'];
            $totalAmount = 0;
            $currency = 'USD';

            foreach ($args['items'] as $item) {
                $productDetails = self::updateOrderItemWithProductDetails($item);

                $totalAmount += $productDetails['paidAmount'] * $item['quantity'];
                $currency = $item['paidCurrency'] ?? $currency;
                $insertResult = OrderItem::insertItem($db, $orderId, $productDetails);

                if (!$insertResult['success']) {
                    abort(500, $insertResult['error']);
                }
            }

            $updateResult = Order::update($db, $orderId, $totalAmount, $currency);

            if (!$updateResult['success']) {
                abort(500, $updateResult['error']);
            }

            $db->commit();

            return "Order placed successfully! Order ID: $orderId, $totalAmount $currency will be charged from your card.";
        } catch (Exception $e) {
            $db->rollback();
            abort(500, $e->getMessage());
        }
    }

    private static function updateOrderItemWithProductDetails(array $item)
    {
        $product = Product::getOne($item['productId']);

        if (!$product) {
            abort(500, "Product with ID '{$item['productId']}' does not exist");
        }

        if ($product['inStock'] === 0) {
            abort(500, "Product with ID '{$item['productId']}' is out of stock");
        }

        $productPrice = Product::getPrice($product['id']);
        $formattedAttributeValues = [];
        foreach ($item['attributeValues'] as $attribute) {
            $formattedAttributeValues[strtolower($attribute['id'])] = $attribute['value'];
        }
        $attributeValuesJson = json_encode([$formattedAttributeValues]);

        return [
            'productId' => $product['id'],
            'productName' => $product['name'],
            'attributeValues' => $attributeValuesJson,
            'quantity' => $item['quantity'],
            'paidAmount' => $productPrice['amount'] * $item['quantity'],
            'paidCurrency' => $productPrice['currency']['label'],
        ];
    }
}
