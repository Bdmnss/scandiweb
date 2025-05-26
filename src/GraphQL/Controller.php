<?php

namespace App\GraphQL;

use App\GraphQL\Resolvers\CategoriesResolver;
use App\GraphQL\Types\CategoryType;
use App\GraphQL\Types\ImageType;
use App\GraphQL\Types\PriceType;
use App\Models\Image;
use App\Models\Price;
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
            $queryType = new ObjectType([
                'name' => 'Query',
                'fields' => [
                    'categories' => [
                        'type' => Type::listOf(new CategoryType()),
                        'resolve' => static fn(): array => CategoriesResolver::resolve(),
                    ],
                    'prices' => [
                        'type' => Type::listOf(new PriceType()),
                        'args' => [
                            'productId' => ['type' => Type::string()],
                        ],
                        'resolve' => static function ($root, $args) {
                            if (!isset($args['productId'])) {
                                return [];
                            }
                            return Price::getPricesByProductId($args['productId']);
                        },
                    ],
                    'images' => [
                        'type' => Type::listOf(new ImageType()),
                        'args' => [
                            'productId' => ['type' => Type::string()],
                        ],
                        'resolve' => static function ($root, $args) {
                            if (!isset($args['productId'])) {
                                return [];
                            }
                            return Image::getImagesByProductId($args['productId']);
                        },
                    ],
                ],
            ]);

            $mutationType = new ObjectType([
                'name' => 'Mutation',
                'fields' => [
                    'sum' => [
                        'type' => Type::int(),
                        'args' => [
                            'x' => ['type' => Type::int()],
                            'y' => ['type' => Type::int()],
                        ],
                        'resolve' => static fn($calc, array $args): int => $args['x'] + $args['y'],
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
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');
        return json_encode($output);
    }
}
