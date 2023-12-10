const mongoose = require("mongoose")
const Schema = mongoose.Schema

//Connect DB
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db')

//create schema
const PhotosSchema = new Schema({
    title :String,
    description : String
})

//Create Model
const Photo = mongoose.model("Photo" , PhotosSchema) 

//Create a photo
// Photo.create({
//     title : "Photo 2",
//     description : "Photo Description 2 "
// })

//read a photo
async function getData(){
    const photos = await Photo.find({_id : "65747e6419803bdc925d62a8"})
    photos.forEach((photo) => {
        console.log(photo._id)
        console.log(photo.title)
        console.log(photo.description)
    })
}
getData()

//Update Data
 const id = "657441cfe417671dab5809c1"
// async function updateData(){
//     await Photo.findOneAndUpdate(
//         {
//             _id : id
//         },
//         {
//             title:"Photo 1 title update 111",
//             description : "Photo Description 1 update 111"
//         },
//         {
//             new : true
//         },
//     )
// }
// updateData()

//Delete data
async function deleteData(id){
    await Photo.findOneAndDelete({_id:id})
}
deleteData(id)

