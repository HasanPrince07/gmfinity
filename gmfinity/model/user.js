const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    username:String,
    password:String,
    fname:String,
    lname:String,
    mnumber:Number,
})

module.exports=mongoose.model('user',userSchema)