const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const foodpartnerModel = require('../models/foodpartner.model');
const jwt = require('jsonwebtoken');
async function registerUser(req, res) {
    const { username, email, password } = req.body;
    const  isUserAlreadyExists  = await userModel.findOne({ email });
    if (isUserAlreadyExists) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const hashedpassword = password ? require('bcrypt').hashSync(password, 10) : undefined;
const user = await userModel.create({
    username,
    email,
    password: hashedpassword
})
const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
res.cookie('token', token);
res.status(201).json({ message: 'User registered successfully', user: { _id: user._id }, username: user.username, email: user.email }); //dont send password 

}
async function loginUser(req, res) {
    const {email,password} = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' }); //inorder to delay the bruteforce or dictionary attacks done by the someone, it delays it .
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token);
    res.status(200).json({ message: 'User logged in successfully', user: { _id: user._id }, username: user.username, email: user.email });
}

function logoutUser(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: 'User logged out successfully' });
}



async function registerFoodPartner(req, res) {
    const { name, email, password } = req.body;
    const isFoodPartnerExists = await foodpartnerModel.findOne({ email });
    if (isFoodPartnerExists) {
        return res.status(400).json({ message: 'Food partner already exists' });
    }
    const hashedPassword = password ? require('bcrypt').hashSync(password, 10) : undefined;
    const foodPartner = await foodpartnerModel.create({
        name,
        email,
        password: hashedPassword
    });
    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);
    res.cookie('token', token);
    res.status(201).json({ message: 'Food partner registered successfully', foodPartner: { _id: foodPartner._id }, name: foodPartner.name, email: foodPartner.email });
}

async function loginFoodPartner(req, res) {
    const { email, password } = req.body;
    const foodPartner = await foodpartnerModel.findOne({ email });
    if (!foodPartner) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);
    res.cookie('token', token);
    res.status(200).json({ message: 'Food partner logged in successfully', foodPartner: { _id: foodPartner._id }, name: foodPartner.name, email: foodPartner.email });
}

function logoutFoodPartner(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Food partner logged out successfully' });
}

module.exports = { registerUser, loginUser, logoutUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner };