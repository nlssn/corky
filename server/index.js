/* Corky - a simple message board
 * Written by Johannes Nilsson, 2020.
 */

var express = require('express');
var methodOverride = require('method-override');
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
app.use(methodOverride('_method'));

// Routes
app.get('/api', function(req,res) {
   res.json({ message: 'Hello world!' });
});

app.get('/api/posts', function(req,res) {
   Posts.find(function(err,Posts) {
      if(err) {
         res.json({message: err.message});
         return;
      }

      res.json(Posts);
   });
});

app.get('/api/post/:id', function(req,res) {
   var getId = req.params.id;

   Posts.findOne({_id: getId}, function(err, Posts) {
      if(err) {
         res.json({message: err.message});
         return;
      }

      res.json(Posts);
   });
});

app.post('/api/post', function(req,res) {
   var p = req.body;
   var post = new Posts();

   post.username = p.username;
   post.subject = p.subject;
   post.message = p.message;
   post.imageURL = p.imageURL;

   post.save(function(err) {
      if(err) {
         res.json({message: err.message});
         return;
      }

      res.redirect('/');
   });
});

app.put('/api/post/:id', function(req,res) {
   Posts.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true, useFindAndModify:false},
      function(err,Posts){
         if(err) {
            res.json({message: err.message});
            return;
         }
   
         res.redirect('/');
      });
});

app.delete('/api/post/:id', function(req,res) {
   var delId = req.params.id;
   
   Posts.deleteOne({_id: delId}, function(err, Posts) {
      if(err) {
         res.json({message: err.message});
         return;
      }

      res.json({ message: "Deleted post with ID: " + deleteId });
   });
});

// Start listening
var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
   console.log('Server listening on port: ' + PORT);
});