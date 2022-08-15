const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    username: { 
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
   },
   email: {
        type: String,
        required: true,
        unique: true
   },
   name: {
    type: String,
    require: true
   },
   height: {
    type: Number,
    required: true
   },
   weight:{
    type: Number,
    required: true
   },
   inspiration: {
    type: String
   },
   goal_weight: {
    type: Number ,
    default: 0
    // required: true
   },
   weekly_goal: {
    type: Number,
   }

});
const userModel = new mongoose.model('user',userSchema);

module.exports = userModel;