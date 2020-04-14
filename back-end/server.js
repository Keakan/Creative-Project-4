const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/MarvelMovies', {
  useNewUrlParser: true
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for posts in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  title: String,
  path: String,
  comment: String,
  author: String,
});

// Create a model for posts in the museum.
const Post = mongoose.model('Post', itemSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a new post in the museum: takes a title and a path to an image.
app.post('/api/posts', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    path: req.body.path,
    comment: req.body.comment,
    author: req.body.author,
  });
  try {
    await post.save();
    res.send(post);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the posts in the museum.
app.delete('/api/posts/:id', async (req, res) => {
  try {
    await Post.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the posts in the museum.
app.put('/api/posts/:id', async (req, res) => {
  try {
    let post = await Post.findOne({
      _id: req.params.id
    });
    post.title = req.body.title;
    post.comment = req.body.comment;
    post.author = req.body.author;
    await post.save();
    res.sendStatus(200);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the posts in the museum.
app.get('/api/posts', async (req, res) => {
  try {
    let posts = await Post.find();
    res.send(posts);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
