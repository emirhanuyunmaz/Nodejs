//Burada işlemleri yapmak için uygulamaya ekleme işlemini yapıyoruz.
const express = require("express")

const app = express()
//Port belirleme işlemi
const port = 3000

//Sayfanın url bilgisine göre ne gibi işlemlerin yapılacağını belirler.
app.get("/",(req,res) =>{
    res.send("HELLO")
})

app.get("/about",(req,res) =>{
    res.send("HELLO ABOUT")
})

//Belirlenen portu dinleme işlemi...
app.listen( port , () => {
    console.log(`Port : ${port} server çalışıyor.`)
})