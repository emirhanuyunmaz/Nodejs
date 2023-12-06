let girilenYaricap=Number(process.argv[2])


function daireAlanHesapla (yaricap){
    let alan=2*Math.PI*(yaricap*yaricap)
    
    console.log(` Yarıçapı ${yaricap} olan dairenin alanı: ${alan}`)
}

daireAlanHesapla(girilenYaricap)