const {circleCircumference,circleArea} = require('./circle') //Burada circle.js dosyasındaki fonk. index.js dosyasına ekleme işlemi yapılmaktadır.

const radius=process.argv
let r=Number(process.argv[2])//Parametre olarak verilen değerlerini içerisinde yarıçap değerini alma işlemi, yapılmaktadır.
circleArea(r)
circleCircumference(r)
