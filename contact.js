const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  facebookUsername: String,
  instagramUsername: String,
});

module.exports = mongoose.model('Contact', contactSchema);