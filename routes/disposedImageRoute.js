const express = require('express');
const router = express.Router();
const { DisposeItem } = require('../controllers/disposedImagecontroller');
const { validateToken } = require('../middleware/AuthMiddleware');

router.post('/disposed',validateToken,DisposeItem)


module.exports = router;