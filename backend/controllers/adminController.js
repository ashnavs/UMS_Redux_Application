const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')


//Register Login
const registerAdmin = asyncHandler(async (req,res) => {
    const { name,email,password } = req.body;
    console.log(name,email,password);
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check if user exist
    const adminExists = await Admin.findOne({email})

    if(adminExists){
        res.status(400)
        throw new Error('Admin already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //create user
    const admin = await Admin.create({
        name,
        email,
        password:hashedPassword
    })

    if(admin){
        res.status(201).json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})


//Admin Login
const adminLogin = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;

    const admin = await Admin.findOne({email: email})
    console.log(admin,'admincontroller');

    if(admin && (await bcrypt.compare(password, admin.password))){
        res.json({
            _id:admin.id,
            name:admin.name,
            email:admin.email,
            token: generateToken(admin._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})

const generateToken = (id) => {
    return jwt.sign({ id},process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}

module.exports = {
    adminLogin,
    registerAdmin
}