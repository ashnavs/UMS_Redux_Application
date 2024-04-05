const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { admin } = require('../routes/adminRoute')


const loginAdmin = asyncHandler(async (req,res) => {
    const {email,password} = req.body;
    
    //check for user email
    const admin = await User.findOne({email , isAdmin:true})

    if(admin && (await bcrypt.compare(password, admin.password))){
        res.json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            isAdmin:true,
            token: generateToken(admin._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

module.exports = {
    loginAdmin
}