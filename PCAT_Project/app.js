const express = require('express');

const app = express();

const path = require('path');

const ejs = require('ejs');

const mongoose = require('mongoose');

const fileUpload = require('express-fileupload');

const methodOverride = require('method-override');

const photoControllers = require('./controllers/photoControllers')

const pageControllers = require('./controllers/pageControllers')

mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');

//Template Engine
app.set('view engine', 'ejs');

// const myLogger = (req , res , next) => {
//     console.log("LOG 1")
//     next() //Bu işlem yapılmazsa sürekli istek atar ama dönüş bir türlü bitmez
// }
//app.use(myLogger)

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); //Bu işlem url deki datayı okumamızı sağlar.
app.use(express.json()); //Buradaki işlem url deki data yı json formatına çevirir.
app.use(fileUpload()); //Resmi yükleme işlemi için gerekli
app.use(methodOverride("_method",{
    methods :["POST","GET"]
}))//Post ve GET işlemlerini yakalayıp put ve delete işlemi yapma işlemi 


//Routes
app.get('/', photoControllers.getAllPhoto);
app.get('/photos/edit/:id', photoControllers.editPhoto);
app.get('/photos/:id',photoControllers.getPhoto);
app.put('/photos/:id',photoControllers.updatePhoto);
app.delete('/photos/:id',photoControllers.deletePhoto);
app.post('/photos', photoControllers.addPhoto);
app.get('/add',pageControllers.pagesAdd);


app.get('/about', pageControllers.pagesAbout);



const port = 3000;

app.listen(port, () => {
  console.log(`Server ${port} portunda çalışmaktadır.`);
});
