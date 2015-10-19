'use strict';

let mongoose = require('mongoose');

let schema = new mongoose.Schema({
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  postDate: { type: Date, index: true, default: Date.now },
  content: String,
  tags: [String],
  share: {},
  comments: [{}],
  revision: [{}],
  media: [{
  	name: String,
  	height: Number,
  	width: Number,
    fileType: String,
    urlEncodedName: String,
    amazonFolder: String,
    s3Url: String
  }]
});

mongoose.model('Article', schema);
