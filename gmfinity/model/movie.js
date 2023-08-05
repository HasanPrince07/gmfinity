const mongoose=require('mongoose')

const movieSchema=mongoose.Schema({
    mname:String,
})

module.exports=mongoose.model('movie',movieSchema)