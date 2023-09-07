const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Userschema =  mongoose.Schema({
    username:{
        type:String,
        required:[true,"please Add your Username"],
    },
    email:{
        type:String,
        required:[true,"Please Add user Email Address"],
        unique:[true,"Email Address already Taken"],
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:[true,"Please Add User Password"],
    },
    points:{
        type:Number,
        default:0
    }
},{
    timestamps:true,
});

Userschema.pre('save',async function(next){
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password,salt)
})

module.exports = mongoose.model("User", Userschema);