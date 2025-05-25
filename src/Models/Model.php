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

    public static function all(): array
    {
        $query = "SELECT * FROM " . static::$table;
        return (new static())->db->query($query)->get();
    }

    public static function find(string $value, ?string $column = 'id'): ?array
    {
        $query = "SELECT * FROM " . static::$table . " WHERE . $column . = :id";
        $result = (new static())->db->query($query, ['id' => $value])->get();
        return $result ? $result[0] : null;
    }
}
