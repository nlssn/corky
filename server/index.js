/* Corky - a simple message board
 * Written by Johannes Nilsson, 2020.
 */

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

// Set up middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

// Start listening
var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
   console.log('Server listening on port: ' + PORT);
});