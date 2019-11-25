const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  coordinates: {
    type: [Number]
  },
  date: {
    type: Date
  }
});

module.exports = mongoose.model('Location', LocationSchema);
