const express = require("express")
const res = require("express/lib/response")

const exphbs = require("express-handlebars")

const app = express()

app.engine('handlebars',exphbs.engine())
app.set('view engine','handlebars')


app.get('/',(requesicao,resposta)=>{
    resposta.render('home')
})

app.listen(3000,() =>{
    console.log("servido rodando na porta 3000")
})