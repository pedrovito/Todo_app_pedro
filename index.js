const express = require("express")
const res = require("express/lib/response")
const mysql = require("mysql2")


const exphbs = require("express-handlebars")

const app = express()
app.use

app.engine('handlebars',exphbs.engine())
app.set('view engine','handlebars')

app.use(express.static('public'))

app.get('/',(requesicao,resposta)=>{
    resposta.render('home')
})

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"root",
    database:"todo_app",
    port:3306
})

conexao.connect((erro)=>{
    if (erro){
        return console.log(erro)
    }

    console.log("estou no mysql")
    
    app.listen(3000,() =>{
        console.log("servido rodando na porta 3000")
    })  
})