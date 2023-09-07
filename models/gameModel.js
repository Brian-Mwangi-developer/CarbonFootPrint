const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const gameSchema = new mongoose.Schema({

    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // If associating games with users
  });

//Export the model
module.exports = mongoose.model('Game', gameSchema);