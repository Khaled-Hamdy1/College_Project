<?php
$conn_servername = "localhost";
$conn_username = "root";
$conn_password = "16497346285aA@";
$conn_database = "collage_project";

$conn = new mysqli($conn_servername, $conn_username, $conn_password, $conn_database);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$jsonData = json_decode(file_get_contents('php://input'), true);

$userId = $jsonData['userId'];
$imageName = $jsonData['imageName'];
$imageData = $jsonData['imageData'];

$sql = "INSERT INTO images (title, base64_data, user_id) VALUES ('$imageName', '$imageData', '$userId')";

if ($conn->query($sql) === TRUE) {
  echo "Image uploaded successfully!";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>