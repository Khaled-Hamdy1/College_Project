<?php
$conn_servername = "localhost";
$conn_username = "root";
$conn_password = "123456";
$conn_database = "collage_project";

$conn = new mysqli($conn_servername, $conn_username, $conn_password);

// Create database
$sql = "CREATE DATABASE IF NOT EXISTS $conn_database";
if ($conn->query($sql) === TRUE) {
  // echo "Database created successfully\n";
} else {
  echo "Error creating database: " . $conn->error;
}

// Select database
$conn->select_db($conn_database);

// Create users table
$sql = "CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
)";

if ($conn->query($sql) === TRUE) {
  // echo "Users table created successfully\n";
} else {
  echo "Error creating users table: " . $conn->error;
}

// Create images table
$sql = "CREATE TABLE IF NOT EXISTS `images` (
    `id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `base64_data` longtext NOT NULL,
    `upload_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `user_id` int DEFAULT '0',
    `is_fav` tinyint NOT NULL DEFAULT '0',
    PRIMARY KEY (`id`),
    KEY `images_ibfk_1` (`user_id`),
    CONSTRAINT `images_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)";

if ($conn->query($sql) === TRUE) {
  // echo "Images table created successfully\n";
} else {
  echo "Error creating images table: " . $conn->error;
}



if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>