const mongoose = require("mongoose")
const bcrypt = require("bcrypt")//Parolanın şifrelenmesi işlemi.
const Schema = mongoose.Schema

//Bir kullanıcı Schema oluşturma işlemi.
const UserSchema = new Schema({
    name : {
        type : String,
        required : true 
    },

    email : {
        type : String,
        required : true,
        unique : true 
    },

    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        enum : ["Student" , "Teacher" , "Admin"],//Rollerin alabiileceği değerler.
        default : "student"
    },
    courses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course"
    }]


})

//Middleware ile kullanıcı parolası şifrelenmesi işlemi.
UserSchema.pre("save",function ( next ) {
    const user =this;
    bcrypt.hash(user.password , 10 , (error , hash) => {
        user.password = hash
        next()
    } )
})
//Kullanıcı veritabanı oluşturma işlemi.
const User = mongoose.model("User", UserSchema)
module.exports = User