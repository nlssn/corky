/* Corky - a simple message board
 * Written by Johannes Nilsson, 2020.
 */

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

// Connect to MongoDB
var DATABASE = process.env.MONGODB_URI || 'mongodb://localhost:27017/corky';
mongoose.connect(DATABASE, {useNewUrlParser: true, useUnifiedTopology: true}, function(err) {
   if(err) {
      console.log(err);
   }
});

// Import DB schema(s)
var Posts = require('./app/models/posts.js');

// Create new instance of Express
var app = express();

// Set up middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/api', function(req,res) {
   res.json({ message: 'Hello world!' });
});

app.get('/api/posts', function(req,res) {
   // Get all posts and res w posts as JSON
});

app.get('/api/post/:id', function(req,res) {
   // Get a single post (and the responses?)
});

app.post('/api/post', function(req,res) {
   // Add a new post.. or res w the error
});

app.put('/api/post/:id', function(req,res) {
   // Update the specified post.. or res w the error
});

app.delete('/api/post/:id', function(req,res) {
   // Remove the specified post.. or res w the error
});

// Start listening
var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
   console.log('Server listening on port: ' + PORT);
});