//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

 const homeStartingContent = "";
const aboutContent =
  "Welcome to FIND TUTOR here the students  can find local tutors, online teachers, and teachers to help with tutoring, coaching, assignments, academic projects, and dissertations any subjects.";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const postSchema = {
  title: String,
  content: String
};


const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

Post.deleteOne({
  title: "Need help in Physics",
})
  .then(function () {
    console.log("Data deleted"); // Success
  })
  .catch(function (error) {
    console.log(error); // Failure
  });
app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content,
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
