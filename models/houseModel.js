const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var houseSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
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
    },
    emission:{
        type:Number,
        required:true,
    }
});

//Export the model
module.exports = mongoose.model('House', houseSchema);