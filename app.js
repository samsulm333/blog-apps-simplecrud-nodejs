const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

//-------------------------CONNECT TO MONGO DB---------------------------
const dbURI = "mongodb://samsul:1234@localhost:27017/toko";
mongoose
  .connect(dbURI, {
    socketTimeoutMS: 0,
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//------------------------REGISTER VIEW ENGINE EJS------------------------
app.set("view engine", "ejs");

//-------------------------MIDDLEWARE STATIC FILE-------------------------
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//-------------------------------ROUTES-----------------------------------
app.get("/", (req, res) => {
  res.redirect("./blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//--------------------------------HOME------------------------------------
app.use("/blogs/", blogRoutes);

//------------------------------404 PAGE----------------------------------
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
