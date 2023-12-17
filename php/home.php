<?php
$servername = "localhost";
$username = "root";
$password = "16497346285aA@";
$database = "collage_project";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $jsonData = json_decode(file_get_contents('php://input'), true);

  $action = $jsonData['action'];

  if ($action === 'upload') {
    uploadImage($conn, $jsonData);
  } else if ($action === "update") {
    updateImage($conn, $jsonData);
  } else if ($action === 'delete') {
    deleteImage($conn, $jsonData);
  }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $userId = $_GET['userId'];

  if (!isset($userId)) {
    die("Error: userId is not set");
  }

  $sql = "SELECT * FROM images where user_id = $userId";
  $result = $conn->query($sql);

  if (!$result) {
    die("Error in SQL query: " . $conn->error);
  }

  $images = array();

  while ($row = $result->fetch_assoc()) {
    $images[] = $row;
  }

  echo json_encode($images);
}

$conn->close();

function uploadImage($conn, $jsonData)
{
  $userId = $jsonData['userId'];
  $imageName = $jsonData['imageName'];
  $imageData = $jsonData['imageData'];

  $sql = "INSERT INTO images (title, base64_data, user_id) VALUES ('$imageName', '$imageData', '$userId')";

  if ($conn->query($sql) === TRUE) {
    echo "Image uploaded successfully!";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}

function updateImage($conn, $jsonData)
{
  $isFav = intval($jsonData['isFav']);
  $imageId = $jsonData['imageId'];


  $sql = "UPDATE images SET is_fav = '$isFav' WHERE id = $imageId";

  if ($conn->query($sql) === TRUE) {
    echo $isFav;
    echo "Image updated successfully!";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}

function deleteImage($conn, $jsonData)
{
  $imageId = $jsonData['imageId'];

  $sql = "DELETE FROM images WHERE id = $imageId";

  if ($conn->query($sql) === TRUE) {
    echo "Image deleted successfully!";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}


?>