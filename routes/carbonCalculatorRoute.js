const express = require('express');
const { HomefootPrint,MotorbikefootPrint,PublictransfootPrint,personalCarfootPrint } = require('../controllers/calculatorController');
const router = express.Router();

//Define all the Routes
router.post('/home',HomefootPrint);
router.post('/motor',MotorbikefootPrint);
router.post('/publictrans',PublictransfootPrint);
router.post('/perscar',personalCarfootPrint);



module.exports =router;
