const Blog = require('../model/blogModel');

const getAllBlogs = async (req, res) => {

  try {
    let queryObj = { ...req.query };
    const excludeFields = ['page', 'sort'];
    excludeFields.forEach((el) => {delete queryObj[el]});

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Blog.find(JSON.parse(queryString));

    if (req.query.sort) {
      query = query.sort(req.query.sort);
    }

    const blogs = await query;

    res.status(200).json({
      status: 'succces',
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

const getBlog = async (req, res) => {

  try {
    const blog = await Blog.findById(req.params.id);
    Blog.findOne({_id: req.params.id});

    res.status(200).json({
      status: 'success',
      data: {
        blog
      }
    });
  } catch (err) {
    res.satus(400).json({
      status: 'fail',
      message: err
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        blog
      }
    });

  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

const deleteBlog = async (req, res) => {
  
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });

  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};


module.exports = {
  getAllBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog
}