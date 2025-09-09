const foodModel = require('../models/food.model');

async function createFood(req, res){
    console.log(req.foodPartner);
    console.log("food item created") //logged in food partner details
}

module.exports = {
    createFood
};