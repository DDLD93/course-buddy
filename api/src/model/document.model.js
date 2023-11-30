const mongoose = require('mongoose');

const uploaderSchema = new mongoose.Schema({
  name: String,
  email: String
});

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  authors: [{
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    affiliation: String
  }],
  publicationDate: {
    type: Date,
    default: Date.now
  },
  abstract: String,
  keywords: [String],
  fileURL: String,
  citation: {
    type: String,
    default: ''
  },
  references: [{
    title: String,
    url: String
  }],
  uploader: uploaderSchema,
  // You can add more fields as needed
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
