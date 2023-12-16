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
    <video
      src="../media/mylivewallpapers.com-Green-Particles-4k.mp4"
      loop
      muted
      autoplay
      id="video"
    ></video>
    <section class="wrapper sign-wrapper">
      <div class="form signup">
        <header>Signup</header>
        <form>
          <input type="text" placeholder="Full name" required />
          <input
            type="text"
            placeholder="Username"
            pattern="[a-z]{4,8}"
            title="Username must be 4-8 characters long and lowercase"
            required
          />
          <input
            type="password"
            placeholder="Password"
            pattern=".{8,}"
            title="Password must be 8 characters long"
            required
          />
          <button type="submit" class="login-btn">Signup</button>
        </form>
      </div>

      <div class="form login">
        <header>Login</header>
        <form>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" class="login-btn">Login</button>
        </form>
      </div>
    </section>
    <audio
      src="../media/zapsplat_multimedia_alert_chime_short_musical_notification_001_64910.mp3"
      type="audio/mp3"
      id="audio"
    ></audio>
    <!-- Login -->
    <script src="../scripts/login.js"></script>
  </body>
</html>