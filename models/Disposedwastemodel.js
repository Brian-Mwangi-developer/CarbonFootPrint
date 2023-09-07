const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var DisposedProdSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    imageLink:{
        type:String,
        required:[true,"Provide Image"],
    },
    quantity:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
    },
    points:{
        type:Number,
        defaultValue:0
    }
});

//Export the model
module.exports = mongoose.model('DisposedProd', DisposedProdSchema);