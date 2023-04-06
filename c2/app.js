const express = require('express');
const mongoose = require('mongoose');
const blogController = require('./controllers/blogController');
const viewController = require('./controllers/viewController');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// importirame ejs engine
app.set('view engine', 'ejs');
// za da go koristime public folderot mora da iskoristime uste eden middleware
app.use(express.static('public'));

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

// OVIE RUTI SE ZA NASETO API
// so ovaa ruta sakame da ja zemime celata kolekcija
app.get('/api/v1/blogs', blogController.getAllBlogs);
// so ovaa ruta go zemame samo id-to
app.get('/api/v1/blogs/:id', blogController.getBlog);
// so ovaa ruta prakjame informacii vo serverot, vo ovaj slucaj kreirame blog
app.post('/api/v1/blogs', blogController.createBlog);
// so patch pravime update na blogot
app.patch('/api/v1/blogs/:id', blogController.updateBlog);
app.delete('/api/v1/blogs/:id', blogController.deleteBlog);

// definiranje na ruti za stranica
app.get('/blogs', viewController.getBlogView);
app.post('/blogs', viewController.createBlog);
app.post('/blogs/delete/:id', viewController.deleteBlog);


// vezba
app.get('/blogs/:id', viewController.getSingleBlog);

//1.
// Crud Operacii
// so HTTP metodite
// Create, Read, Update and Delete
// 2.
// Najcesto isprakjame data kako JSON objekt
// 3.
// apito e stateless

// res.status(200)

// 200 - Ok, nasiot request bil uspesen i naseto api ispratilo pobaranata data
// 201 - Kreiranje, nasiot request bil usepese i imame kreirano dokument na serverot
// 204 - Ok, samo sto serverot ne ni vrakja data


// 400 - Bad request - ova ni oznacuva deka request bil invalid  ili netocen ili defekten, so ova oznacuva deka ne e razbran requestod od serverot
// 401 - Unathorized - ova oznacuva deka userot ne e avtoriziran, nema pravo da go dobie toa sto go saka
// 403 - Forbbiden - serverot go razbral requestod, ama userot ne mu e dozvoleno da ima pristap do requestiraniot resource
// 404 - Not Found - serverot nemoza da go pronajde pobaraniot resurs
// 500 - Imame greska so serverot pri procesiranje na requestod

const port = 10000;

app.listen(port, err => {
  if (err) return console.log(err);
  return (`App started on port ${port}`);
});

