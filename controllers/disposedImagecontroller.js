const asyncHandler = require('express-async-handler');
const DisposedProd = require('../models/Disposedwastemodel');


const DisposeItem = asyncHandler(async(req,res)=>{
    const {imageLink,quantity,description} = req.body;
    if (!imageLink || !quantity || !description) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    try{
      if(req.user) { 
        const newProduct =await DisposedProd.create({
            user_id: req.user.id,
            imageLink,
            quantity,
            description,
        });
        // Save the image to the database
        await newProduct.save();
        res.status(201).json(newProduct);
    }else{
        res.status(401);
        throw new Error("User is not authorized or token is missing in request");
    }
    
    }catch(error){
        throw new Error("Error Saving disposed Product Details");
    }
    
})

module.exports = {DisposeItem}