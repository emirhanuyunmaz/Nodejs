const express = require("express") //Web sunucusuna gelen istekleri yönetmek için yapılan işlemlerdir.
const mongoose = require("mongoose") //Veritabanı işlemi için
const session = require('express-session') // Oturum bilgisinin tutulması için.
const MongoStore = require('connect-mongo') //Giriş yapan kullanıcının kullanıcı bilgilerinin kaydedilmesi işlemi.
const bodyParser = require('body-parser')//Kullanıcıdan gelen bilgileri json formatında almamıza olanak sağlar.
const app = express()
const pageRouters = require("./routes/pageRoutes") //Sayfaların yönlendirilmesi işlemi
const courseRoute = require("./routes/courseRoute") //Kursların yönlendirilmesi işlemi
const categoryRoute = require("./routes/categoryRoutes") //Kategörilerin yönlendirilmesi işlemi.
const usersRoute = require("./routes/userRoutes") // Kullanıcıların yönlendirilmesi işlemi.
const port = 3000//Port belirleme işlemi 

//Connect DB
mongoose.connect("mongodb://127.0.0.1:27017/smartedu-db",{}).then(() => {
    console.log("DB connected")
})

//Global Variable (Global Değişkenin Tanımlanması işlemi.) Her yerden erişilmesi için.
global.userIN = null


//Template Engine 
//Bu işlem sayesinde .html uzantılı dosyaları "ejs" olarak da tanımlanması işlemi.
app.set("view engine","ejs")

//Middlewares => Req - Res arasında yapılması gereken işlemleri yapar.
app.use(express.static("public"))
app.use(bodyParser.json()) // Bu işlem sayesinde veriler json formatında gelir.
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/smartedu-db' })//DB kullanıcı oturumlarının kaydedilemesi işlemi.(Bu işlem sayesinde sunucu durdurulup çalıştırılsa bile tekrar kaldığı yerden devam eder.)
  }))

//Routes (Sayfaların yönlerndirilmesi işlemi.)
//Herhangi bir arama işleminde de çalışması için.
app.use("*",(req,res,next) => {
    userIN = req.session.userID
    next()
})
app.use("/",pageRouters)
app.use("/courses",courseRoute)
app.use("/categories",categoryRoute)
app.use("/users",usersRoute)

//Belirlenen port dinlenmesi işlemi.
app.listen(port, ()=> {
    console.log(`App started on port : ${port}`)
})