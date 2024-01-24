const mongoose = require("mongoose")

const Schema = mongoose.Schema

const slugfy = require("slugify")//Slugfy ile yazıların birleştirilip arama çubuğunda ve id olarak kullanılması için kullanılan kütüphane. 

//Kurs Schema oluşturulması işlemi.
const CourseSchema = new Schema({
    name : {
        type : String,
        unique : true,
        required : true 
    },

    description : {
        type : String,
        required : true,
        trim : true 
    },

    createdAt : {
        type : Date,
        default : Date.now
    },

    slug : {
        type : String,
        unique : true 
    },

    category : {
        type : mongoose.Schema.Types.ObjectId,//Burada mongoose de başka bir tabloya refereans olarak gösterilme işlemi yapılmaktadır.
        ref : "Category" //Referans gösterilen tablo
    },

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }

})

//Middleware
//Burada yapılan işlem sayesinde slug ifadesinin arama çubuğuna yazma işlemi yapılacaktır(DB ekleme işleminden önce)
CourseSchema.pre("validate",function (next) {
    this.slug = slugfy(this.name,{
        lower: true,
        strict : true 
    }) 
    next()
})

//Kurs veritabanının oluşturulması işlemi.
const Course = mongoose.model("Course", CourseSchema)
module.exports = Course