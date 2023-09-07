const express = require('express');
const router = express.Router();
const {registerUser,LoginUser,getAllUsers,getSingleUser,updatedUser,deleteSingleUser, retrieveToken} =require('../controllers/userController');
const { validateToken } = require('../middleware/AuthMiddleware');

router.get('/singleuser',validateToken,getSingleUser);
router.post('/register',registerUser);
router.post('/login',LoginUser);
router.get('/retrieve-token',retrieveToken);


module.exports = router;