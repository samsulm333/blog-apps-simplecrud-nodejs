const Blog = require("../models/blog");

//----------------------------REDIRECT TO HOME---------------------------
const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

//-----------------------------BLOG DETAIL------------------------------
const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      res.ststus(404).render("404", { title: "Blog Not Found" });
    });
};

//-----------------------------CREATE BLOG---------------------------------
const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create a New Blog" });
};

//------------------------SUBMIT FORM CREATE BLOG---------------------------
const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

//-------------------------------DELETE BLOG-------------------------------
const blog_delete = (req, res) => {
  const id = req.params.id;

  Blog.findOneAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
