const express = require('express');
const foodController = require('../controllers/food.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router  = express.Router();
 //to call this in postman  POST/api/food/
router.post('/', authMiddleware.authFoodPartnerMiddleware, foodController.createFood);





module.exports = router;