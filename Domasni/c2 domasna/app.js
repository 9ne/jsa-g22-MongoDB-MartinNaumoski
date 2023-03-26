const express = require('express');
const mongoose = require('mongoose');
const blogController = require('./controllers/blogController');
const url = require('./URL');


const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Mongo db connected...');
  } catch (err) {
    console.log(err);
    return ('uspesno se konektiravme');
  }
}

connectDB();

// mongoose.connect(url,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     }
//   ).then(() => {
//     console.log('Uspesno se povrzavme');
//   }).catch((err) => {
//     console.log(err);
//   });

app.get('/api/v1/watches', blogController.getAllBlogs);
app.post('/api/v1/watches', blogController.createBlog);


const port = 10000;

app.listen(port, err => {
  if (err) return console.log(err);
  return (`App started on port ${port}`);
});