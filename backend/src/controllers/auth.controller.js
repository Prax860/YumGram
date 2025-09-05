const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
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


module.exports = { registerUser, loginUser };