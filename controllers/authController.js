const express = require('express');
const User = require('../models/userModel');

const bcrypt = require('bcrypt');


const signIn = async (req,res, next) => {
    const {password,account} = req.body;
    const user = await User.findOne({
        $or: [{username: account},{email: account}]
    }).select("+password");

    if (user) {
        bcrypt.compare(password, user.password, function (err,result){
            if (result) {
                req.session.user_id = user.user_id;                                         
                // console.log(req.session.user_id)
                res.send({
                    id: user.id,
                    name: user.name,
                    username: user.username
                });
            } else {
                res.status(401).send('Password is incorrect')
            }
        });
    } else {
        res.status(401).send('Username or Email is not mathch')

    }
    
}


const signOut = async (req,res,next) => {
    req.session.destroy();
    res.send('Success')
};


module.exports = {
    signIn,
    signOut
}