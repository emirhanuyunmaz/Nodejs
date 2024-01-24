const bcrypt = require("bcrypt")//Parolanın şifrelenmesi işlemi.
const User = require("../models/User");
const Category = require("../models/Category");
const Course = require("../models/Course");


exports.createUser = async (req, res) => {
    try {
        //sayfadan gelen bilgilerin alınması.
        const user = await User.create(req.body)
        
        res.status(201).redirect("/login")
    }catch(e) {
        res.status(400).json({
            status : "fail",
            e
        })
    }
}

exports.loginUser = async (req, res) => {
    try {
        //Sayfadan gelen bilgilerin alınıp değişkenlere atanması.
        const {email,password} = req.body
        
        const user = await User.findOne({email : email})
        //Eğer bir kullanıcı bilgisi varsa yapılacak işlemler.    
        if (user) {
                //Parolaların şifrelenmesi işlemi.
                bcrypt.compare(password,user.password, (err,same) => {
                    if(same){
                        //User Session
                        req.session.userID = user._id //Giriş yapan kullanıcının id sinin eşitlenmesi işlemi.
                        res.status(200).redirect("/users/dashboard")
                    }
                })
            }else{
                res.status(400).send("kullanici yok"); 
            }
        
        
    }catch(e) {
        res.status(400).json({
            status : "fail",
            e
        })
    }
}

//Kullanıcı çıkışı yapma işlemi.
exports.logoutUser = async (req,res) => {
    req.session.destroy( () => {
        res.redirect("/")
    })
}

//Kullanıcı kişisel sayfasının gösterilmesi işlemi.
exports.getDashboardPage = async (req,res) => {
    //Burada populate işlemi il referans verilen tablolar arasında bağlantı yapılmasına olanak sağlar.
    const user = await User.findOne({_id : req.session.userID}).populate("courses")
    const courses = await Course.find({user : req.session.userID})
    const categories = await Category.find()
    res.status(200).render("dashboard",{
        page_name : "dashboard",
        user,
        categories,
        courses,
    })
}

