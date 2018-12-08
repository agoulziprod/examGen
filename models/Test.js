const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TestSchema = new Schema({
  nom: {
    type: String,
    required: true
  },
  duree: {
    type: Number,
    required: true,
    min: 1,
    default:10
  },
  questions: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false
  },
  messageDebut: {
    type: String,
    required: true
  },
  messageFin: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('tests', TestSchema);