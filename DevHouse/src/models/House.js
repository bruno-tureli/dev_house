const mongoose = require('mongoose');

const { Schema } = mongoose;

const HouseSchema = new Schema({
  thumbnail: String,
  description: String,
  price: Number,
  location: String,
  status: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('House', HouseSchema);