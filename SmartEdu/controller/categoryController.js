const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
    try {
        //Sayfadan gelen bilgilerin alınması.Kayıt işleminin yapılması.
        const category = await Category.create(req.body)

        res.status(201).json({
            status : "succes",
            category
        })
    }catch(e) {
        res.status(400).json({
            status : "fail",
            e
        })
    }
}