const express = require('express');
const socket = require('socket.io');
const colors = require('colors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Location Model
const Location = require('./models/Location');

// Load Environment Variables
dotenv.config({ path: './config/config.env' });

// Connect to Database
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

connectDB();

// Initialize Express Application
const app = express();

// Establish Port
const PORT = process.env.PORT || 5000;

// Listen for server connections
const server = app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}`);
});

// Static Files
app.use(express.static('public'));

// Socket Setup
const io = socket(server);

// Listen for socket connections
io.on('connection', socket => {
  console.log(`Socket connection established (${socket.id})`.blue);

  // Location
  socket.on('location', position => {
    const lat = position.lat;
    const lng = position.lng;
    const date = Date.now();
    console.log(`lat: ${lat}, lng: ${lng}`);
    try {
      Location.create({
        coordinates: [lat, lng],
        date
      });

      socket.emit('location', {
        lat,
        lng,
        date,
        message: 'Successfully recorded location data'
      });
      console.log('Log emitted from server to client');
    } catch (error) {
      console.log('An error occurred');
      socket.emit('error', {
        message: 'A server error has occurred'
      });
    }
  });
});
