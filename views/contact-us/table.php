<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Table</title>
  <link rel="stylesheet" href="../../styles/contact-us.css">
</head>

<body>
  <div class="table-container">
    <div class="header-container">
      <h2>Recent Inquiries</h2>
      <button id="load-btn">Load Data</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Subject</th>
          <th>Email</th>
          <th>Message</th>
          <th colspan="2">Action</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>

  <script>
    const contact = JSON.parse(sessionStorage.getItem('contact'))
    const loadBtn = document.getElementById('load-btn');

    loadBtn.addEventListener('click', () => {
      location.reload();
    });

    renderTable()
    function renderTable() {
      const tbody = document.querySelector('tbody');
      if (!contact) {
        tbody.innerHTML = `
          <tr>
            <td colspan="5">No data found</td>
          </tr>
        `;
        return;
      }


      tbody.innerHTML = `
          <tr>
            <td>${contact.subject}</td>
            <td>${contact.email}</td>
            <td>${contact.message}</td>
            <td><button style="background-color:red" onclick="confirmMail()">Confirm</button></td>
            <td><button onclick="ignoreMail()">Ignore</button></td>
          </tr>
        `;
    }

    function confirmMail() {
      sessionStorage.removeItem('contact');

      var mailtoLink = `mailto:${contact.email}?subject=${contact.subject}&body=${contact.message}`;

      window.location.href = mailtoLink;
    }

    function ignoreMail() {
      sessionStorage.removeItem('contact');
      location.reload();
    }
  </script>
</body>

</html>