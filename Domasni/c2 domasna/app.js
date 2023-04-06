const express = require('express');
const mongoose = require('mongoose');
const blogController = require('./controllers/blogController');
const viewController = require('./controllers/viewController');
const url = require('./URL');


const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

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
    return ('fail to connect...');
  }
};

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
app.get('/api/v1/watches/:id', blogController.getBlog);
app.patch('/api/v1/watches/:id', blogController.updateBlog);
app.delete('/api/v1/watches/:id', blogController.deleteBlog);

// routes for the website
app.get('/watches', viewController.getWebsite);
app.get('/watches/rolexwatches', viewController.getBlogView);
app.post('/watches/rolexwatches', viewController.createBlog);
app.post('/watches/rolexwatches/delete/:id', viewController.deleteBlog);
app.get('/watches/rolexwatches/:id', viewController.readMore);
app.post('/watches/rolexwatches/:id', viewController.updateBlog);

const port = 10000;

app.listen(port, err => {
  if (err) return console.log(err);
  return (`App started on port ${port}`);
});