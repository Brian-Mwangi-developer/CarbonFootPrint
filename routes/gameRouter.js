// routes/gameRoute.js
const express = require('express');
const router = express.Router();
const { validateToken } = require('../middleware/AuthMiddleware');
const { addPoints } = require('../controllers/gameController');


router.post('/add-points',validateToken,addPoints);



module.exports = router;
