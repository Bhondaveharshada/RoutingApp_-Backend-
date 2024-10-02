require('dotenv').config()
const mongoose = require('mongoose')
const RegisterUser = require('../models/RegisterSchema')
const {model} = require("mongoose");
const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleUserLogin = async (req,res,next)=>{
    console.log(req.body.email);
    
   await RegisterUser.findOne({email:req.body.email})
    .exec()
    .then(user=>{
        if(!user.email){
            return res.status(401).json({
                message:"email not Found"
            });
        }else if(!user.password){
            return res.status(401).json({
                message:"invalid password"
            })
        }
        console.log(req.body.password);
        
        bcrypt.compare(req.body.password, user.password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    meassage_pass:"Authentication failed..plz enter valid data"
                });
            }
            if(result){
                const token = jwt.sign({
                    email:user.email,
                    userId:user._id
                },
                process.env.JWT_key,
                {
                    expiresIn:'1h'
                }
            );
            console.log(token);
              return res.status(200).json({
                message:"Auth Successfull",
                token:token
              })
            }
            res.status(401).json({
                meassage:"Incorrect Password"
            })
        })
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        })
    })
}

module.exports ={
    handleUserLogin
}