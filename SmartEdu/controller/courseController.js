const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
//Kurs ekleme işlemi...
exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create({
            name : req.body.name,
            description : req.body.description,
            category : req.body.category,
            user : req.session.userID,
        })
        console.log(req.body)
        res.status(201).redirect("/courses")
    }catch(e) {
        res.status(400).json({
            status : "fail",
            e
        })
    }
}

//Tüm kursların alınması işlemi
exports.getAllCourses = async (req, res) => {
    try {
        const categorySlug = req.query.categories;

        //Eğer kategori varsa onun filtrelenmesi ve listelenmesi işlemi...
        const category =await Category.findOne({slug : categorySlug})

        //Arama çubuğunda arama yapıldıktan sonra alınan veri .
        const search = req.query.search
        

        let filter = {}
        
        //Eğer url'de kategori değişkeni varsa filtre alınması. 
        if(categorySlug){
            filter = {category : category._id}
        }

        if(search){
            filter = {name : search}
        }

        //Eğer hiç bir filtreleme işlemi yoksa.
        if(!search && !categorySlug){
            filter.name = ""
            filter.category = null
        }
        
        //Filtrenin uygulanması işlemi.
        const courses = await Course.find({
            $or : [
                //Burada regex ile baş ve sonnundaki değerlerin bir önemi yok yazılan ifade eğer isimler içirisinde varsa ekleme işlemi yapar.(".*"-ifade-".*")
                {name : {$regex : ".*" + filter.name + ".*" , $options : "i"}},
                {category : filter.category}
            
            ]
        }).sort("-createdAt").populate("user")//Sort işleminde başına "-" koyularak tersten sıralama yapılır.  
        const categories = await Category.find()

        //Kurs sayfasının render edilmesi ve sayfaya kurs ve sayfa bilgisinin cerilmesi işlemi.
        res.status(200).render("courses",{
            courses,
            categories,
            page_name : "courses",
        })
    }catch(e) {
        res.status(400).json({
            status : "fail",
            e
        })
    }
}

//Tek bir kursun çekilmesi işlemi.
exports.getCourse = async (req, res) => {
    try {
        //Tıklanan kursun filtreleme işelminin yapılması işlemi.
        const course = await Course.findOne({slug : req.params.slug})
        const categories = await Category.find()
        const user = await User.findOne({_id : req.session.userID})//Kursun eğitmenini alma işlemi.
        //Sayfanın render edilmesi işlemi.
        res.status(200).render("course-single",{
            course,
            categories,
            page_name : "course",
            user
        })
    }catch(e) {
        res.status(400).json({
            status : "fail",
            e
        })
    }
}

exports.enrollCourse = async (req, res) => {
    try {
        
        const user = await User.findOne({_id : req.session.userID})
        await user.courses.push({ _id: req.body.course_id })
        await user.save()
        res.status(200).redirect("/users/dashboard")
    }catch(e) {
        res.status(400).json({
            status : "fail",
            e
        })
    }
}

exports.releaseCourse = async (req, res) => {
    try {
        
        const user = await User.findOne({_id : req.session.userID})
        await user.courses.pull({ _id: req.body.course_id })
        await user.save()
        res.status(200).redirect("/users/dashboard")
    }catch(e) {
        res.status(400).json({
            status : "fail",
            e
        })
    }
}