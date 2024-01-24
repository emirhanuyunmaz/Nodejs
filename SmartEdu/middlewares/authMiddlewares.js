const User = require("../models/User")
//Create middleware
module.exports = (req,res,next) => {
    try{
        //Kullanıcı eğer yoksa login ekranına gönderme işlemi yapılacaktır.
        //Kullanıcı varsa login ekranı gelmeyecektir.
        const user = User.find({_id : req.session.userID})
        if (!user){
            res.redirect("/login")
        }
    }catch (e) {
        res.redirect("/login")
    }
    next()

}