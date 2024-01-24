module.exports = (roles) => {
    //Bu işlem sayesinde gelen "role" bilgisine göre eğer yetkisi varsa kurs ekleyebilir. 
    return (req,res,next) => {
        const userRole = req.body.role
        console.log(userRole)
        if(roles.includes(userRole)){
            next()
        }else {
            return res.status(401).send("YOU CANT DO IT")
        }
    }
}