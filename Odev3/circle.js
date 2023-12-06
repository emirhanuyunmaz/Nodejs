

//Daire alanı hesaplama 2*pi*r*r
function circleArea(r){
    let area=2*Math.PI*r*r
    console.log(`Dairenin yarıçapı :${r} Alanı :${area}`)
}

//Dairenin çevresi 2*pi*r
function circleCircumference (r){
    let circumference=2*Math.PI*r
    console.log(`Dairenin yarıçapı : ${r} Çevresi : ${circumference}`)
}

//Burada circle.js içerisindeki değerleri dış dünyaya aktarma işlemi yapılmaktadır.
module.exports = {
    circleCircumference,
    circleArea
}

