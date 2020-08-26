// DB schema for posts
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postsSchema = new Schema({
   username: {
      type: String,
      required: [true, "A username is required"]
   },
   subject: {
      type: String,
      required: [true, "A subject is required"]
   },
   message: {
      type: String,
      required: [true, "A message is required"],
      maxlength: 500
   },
   imageURL: String
});

module.exports = mongoose.model('Posts', postsSchema);