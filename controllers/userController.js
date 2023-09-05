const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { generateToken } = require('../config/generateToken');
const bcrypt = require('bcrypt');

//Register a new User
const registerUser = asyncHandler(async (req, res) => {
    const {username,email,password,phoneNumber} = req.body;
    if(!username || !email || !password || !phoneNumber){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered!");
    }
    const newuser = await User.create(req.body)
    if(newuser) {
        res.status(201).json(newuser);
    }else{
        res.status(400);
        throw new Error("User data is not valid")
    }
});

const LoginUser = asyncHandler(async(req,res)=>{
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!")
    }
    //check if user exists 
    const findUser = await User.findOne({email});
    if(findUser && (await bcrypt.compare(password, findUser.password))){
        const token = generateToken(findUser?.id);
        res.status(200).json({ token})
    }else{
        res.status(401).json({message:"Authentication failed"});
    }
});


const updatedUser = asyncHandler(
    async (req, res) => {
        const { _id } = req.user;
        // validateMongoId(_id)
        try {
            const updatedUser = await User.findByIdAndUpdate(_id, {
                username: req?.body.username,
                password: req?.body.password,
                email: req?.body.email,
                phoneNumber: req?.body.phoneNumber,
            }, {
                new: true,
            });
            res.json(updatedUser);
        } catch (err) {
            throw new Error(err);
        }
    }
)


//Get all the users

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (err) {
        throw new Error(err)
    }
})

//get a single user
const getSingleUser = asyncHandler(
    async (req, res) => {
        const { id } = req.params;
        validateMongoId(id);
        try {
            const getaUser = await User.findById(id);
            res.json(getaUser);

        } catch (err) {
            throw new Error(err);
        }
    })

//.delete a user

const deleteSingleUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // validateMongoId(id)
    try {
        const deleteUser = await User.findByIdAndDelete(id);
        res.json(deleteUser);
    } catch (err) {
        throw new Error(err)
    }
})




module.exports ={registerUser,LoginUser,getAllUsers,getSingleUser,updatedUser,deleteSingleUser}