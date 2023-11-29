const express = require("express")
const res = require("express/lib/response")
const mysql = require("mysql2")


const exphbs = require("express-handlebars")

const app = express()


app.engine('handlebars',exphbs.engine())
app.set('view engine','handlebars')

app.use(express.static('public'))

app.use(express.urlencoded({
    extended:true
}))

app.use(express.json())

//rotas
app.post('/criar', (requesicao, resposta) =>{
    const descricao =requesicao.body.descricao
    const completa = 0
    const sql =`
            INSERT INTO tarefas(descricao, completa)
            VALUE ('${descricao}','${completa}' )
            `
        conexao.query(sql,(erro)=>{
            if (erro){
                return console.log(erro)
            }

            resposta.redirect('/')
        })
    })

app.get('/',(requesicao,resposta)=>{

    const sql = 'SELECT * FROM todo_app.tarefas;'

    conexao.query(sql, (erro, dados) =>{
        if(erro){
            console.log(erro)
        }
        console.log(dados)

        const tarefas = dados.map((dado) =>{
            return{
                id: dado.id,
                descricao: dado.descricao,
                completa: dado.completa === 0 ? false : true
            }
            


        })
        
        resposta.render('home',{ tarefas })    

    })
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