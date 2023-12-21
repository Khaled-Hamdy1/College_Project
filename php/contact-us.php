<?php
include_once('./config.php');

if ($_SERVER['REQUEST_METHOD'] === "POST") {
  $subject = $_POST['subject'];
  $email = $_POST['email'];
  $message = $_POST['message'];


  if ($conn->query($sql) === TRUE) {
    echo "Contact created successfully!";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }

} else if ($_SERVER['REQUEST_METHOD'] === "GET") {
  $userId = $_GET['userId'];

  if (!isset($userId)) {
    die("Error: userId is not set");
  }

  $sql = "SELECT * FROM contact_us where user_id = $userId";
  $result = $conn->query($sql);

  if (!$result) {
    die("Error in SQL query: " . $conn->error);
  }

  $contact = array();

  while ($row = $result->fetch_assoc()) {
    $contact[] = $row;
  }

  echo json_encode($contact);
}
?>