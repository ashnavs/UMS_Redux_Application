const asyncHandler = require('express-async-handler')


const getUser = asyncHandler(async (req,res) => {
    res.status(200).json({message:'Get user'})
})

const setUser = asyncHandler(async (req,res) => {
    if(!req.body.text){
        res.status(400).j
        throw new Error('Please add a text field')
    }
    res.status(200).json({ message: 'Set user'})
})

const updateUser = asyncHandler(async (req,res) => {
    res.status(200).json({ message: `Update user ${req.params.id}`})
}
)
const deleteUser = asyncHandler(async (req,res) => {
    res.status(200).json({ message: `Delete user ${req.params.id}`})
})

module.exports = {
    getUser,
    setUser,
    updateUser,
    deleteUser
}