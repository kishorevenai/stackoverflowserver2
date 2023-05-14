const express = require('express')
const router = express.Router()
const postAnswerController = require('../controllers/PostAnswersController')
const auth = require('../middlewares/auth')


router.patch('/post/:id',auth,postAnswerController.postAnswerController);
router.patch('/delete/:id',auth,postAnswerController.deleteAnswerController);
router.patch('/deleteAnswer/:id',auth,postAnswerController.deleteSingleAnswer)

module.exports = router