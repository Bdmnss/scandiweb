<?php

namespace App\Models;

use App\Database;

abstract class Model
{
    protected Database $db;
    protected static string $table;

    public function __construct()
    {
        $this->db = new Database();

        if (!isset(static::$table)) {
            abort(500, 'Table name must be set in the model class.');
        }
    }

    public static function getAll(array $filters = []): array
    {
        $instance = new static();
        $query = "SELECT * FROM " . static::$table;
        $params = [];

        if (!empty($filters)) {
            $conditions = [];
            foreach ($filters as $column => $value) {
                if ($value !== null) {
                    $conditions[] = $column . " = :" . $column;
                    $params[$column] = $value;
                }
            }

            if (!empty($conditions)) {
                $query .= " WHERE " . implode(" AND ", $conditions);
            }
        }

        return $instance->db->query($query, $params)->get();
    }

    public static function getOne(string $value, ?string $column = 'id'): ?array
    {
        $instance = new static();
        $query = "SELECT * FROM " . static::$table . " WHERE " . $column . " = :value LIMIT 1";
        return $instance->db->query($query, ['value' => $value])->fetch();
    }
}
