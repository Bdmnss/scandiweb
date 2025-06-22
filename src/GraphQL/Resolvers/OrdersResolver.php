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
            if (!isset($orderResult) || !$orderResult['success']) {
                abort(500, "Order creation failed. Please try again later.");
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
                    abort(500, "Failed to add product '{$productDetails['productName']}' to order: {$insertResult['error']}");
                }
            }

            $updateResult = Order::update($db, $orderId, $totalAmount, $currency);

            if (!$updateResult['success']) {
                abort(500, "Failed to update order total: {$updateResult['error']}");
            }

            $db->commit();

            return "Order placed successfully! Order ID: $orderId, $totalAmount $currency will be charged from your card.";
        } catch (Exception $e) {
            $db->rollback();
            abort(500, "Unexpected error while creating order: " . $e->getMessage());
        }
    }

    private static function updateOrderItemWithProductDetails(array $item)
    {
        $product = Product::getOne($item['productId']);

        if (!$product) {
            abort(400, "Product with ID '{$item['productId']}' does not exist.");
        }

        if (!$product['inStock']) {
            abort(400, "Product '{$product['name']}' is out of stock.");
        }

        if (
            !isset($item['quantity']) ||
            !is_numeric($item['quantity']) ||
            $item['quantity'] < 1
        ) {
            abort(400, "Invalid quantity for product '{$product['name']}'.");
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
