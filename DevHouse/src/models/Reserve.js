const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReserveSchema = new Schema({
  date: String,
  user: {

    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  house: {

    type: Schema.Types.ObjectId,
    ref: 'House',
  },



});

module.exports = mongoose.model('Reserve', ReserveSchema);