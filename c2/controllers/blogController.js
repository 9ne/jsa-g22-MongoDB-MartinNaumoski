const Blog = require('../model/blogModel');

exports.createBlog = async (req, res) => {
  // console.log(req.body);
  try {
      // stara verzija
  // const newBlog = await new Blog(req.body);
  // await newBlog.save();
  const newBlog = await Blog.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      blog: newBlog
    }
  });

  } catch (err) {
    res.status(400).json({
      statuis: 'fail',
      message: err
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    // so ova gi dobivame site dokumenti od kolecijata
    const blogs = await Blog.find();
    res.status(200).json({
      status: 'sucess',
      data: {
        blogs: blogs
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
}; 

exports.getBlog = async (req, res) => {}; 
exports.updateBlog = async (req, res) => {}; 
exports.deleteBlog = async (req, res) => {}; 