const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var motorbikeSchema = new mongoose.Schema({
    Mileage:{
        type:String,
        required:true,
    },
    engineSize:{
        type:Number,
        required:true,
    }
},{
    timestamps:true,
});

//Export the model
module.exports = mongoose.model('Motorbike', motorbikeSchema);