const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')


const getGoal = asyncHandler(async (req,res) => {
    const goal = await Goal.find({user: req.user.id})
    res.status(200).json(goal)
})



const setGoal = asyncHandler(async (req,res) => {
    if(!req.body.text){
        res.status(400).j
        throw new Error('Please add a text field')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})

const updateGoal = asyncHandler(async (req,res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }


    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updateGoal)
}
)
const deleteGoal = asyncHandler(async (req,res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }


    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await Goal.findByIdAndDelete(req.params.id)
    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal
}