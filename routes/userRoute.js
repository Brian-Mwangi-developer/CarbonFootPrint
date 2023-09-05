const express = require('express');
const router = express.Router();
const {registerUser,LoginUser,getAllUsers,getSingleUser,updatedUser,deleteSingleUser} =require('../controllers/userController');


router.post('/register',registerUser);
router.post('/login',LoginUser);

module.exports = router;