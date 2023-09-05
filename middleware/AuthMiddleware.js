const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1];
            try{
                if(token){//check if token then validate token and then allow to search for a user
                    const decoded = jwt.verify(token,process.env.JWT_SECRET);
                    const user = await User.findById(decoded?.id);
                    req.user = user;
                    next();
                    
                }

            }catch(error){
                throw new Error("Not Authoried token expired,Please Login Again");
            }
        }else{
            throw new Error ("There is no token Attached")
    }
})

module.exports = { validateToken }