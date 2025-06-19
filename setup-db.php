<?php

/**
 * Database Setup Script
 *
 * This script will:
 * 1. Connect to MySQL server
 * 2. Drop and recreate the 'scandiweb' database
 * 3. Create all tables and insert sample data
 *
 * Environment Variables (create .env file):
 * - DB_HOST=localhost (default)
 * - DB_USER=root (default)
 * - DB_PASSWORD=your_password
 * - DB_PORT=3306 (default)
 *
 * Usage: composer run setup-db
 */

require_once 'vendor/autoload.php';

// Load environment variables if .env file exists
if (file_exists(__DIR__ . '/.env')) {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->safeLoad();
}

// Database configuration (consistent with existing Database.php)
$host = $_ENV['DB_HOST'] ?? 'localhost';
$username = $_ENV['DB_USER'] ?? 'root';
$password = $_ENV['DB_PASSWORD'] ?? '';
$port = $_ENV['DB_PORT'] ?? '3306';

echo "Setting up database...\n";
echo "Host: $host:$port\n";
echo "Username: $username\n";

try {
    // Connect to MySQL server
    $dsn = "mysql:host=$host;port=$port;charset=utf8mb4";
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "Connected to MySQL server successfully!\n";

    // Read and execute schema.sql
    $schemaPath = __DIR__ . '/schema.sql';
    if (!file_exists($schemaPath)) {
        throw new Exception("Schema file not found: $schemaPath");
    }

    $sql = file_get_contents($schemaPath);
    if ($sql === false) {
        throw new Exception("Failed to read schema file");
    }

    echo "Executing schema.sql...\n";

    // Disable foreign key checks temporarily to avoid constraint issues during setup
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 0");

    try {
        // Execute the entire SQL file at once to avoid issues with multi-line statements
        $pdo->exec($sql);
        echo "Schema executed successfully!\n";
    } catch (PDOException $e) {
        echo "❌ Error executing schema: " . $e->getMessage() . "\n";

        // If bulk execution fails, try statement by statement with better parsing
        echo "Trying statement-by-statement execution...\n";

        // Remove comments and empty lines first
        $cleanSql = preg_replace('/^\s*--.*$/m', '', $sql);
        $cleanSql = preg_replace('/^\s*$/m', '', $cleanSql);

        // Use a more sophisticated approach to split statements
        // This regex looks for semicolons that are not inside quotes
        $statements = preg_split('/;(?=(?:[^\']*\'[^\']*\')*[^\']*$)/', $cleanSql);

        foreach ($statements as $statement) {
            $statement = trim($statement);
            if (!empty($statement)) {
                try {
                    $pdo->exec($statement);
                } catch (PDOException $e) {
                    echo "Error in statement: " . substr($statement, 0, 200) . "...\n";
                    echo "SQL Error: " . $e->getMessage() . "\n";
                    throw $e;
                }
            }
        }
    }

    // Re-enable foreign key checks
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 1");

    echo "✅ Database setup completed successfully!\n";
    echo "Database 'scandiweb' has been created and populated with sample data.\n";
} catch (PDOException $e) {
    echo "❌ Database connection failed: " . $e->getMessage() . "\n";
    echo "\nPlease check your database configuration:\n";
    echo "- Make sure MySQL is running\n";
    echo "- Check your database credentials in .env file\n";
    echo "- Ensure the database user has CREATE/DROP privileges\n";
    exit(1);
} catch (Exception $e) {
    echo "❌ Setup failed: " . $e->getMessage() . "\n";
    exit(1);
}
