const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const responseSchema = new Schema({
  username:{ type: String, required: true },
  email:{type: String, required: true},
  userresponse: { type: Array, required: true },
  }, {
  timestamps: true,
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;