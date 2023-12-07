const express = require("express")

const app = express()

const path = require("path")

const ejs = require("ejs")

//Template Engine
app.set("view engine","ejs")


// const myLogger = (req , res , next) => {
//     console.log("LOG 1")
//     next() //Bu işlem yapılmazsa sürekli istek atar ama dönüş bir türlü bitmez
// }
//app.use(myLogger)


//Middlewares
app.use(express.static('public'))


//Routes
app.get("/",(req,res) => {
    //Bu işlem bir syafanın ekranda gösterilmesi işlemini yapmaktadır.
    //res.sendFile(path.resolve(__dirname,"temp/index.html"))

    //Buradaki render eden ejs eklentisi öncelikle "views" klasörüne bakar ve oradaki dosyaları çalıştırır.
    //Bu işlem yukarıdaki ile aynı tek fark olarak ejs formatındaki verileri göstermemizi sağlar
    res.render("index")

})

app.get("/about",(req,res) => {
    res.render("about")
})

app.get("/add",(req,res) => {
    res.render("add")
})

const port = 3000

app.listen(port, () => {
    console.log(`Server ${port} portunda çalışmaktadır.`)
})