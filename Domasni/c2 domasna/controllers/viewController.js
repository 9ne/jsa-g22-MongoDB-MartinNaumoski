const Blog = require('../model/blogModel');

const getWebsite = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).render('watches', {
      titleOfPage: 'Luxury Watches Rolex',
      blogs
    })
  } catch(err) {
    console.log(err);
    res.status(500).send('Error getting website');
  }
};

const getBlogView = async (req, res) => {

  try {
    const blogs = await Blog.find();
    res.status(200).render('rolexwatches', {
      titleOfPage: 'Luxury Watches',
      blogs
    });

  } catch(err) {
    res.status(500).send('Error creating blog post');
  }
};

const createBlog = async (req, res) => {

  try {
    console.log(req.body);
    await Blog.create(req.body);
    res.redirect('/watches/rolexwatches');
    
  } catch(err) {
    res.status(500).send(err);
  }
};

const deleteBlog = async (req, res) => { 
  
  try {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
    res.redirect('/watches/rolexwatches');

  } catch(err) {
    res.status(500).send('Error deleting blog post');
  }
};

const readMore = async (req, res) => { 

  try {
    const id = req.params.id;
    const blogs = await Blog.findById(id);
    res.status(200).render('watches', {
      titleOfPage: 'Luxury Watches Rolex',
      blogs: blogs
    });

  } catch(err) {
   console.log(err);
   res.status(500).send('Error getting the post'); 
  }
};

const updateBlog = async (req, res) => {

  try {
    const id = req.params.id;
    const blogs = await Blog.findByIdandUpdate(id);
    res.status(200).render('watches', {
      blogs: blogs
    });

  } catch(err) {
    console.log(err);
    res.status(500).send('Cannot update blog')
  }
}



module.exports = {
  getWebsite,
  getBlogView,
  createBlog,
  deleteBlog,
  readMore,
  updateBlog
}