const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var houseSchema = new mongoose.Schema({
    Electricity:{
        type:String,
        required:true,
    },
    Cookingoil:{
        type:Number,
        required:true,
    },
    CookingGas:{
        type:Number,
        required:true,
    }
});

//Export the model
module.exports = mongoose.model('House', houseSchema);