const express = require('express')
const router = express.Router();
const AskQuestions = require('../controllers/AskQuestionsControllers')
const deleteAnswers = require('../controllers/PostAnswersController')
const {updateVotes} = require('../controllers/AskQuestionsControllers')
const auth = require('../middlewares/auth')


router.post('/Ask',auth,AskQuestions.AskQuestions)
router.get('/get',AskQuestions.getAllQuestions)
router.delete('/:id',auth,deleteAnswers.deleteAnswerController)
router.patch('/vote/:id',auth,updateVotes)


module.exports = router