//Uygulamaya dahil etme süreci.
const Kao = require("koa")

const app = new Kao()

const port =3000

//Response 
//Body içerisine yazılacak bilgi.
app.use(ctx => {
    ctx.body = "HELLO kao"
})

//Port dinleme işlemi .
app.listen(port , () => {
    console.log(`Port : ${port} server active `)
})