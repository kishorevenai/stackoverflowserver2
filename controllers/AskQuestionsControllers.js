const Questions = require("../models/Questions");

const mongoose = require('mongoose')

const AskQuestions = async (req, res) => {
  const { questionTitle, questionBody, questionTags, userNumber } = req.body;
  // const postQuestionData = req.body
  // console.log(questionBody,questionTags,questionTitle)
  // const postQuestion = new Questions({...postQuestionData,userNumber:req.userNumber})
  // const user = localStorage.getItem('authuser').result.name
  // console.log("------------------------------------->",user)
  try {
    const result = await Questions.create({
      questionTitle,
      questionBody,
      questionTags,
      userNumber,
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(409).json("Couldn't post a new Question");
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questionList = await Questions.find().lean();
    res.status(200).json(questionList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateVotes = async (req,res) => {
  try {
    const { id:_id } = req.params;
    const { value , userNumber } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id))
       return res.status(404).send('question unavilable...')
    const result = await Questions.findById({_id}).exec();
    console.log(result)
    if(!result) return res.status(400).json('No User Found...')
    const upIndex = result.upVote.find(id => id === userNumber)
    const downIndex = result.downVote.find(id => id === userNumber)

    if(value === 'upVote'){
      if(downIndex){
        const filtered = result.downVote.filter(id => id !== userNumber)
        // result.downVote = result.downVote.filter(id => id !== userNumber)
        result.downVote = filtered
      }
      if(!upIndex){
        result.upVote.push(userNumber)
      }
      else{
        result.upVote = result.upVote.filter(id !== userNumber)
      }
    }
    else if(value === 'downVote'){
      if(upIndex){
        result.upVote = result.upVote.filter(id => id !== userNumber)
      }
      if(!downIndex){
        result.downVote.push(userNumber)
      }
      else{
        result.downVote = result.downVote.filter(id !== userNumber)
      }
    }
    const final = await Questions.findByIdAndUpdate(_id , result);          
    res.status(200).json(final)
  } catch (error) {
    return res.status(500).json({message:'server error asdasd'})
  }
}
module.exports = { AskQuestions, getAllQuestions , updateVotes };
