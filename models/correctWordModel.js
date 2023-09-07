const mongoose = require('mongoose');

const correctWordSchema = new mongoose.Schema({
  word: String,
});

module.exports= mongoose.model('CorrectWord', correctWordSchema);
