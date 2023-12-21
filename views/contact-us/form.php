<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form</title>
  <link rel="stylesheet" href="../../styles/contact-us.css">
</head>

<body>
  <div class="form-container">
    <h2>Contact Us</h2>
    <form onsubmit="sendEmail(event)">
      <label for="subject">Subject:</label>
      <input type="text" id="subject" name="subject" required>

      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>

      <label for="message">Message:</label>
      <textarea id="message" name="message" required></textarea>

      <input type="hidden" name="userId" value="1">

      <button type="submit">Submit</button>
    </form>
  </div>

  <script>
    function sendEmail(event) {
      var subject = encodeURIComponent(document.getElementById('subject').value);
      var message = encodeURIComponent(document.getElementById('message').value);
      const email = document.getElementById('email').value;

      const contact = {
        subject,
        message,
        email
      }

      sessionStorage.setItem('contact', JSON.stringify(contact));
    }
  </script>
</body>

</html>