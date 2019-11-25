console.log('Geolocation Loaded...');

// Establish Websocket Connection
const socket = io.connect('http://localhost:5000');

// Send Location Data Every 3 Seconds
setInterval(function() {
  if (navigator.geolocation) {
    // Get Location Data
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      console.log(lat, lng);
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
