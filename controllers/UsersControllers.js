const mongoose = require('mongoose')
const Users = require('../models/auth')

const getAllUsers = async(req,res) => {
  try {    
    const allUsers = await Users.find().select(' -password ').lean() ;    
    res.status(200).json(allUsers)
  } catch (error) {
    res.status(404).json({message:error.message});
  }
}

const updateProfile = async(req,res) => {
  console.log(req.params)
  console.log(req.body)
  const { id:_id } = req.params;
  const { name , about , tags } = req.body
  if(!mongoose.Types.ObjectId.isValid(_id))
     return res.status(404).send('question unavilable...')
  try {
    const updateProfile = await Users.findByIdAndUpdate(_id,{$set:{'name':name ,'about':about,'tags':tags}},{new:true})
    res.status(200).json(updateProfile)
  } catch (error) {
    res.status(404).json({message:error.message})
  }
}

module.exports = {getAllUsers,updateProfile}








