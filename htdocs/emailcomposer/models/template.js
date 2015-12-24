var mongoose = require('mongoose');

var templateSchema = new mongoose.Schema({
  id: String,
  list: Array,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('template', templateSchema);
