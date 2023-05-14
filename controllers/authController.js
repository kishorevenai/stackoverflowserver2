const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const users = require('../models/auth')
const mongoose = require('mongoose')

const signup = async (req,res) => {
    const { name, email, password } = req.body
    try {
        const existinguser = await users.findOne({email})
        if(existinguser)
            return res.status(401).json({'message':'User already Exists.'})
        const hashedPassword = await bcrypt.hash(password , 12);
        const newUser = await users.create({
            name,email,password:hashedPassword
        })
        const token = jwt.sign({email:newUser.email,id:newUser._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1h"})
        res.status(200).json({result: newUser,token})
    } catch (error) {
        res.status(500).json("Somenthing went wrong...")        
    }
}
const login = async (req,res) => {
    const { email , password } = req.body
    if(!email || !password) return res.status(400).json('username and password are required');
    try {
        const existinguser = await users.findOne({email}).lean();
        if(!existinguser) return res.json(401).json({message:"User dont Exists."})
        const isPassword = await bcrypt.compare(password,existinguser.password)        
        if(!isPassword){
             res.status(401).json({message:'invalid credentials'})
        }
        const token = jwt.sign(
            {email:existinguser.email,id:existinguser._id},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"1h"}
        )   
        const existinguserPIg = await users.findOne({email}).select('-password').lean();
        
        res.status(200).json({result:existinguserPIg,token})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}



module.exports = {signup , login }
