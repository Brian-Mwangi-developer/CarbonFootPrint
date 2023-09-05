const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var PublictransSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    bus:{
        type:Number,
        required:true,
    },
    Train:{
        type:Number,
        required:true,
    },
    Uber:{
        type:Number,
        required:true,
    },
    emission:{
        type:Number,
        defaultValue:0
    }
},{
    timestamps:true,
});

//Export the model
module.exports = mongoose.model('Publictrans', PublictransSchema);