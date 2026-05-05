const User = require("../models/User");
const jwt = require("jsonwebtoken");

// generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// registerUser
exports.registerUser = async (req, res) => {
    if(!req.body){
           return res
            .status(400)
            .json({ message: "Please provide name, email and password" });
    
    }
    const { fullname: name, email, password, profileImageUrl } = req.body;
               
    // validation
    if (!name || !email || !password) {
        return res
            .status(400)
            .json({ message: "Please provide name, email and password" });
    }

    try {
        // check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // create new user
        const newUser = await User.create({
            name,
            email,
            password,
            profileImageUrl,
        });

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            profileImageUrl: newUser.profileImageUrl,
            token: generateToken(newUser._id),
        });

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// loginUser
exports.loginUser = async (req, res) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"Please provide email and password"});
    }

    try{
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid email or password"});
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid email or password"});
        }
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// getUserInfo
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user info:", error);
        res.status(500).json({ message: "Server error" });
    } 
};