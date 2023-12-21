<?php
$conn_servername = "localhost";
$conn_username = "root";
$conn_password = "16497346285aA@";
$conn_database = "collage_project";

$conn = new mysqli($conn_servername, $conn_username, $conn_password, $conn_database);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>