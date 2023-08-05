const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: false }))
const userRouter = require('./router/user')
const session = require('express-session')
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/gmfinitydb')


app.use(session({
    secret: 'gmfinitykey',
    saveUninitialized: false,
    resave: false
}))
app.use(userRouter)
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.listen(5000,()=>{console.log('server is running on port 5000')})