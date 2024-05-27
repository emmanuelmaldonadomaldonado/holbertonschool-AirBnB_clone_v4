document.addEventListener('DOMContentLoaded', function () {
  const apiStatus = document.getElementById('api_status');

  fetch('http://0.0.0.0:5001/api/v1/status/')
      .then(response => response.json())
      .then(data => {
          if (data.status === 'OK') {
              apiStatus.classList.add('available');
          } else {
              apiStatus.classList.remove('available');
          }
      })
      .catch(() => {
          apiStatus.classList.remove('available');
      });
});
