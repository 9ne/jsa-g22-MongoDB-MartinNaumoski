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

exports.getBlog = async (req, res) => {
  
  try {
    // ova e query spored id
    const blog = await Blog.findByID(req.params.id);
    Blog.findOne({_id: req.params.id});

    // query spored naslov
    // const naslov = req.params.naslov;
    // const blog1 = await Blog.findOneO({ime: naslov});
    res.status(200).json({
      status: 'success',
      data : {
        blog
      }
    });

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
}; 

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });


    // const naslov = req.params.naslov;
    // const blog = await Blog.findOneAndUpdate({ime: naslov}, req.body);


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

exports.deleteBlog = async (req, res) => {
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

exports.getAllBlogs = async (req, res) => {
  try {
    // so ova gi dobivame site dokumenti od kolecijata

    //prv nacin
    // const blogs = await Blog.find(req.query);

    // 1. prvo pravime kopija od req.query
    let queryObj = { ...req.query };
    // 2. pravime array koj array ke gi izbrisi site parametri
    const excludeFields = ['page', 'sort'];
    // 3. gi brisime site parametri koi se vo array-ot excludeFields
    excludeFields.forEach((el) => {delete queryObjp[el]});

    // const blogs = await Blog.find(queryObj);

    // const query = Blog.find(queryObj);
    // const blogs = await query;

    // 4. implementacija na query so koe query mozeme da koristime gt, gte, lt, lte  
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // 5. prebaruvame so objektot sto e isfiltriran kade sto na sekoe gt gte lt lte imame dodadeno dolar
     let query = Blog.find(JSON.parse(queryString));
     
    // implementacija na sort
    if (req.query.sort) {
      query = query.sort(req.query.sort);
    }
    // 6. i na kraj go egzekutirame query-to
    const blogs = await query;

    // vtor nacin
    // const blogs = await Blog.find()
    //   .where('ocenka')
    //   .equals(3)
    //   .where('cena')
    //   .equals(300);

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