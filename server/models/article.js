/**
 * Defining a Article Model in mongoose
 *
 */
var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
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
//	nonexistent) the 'Article' collection in the MongoDB database
Topic = mongoose.model('Article', ArticleSchema);
