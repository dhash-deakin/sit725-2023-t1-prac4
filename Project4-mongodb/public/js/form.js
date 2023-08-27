document.addEventListener('DOMContentLoaded', function () {
  var form = document.querySelector('form');
  var modalElems = document.querySelectorAll('.modal');
  var modalInstances = M.Modal.init(modalElems);

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      // Get user inputs
      var firstName = document.getElementById('first_name').value;
      var lastName = document.getElementById('last_name').value;
      var city = document.getElementById('city').value;
      var password = document.getElementById('password').value;

      // Send the form data to the server
      fetch('/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          city: city,
          password: password
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Server response:', data);
        M.toast({html: 'Submitted successfully!', classes: 'rounded center-align'});
        var modalInstance = M.Modal.getInstance(document.querySelector('#formModal'));
        modalInstance.close();
      });
    });
  }
});
