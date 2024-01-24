const mongoose = require("mongoose")

const Schema = mongoose.Schema

const slugfy = require("slugify")

//Kategori Schema parametrelerinin oluşturulması işlemi. 
const CategorySchema = new Schema({
    name : {
        type : String,
        unique : true,//Benzersiz bir değer alması işlemi.
        required : true,//Girilmesi zorunşu olan alan . 
    },

    slug : {
        type : String,
        unique : true 
    }

})
//Slugfy ile verilen parametrenin yazılarını küçültülmesi ve birleştirilmesi işlemi .
CategorySchema.pre("validate",function (next) {
    this.slug = slugfy(this.name,{
        lower: true,//Tüm harfleri küçültme işlemi.
        strict : true 
    }) 
    next()//Bir sonraki middleware geçme işlemi.
})
//Kategori veritabanı oluşturulma işlemi.
const Category = mongoose.model("Category", CategorySchema)
module.exports = Category