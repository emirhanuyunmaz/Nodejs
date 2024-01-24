//Create middleware
module.exports = (req,res,next) => {
    
    if(req.session.userID != undefined){
        res.redirect("/")
    }
    next()
}