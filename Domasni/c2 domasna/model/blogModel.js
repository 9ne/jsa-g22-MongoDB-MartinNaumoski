const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  model: {
    type: String,
  },
  reference: {
    type: String,
  },
  movement: {
    type: String,
  },
  caliber: {
    type: String
  },
  material: {
    type: String
  },
  availability: {
    type: Boolean,
    default: true
  },
  date: {
    type: Number,
  },
  price: {
    type: Number,
  },
  image: {
    type: String
  },
  dateAdd: {
    type: Date,
    default: Date.now()
  }
});

const Blog = mongoose.model('Rolex-Watche', blogSchema);

module.exports = Blog;