const Blog = require('../model/blogModel');

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      status: 'success',
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

const createBlog = async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        blog: newBlog
      }
    });
  } catch (err) {
    res.status(400).json({
      satus: 'fail',
      message: err
    });
  }
};

module.exports = {
  getAllBlogs,
  createBlog
}