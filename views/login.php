<?php
$conn_servername = "localhost";
$conn_username = "root";
$conn_password = "16497346285aA@";
$conn_database = "collage_project";

$conn = new mysqli($conn_servername, $conn_username, $conn_password, $conn_database);

$login_error = false;
$signup_error = false;

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if ($_POST["action"] == "signup") {
    $fullName = $_POST["full_name"];
    $username = $_POST["username"];
    $password = $_POST["password"];

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (full_name, username, password) VALUES ('$fullName', '$username', '$hashedPassword')";

    if ($conn->query($sql) === TRUE) {
      $signup_error = false;
      $checkUserQuery = "SELECT id, username, password FROM users WHERE username = '$username'";
      $result = $conn->query($checkUserQuery);
      $row = $result->fetch_assoc();
      $userId = $row["id"];

      echo "<script>
          localStorage.setItem('userId', $userId);
          setTimeout(() => window.location.href = './index.php', 500)
        </script>";
    } else {
      $signup_error = true;
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
  }

  if ($_POST["action"] == "login") {
    $loginUsername = $_POST["login_username"];
    $loginPassword = $_POST["login_password"];

    $checkUserQuery = "SELECT id, username, password FROM users WHERE username = '$loginUsername'";
    $result = $conn->query($checkUserQuery);

    if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      $hashedPasswordFromDatabase = $row["password"];
      $userId = $row["id"];

      if (password_verify($loginPassword, $hashedPasswordFromDatabase)) {
        $login_error = false;
        echo "<script>
          localStorage.setItem('userId', $userId);
          setTimeout(() => window.location.href = './index.php', 500)
        </script>";
      } else {
        $login_error = true;
      }
    } else {
      $login_error = true;
    }
  }
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login & Signup Form</title>
  <link rel="stylesheet" href="../styles/login.css" />
</head>

<body>
  <video src="../media/mylivewallpapers.com-Green-Particles-4k.mp4" loop muted autoplay id="video"></video>
  <section class="wrapper sign-wrapper">
    <div class="form signup">
      <header>Signup</header>
      <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST">
        <input type="hidden" name="action" value="signup" />

        <input type="text" placeholder="Full name" required name="full_name" />
        <input type="text" placeholder="Username" pattern="[a-z]{4,8}" name="username"
          title="Username must be 4-8 characters long and lowercase" required />
        <input type="password" placeholder="Password" pattern=".{8,}" title="Password must be 8 characters long"
          name="password" required />
        <button type="submit" class="login-btn">Signup</button>
      </form>
    </div>

    <div class="form login">
      <header>Login</header>
      <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST">
        <input type="hidden" name="action" value="login" />
        <?php
        if ($login_error) {
          echo "<p class='error'>Invalid username or password</p>";
        }
        ?>
        <input type="text" placeholder="Username" name="login_username" required />
        <input type="password" name="login_password" placeholder="Password" required />
        <button type="submit" class="login-btn">Login</button>
      </form>
    </div>
  </section>
  <audio src="../media/zapsplat_multimedia_alert_chime_short_musical_notification_001_64910.mp3" type="audio/mp3"
    id="audio"></audio>

  <script src="../scripts/login.js"></script>
</body>

</html>