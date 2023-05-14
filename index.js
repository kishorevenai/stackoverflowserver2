require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = process.env.PORT || 5000
const connectDB = require('./config/dbConn')
const corsOption = require('./config/corsOptions')


connectDB()
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(express.json({limit:"30mb",extended:true}))
app.use(cors(corsOption));

app.get('/',(req,res) => {
    res.send("This is a stack overflow clone API")
})
app.use('/user',require('./routes/users'))
app.use('/questions',require('./routes/Questions'))
app.use('/answers',require('./routes/answers'))
app.use('/delete',require('./routes/Questions'))
app.use('/votes',require('./routes/Questions'))

mongoose.connection.once('open',() => {
    console.log('connected to DATABASE')
    app.listen(PORT , () => {
        console.log(`server running on the port ${PORT}`) 
    })
})






