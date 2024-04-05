const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { user } = require('../routes/userRoutes')

// post /api/users/register
const registerUser = asyncHandler(async (req,res) => {
    console.log("got it");
    const { name,email,password } = req.body;
    console.log(name,email,password);
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check if user exist
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //create user
    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// post /api/users/login
const loginUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body;
    
    //check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const getMe = asyncHandler(async (req,res) => {
    const { email,name } = req.body
    console.log(email,name);
    const user = await User.findById(req.params.id)
    console.log("token", req.token);
    if(!user){
        res.status(400).json({message: 'User not found'})
    }
    const updateUser = await User.findByIdAndUpdate(req.params.id , req.body)
    res.status(200).json(updateUser)
})

const generateToken = (id) => {
    return jwt.sign({ id},process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}