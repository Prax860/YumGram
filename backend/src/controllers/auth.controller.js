const userModel = require('../models/user.model');
async function registerUser(req, res) {
    const { username, email, password } = req.body;
    const  isUserAlreadyExists  = await userModel.findOne({ email });
    if (isUserAlreadyExists) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new userModel({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
    res.status(500).json({ message: 'Internal server error' });
    res.json({ message: 'User registered successfully' });
}
   