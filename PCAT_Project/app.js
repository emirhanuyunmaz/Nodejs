const express = require("express")
const path = require("path")
const app = express()

const myLogger = (req , res , next) => {
    console.log("LOG 1")
    next() //Bu işlem yapılmazsa sürekli istek atar ama dönüş bir türlü bitmez
}

app.use(myLogger)
//Middlewares
app.use(express.static('public'))

app.get("/",(req,res) => {
    //Bu işlem bir syafanın ekranda gösterilmesi işlemini yapmaktadır.
    res.sendFile(path.resolve(__dirname,"temp/index.html"))
})

const port = 3000

app.listen(port, () => {
    console.log(`Server ${port} portunda çalışmaktadır.`)
})