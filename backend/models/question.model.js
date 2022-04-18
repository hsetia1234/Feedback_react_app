const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  surveyname:{ type: String, required: true },
  questiontext: { type: String, required: true },
  scaletype:{ type: String, required: true },
  varname: { type: String, required: true },
  options: { type: Array, required: true }

}, {
  timestamps: true,
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;