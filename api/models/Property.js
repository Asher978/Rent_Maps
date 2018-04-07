const mongoose = require('mongoose');
const { Schema } = mongoose;

const PropertySchema = new Schema({

  title: {
    type: String,
    required: true,
  },

  bedrooms: {
    type: Number,
    required: true,
  },

  rent: {
    type: Number,
    required: true,
  },

  pictures: [{
    type: String,
    required: false,
  }],

  address: {
    type: String,
    required: true,
  },

  coordinates: {
    type: [Number, Number],
    required: false,
  },

});

const Property = mongoose.model('Property', PropertySchema);
module.exports = Property;