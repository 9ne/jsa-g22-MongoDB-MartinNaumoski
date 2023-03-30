const express = require('express');
const mongoose = require('mongoose');
const blogController = require('./controllers/blogController');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

mongoose.connect('mongodb+srv://naymoskim:Freddyv.op.12@cluster0.1hmrb2l.mongodb.net/vezba1?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  ).then(() => {
    console.log('Uspesno se povrzavme');
  }).catch((err) => {
    console.log(err);
  });


// so ovaa ruta sakame da ja zemime celata kolekcija
app.get('/api/v1/blogs', blogController.getAllBlogs);
// so ovaa ruta go zemame samo id-to
app.get('/api/v1/blogs/:id', blogController.getBlog);
// so ovaa ruta prakjame informacii vo serverot, vo ovaj slucaj kreirame blog
app.post('/api/v1/blogs', blogController.createBlog);
// so patch pravime update na blogot
app.patch('/api/v1/blogs/:id', blogController.updateBlog);
app.delete('/api/v1/blogs/:id', blogController.deleteBlog);

const port = 10000;

app.listen(port, err => {
  if (err) return console.log(err);
  return (`App started on port ${port}`);
});

