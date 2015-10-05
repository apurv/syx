/**
 * Schema Definitions
 *
 */
var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  postDate: { type: Date, index: true, default: Date.now },
  content: String,
  tags: [String],
  share: {},
  comments: [{}],
  rev: [{}],
  media: {}
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Post' collection in the MongoDB database
Topic = mongoose.model('Post', PostSchema);
