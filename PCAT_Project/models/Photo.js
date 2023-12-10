const mongoose = require("mongoose")
const Schema = mongoose.Schema


//create schema
const PhotosSchema = new Schema({
    title :String,
    description : String,
    image : String,
    dateCreated : {
        type : Date,
        default : Date.now
    }
})


//Create Model
const Photo = mongoose.model("Photo" , PhotosSchema) 

module.exports = Photo