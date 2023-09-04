const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var PublictransSchema = new mongoose.Schema({
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
    }
},{
    timestamps:true,
});

//Export the model
module.exports = mongoose.model('Publictrans', PublictransSchema);