const foodpartnerModel = require('../models/foodpartner.model');
const jwt = require('jsonwebtoken');

async function authFoodPartnerMiddleware(req, res, next) { //always 3 params in middleware
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.foodPartner = await foodpartnerModel.findById(decoded.id);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}
module.exports = authFoodPartnerMiddleware;