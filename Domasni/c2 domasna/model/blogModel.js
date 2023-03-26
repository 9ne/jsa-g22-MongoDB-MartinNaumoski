const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, 'Has to have a brand']
  },
  model: {
    type: String,
    required: [true, 'Has to have a model name']
  },
  reference: {
    type: String,
    required: [true, 'Has to have reference number']
  },
  movement: {
    type: String,
    required: [true, 'Has to have a type of movement']
  },
  caliber: {
    type: String
  },
  material: {
    type: String
  },
  availability: {
    type: Boolean,
    required: [true, 'Must know if its available']
  },
  year: {
    type: Number,
    required: [true, 'Has to have date of production']
  },
  price: {
    type: Number,
    required: [true, 'Has to have a price']
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Blog = mongoose.model('Rolex-Watche', blogSchema);

module.exports = Blog;