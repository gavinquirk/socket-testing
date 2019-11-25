console.log('Geolocation Loaded...');

const list = document.getElementById('list');

let received = [];
let counter = 0;

// Establish Websocket Connection
const socket = io.connect('http://localhost:5000');

// Send Location Data Every 3 Seconds
setInterval(function() {
  if (navigator.geolocation) {
    // Get Location Data
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // console.log(lat, lng);
      // Emit Location Data
      socket.emit('location', {
        lat,
        lng
      });
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}, 3000);

socket.on('location', data => {
  console.log(data);
  counter++;
  // received.unshift(data);
  // Populate page with location data
  const markup = `
    <div class="location">
        <h4>Location ${counter}</h4>
        <p class="location">${data.lat}</p>
        <p class="bio">${data.lng}</p>
    </div>
    <hr/>
    `;
  document.body.innerHTML += markup;
});
