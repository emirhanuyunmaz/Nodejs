const http = require("http")

//Server oluşturma
const server= http.createServer((req,res) => {
    //Gönderilen url bilgileri (root tan sonra)
    const url = req.url

    //Belirlenen isimde gelen istek bilgisine göre gönderilen değerler ve yapılacak işlemler. 
    if (url === "/"){
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>Index Sayfasina hosgeldiniz<h1/>")
    }
    else if(url === "/about"){
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>Hakkimda Sayfasina hosgeldiniz<h1/>")
    }else if(url === "/contact"){
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>Iletisim Sayfasina hosgeldiniz<h1/>")
    }
    else{
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write("<h1>404 HATA<h1/>")
    }

    console.log("Bir istek gönderildi.")
    res.end()//Res işlemini sonlanırarak yğklenme işlemini durdurur.
})

//Burada hangi portun dinleneceği belirlenir.
const port = 5000

//Port dinleme işlemi
server.listen(port ,() => {
    console.log(`Server port ${port} çalıştırılıyor`)
})
