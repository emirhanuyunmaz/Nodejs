const nodemailer = require("nodemailer");

//Sayfaların render etme işlemi...
exports.getAboutPage = (req,res) => {
    res.status(200).render("about",{
        page_name : "about"
    })
}

exports.getIndexPage = (req,res) => {
    res.status(200).render("index",{
        page_name : "index"
    })
}

exports.getRegisterPage = (req,res) => {
    res.status(200).render("register",{
        page_name : "register"
    })
}

exports.getLoginPage = (req,res) => {
    res.status(200).render("login",{
        page_name : "login"
    })
}

exports.getContactPage = (req,res) => {
    res.status(200).render("contact",{
        page_name : "contact"
    })
}

exports.postMessage = (req,res,next) => {
    console.log(req.body)
    const succes = null 
   

    res.status(200).redirect("/contact")

}
