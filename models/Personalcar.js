const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var personalCarSchema = new mongoose.Schema({
    Mileage:{
        type:String,
        required:true,
    },
    fuel:{
        type:String,
        enum:["diesel","petrol"],
        required:true,
    },
    engineSize:{
        type:Number,
        required:true,
    }
});

//Export the model
module.exports = mongoose.model('personalCar', personalCarSchema);