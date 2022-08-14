const User =require('../models/userModel')
const { v4: uuidv4 } = require("uuid");


const createUser = async (req,res,next) => {
    const newUser = new User({user_id: uuidv4(),...req.body})
    const validiateResult = newUser.validateSync();
    if (validiateResult){
        return res.status(400).send(validiateResult)    
    }
    await newUser.save();
    res.send(newUser);
}

const getUserById = async (req,res,next) => {
    const {user_id} = req.params
    const user = await User.findOne({user_id})
    res.send(user);
}
module.exports = {
    getUserById,
    createUser
}