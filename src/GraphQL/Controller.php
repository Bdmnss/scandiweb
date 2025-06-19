<?php

namespace App\GraphQL;

use App\GraphQL\Resolvers\CategoriesResolver;
use App\GraphQL\Resolvers\ProductsResolver;
use App\GraphQL\Resolvers\OrdersResolver;
use App\GraphQL\Types\CategoryType;
use App\GraphQL\Types\OrderItemType;
use App\GraphQL\Types\ProductType;
use App\GraphQL\Types\OrderType;
use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use RuntimeException;
use Throwable;

class Controller
{
    public static function handle()
    {
        try {
            $productType = new ProductType();

            $queryType = new ObjectType([
                'name' => 'Query',
                'fields' => [
                    'categories' => [
                        'type' => Type::listOf(new CategoryType()),
                        'resolve' => static fn(): array => CategoriesResolver::resolve(),
                    ],
                    'products' => [
                        'type' => Type::listOf($productType),
                        'args' => [
                            'category' => ['type' => Type::string()],
                        ],
                        'resolve' => static fn($rootValue, array $args) => ProductsResolver::getAll($args['category'] ?? null),
                    ],
                    'product' => [
                        'type' => $productType,
                        'args' => [
                            'id' => ['type' => Type::nonNull(Type::string())],
                        ],
                        'resolve' => static fn($rootValue, array $args) => ProductsResolver::getOne($args['id']),
                    ],
                ],
            ]);

            $mutationType = new ObjectType([
                'name' => 'Mutation',
                'fields' => [
                    'createOrder' => [
                        'type' => Type::string(),
                        'args' => [
                            'items' => ['type' => Type::listOf(new OrderItemType())],
                        ],
                        'resolve' => static function ($root, $args) {
                            return OrdersResolver::create($root, $args);
                        },
                    ],
                ],
            ]);

            $schema = new Schema(
                (new SchemaConfig())
                    ->setQuery($queryType)
                    ->setMutation($mutationType)
            );

            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to get php://input');
            }

            $input = json_decode($rawInput, true);
            $query = $input['query'];
            $variableValues = $input['variables'] ?? null;

            $rootValue = ['prefix' => 'You said: '];
            $result = GraphQLBase::executeQuery($schema, $query, $rootValue, null, $variableValues);
            $output = $result->toArray();
        } catch (Throwable $e) {
            abort(500, $e->getMessage());
        }

        header('Content-Type: application/json; charset=UTF-8');
        return json_encode($output);
    }
}
