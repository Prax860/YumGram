const express = require('express');
const foodController = require('../controllers/food.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router  = express.Router();
const multer = require('multer');


const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory as Buffer objects
//to call this in postman  POST/api/food/
router.post('/', authMiddleware.authFoodPartnerMiddleware, upload.single('video'), foodController.createFood);





module.exports = router;