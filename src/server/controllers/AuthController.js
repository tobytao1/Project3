const User = require("../models.js/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const register = (req,res) => {
    bcrypt.hash(req.body.password, 10, function(err,hashedPass) {
        if(err) {
            res.json({
                error:err
            })
        }
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
        })
    
        user.save()
        .then(user => {
            res.json({
                message:"User Added Successfully!"
            })
        })
        .catch(error => {
            res.json({
                message: "Error Occured!"
            })
        }) 
    })
}

const login = (req,res,next) => {
    let userName = req.body.name;
    let password = req.body.password;
    User.findOne({name:userName})
    .then(user => {
        if(user && password == user.password){
            res.json({
                message: 'Login Successful!',
                authorized: true
            })
        }else{
            res.json({
                message: 'Either userName or password not match!'
            })
        }
    })
}

module.exports = {
    register,
    login
}