const express = require('express');
const { HomefootPrint,MotorbikefootPrint,PublictransfootPrint,personalCarfootPrint } = require('../controllers/calculatorController');
const { validateToken } = require('../middleware/AuthMiddleware');
const router = express.Router();

//Define all the Routes
router.post('/home',validateToken,HomefootPrint);
router.post('/motor',validateToken,MotorbikefootPrint);
router.post('/publictrans',validateToken,PublictransfootPrint);
router.post('/perscar',validateToken,personalCarfootPrint);



module.exports =router;
