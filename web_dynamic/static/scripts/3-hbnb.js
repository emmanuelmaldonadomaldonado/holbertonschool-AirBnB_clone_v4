document.addEventListener('DOMContentLoaded', function () {
  const apiStatus = document.getElementById('api_status');
  const placesSection = document.querySelector('.places');

  // Check API status
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

  // Fetch places
  fetch('http://0.0.0.0:5001/api/v1/places_search/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
  })
  .then(response => response.json())
  .then(data => {
      data.forEach(place => {
          const article = document.createElement('article');
          const titleBox = document.createElement('div');
          titleBox.className = 'title_box';
          const h2 = document.createElement('h2');
          h2.textContent = place.name;
          const price = document.createElement('div');
          price.className = 'price_by_night';
          price.textContent = `$${place.price_by_night}`;
          titleBox.appendChild(h2);
          titleBox.appendChild(price);

          const information = document.createElement('div');
          information.className = 'information';
          const maxGuest = document.createElement('div');
          maxGuest.className = 'max_guest';
          maxGuest.textContent = `${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}`;
          const numberRooms = document.createElement('div');
          numberRooms.className = 'number_rooms';
          numberRooms.textContent = `${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}`;
          const numberBathrooms = document.createElement('div');
          numberBathrooms.className = 'number_bathrooms';
          numberBathrooms.textContent = `${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}`;
          information.appendChild(maxGuest);
          information.appendChild(numberRooms);
          information.appendChild(numberBathrooms);

          const description = document.createElement('div');
          description.className = 'description';
          description.textContent = place.description;

          article.appendChild(titleBox);
          article.appendChild(information);
          article.appendChild(description);
          placesSection.appendChild(article);
      });
  })
  .catch(error => console.error('Error:', error));
});
