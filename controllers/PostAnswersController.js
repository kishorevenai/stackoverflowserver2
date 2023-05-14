const mongoose = require("mongoose");
const Questions = require("../models/Questions");

const postAnswerController = async (req, res) => {  
  const { id: _id } = req.params;
  const { noOfAnswer, answerBody, userAnswered, userId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("question unavilable...");
  updateNoOfQuestions(_id, noOfAnswer);
  try {
    const updatesQuestion = await Questions.findByIdAndUpdate(_id, {
      $addToSet: { answer: [{ answerBody, userAnswered, userId }] },
    });
    res.status(200).json(updatesQuestion);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateNoOfQuestions = async (_id, noOfAnswer) => {
  try {
    const user = await Questions.findById(_id).exec();
    user.noOfAnswer = noOfAnswer;
    await user.save();
    // await Questions.findByIdAndUpdate(_id,{$set: {'noOfAnswer':noOfAnswer}})
  } catch (error) {
    console.log(error.message);
  }
};

const deleteAnswerController = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("question unavilable....");
  try {
    await Questions.findByIdAndDelete(_id);
    res.status(200).json({ message: "successfully deleted..." });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const deleteSingleAnswer = async (req, res) => {  
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("question unavilable....");
  const { answerId, noOfAnswer } = req.body;
  if (!mongoose.Types.ObjectId.isValid(answerId))
    return res.status(404).send("answer unavilable....");
  try {
    await updateNoOfQuestions(_id,noOfAnswer)
    await Questions.updateOne({_id},{$pull: {'answer':{_id:answerId }}})  
    const result = await Questions.findOne({_id}).exec();
    res.status(200).json(result)
  } catch (error) {
    res.status(200).json(error.message);
  }
};

module.exports = { postAnswerController, deleteAnswerController ,deleteSingleAnswer};
