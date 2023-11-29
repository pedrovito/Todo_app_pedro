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

app.post('/completar', (requisicao, resposta) =>{
        const id = requisicao.body.id
        
        console.log(id)

        const sql= `
                update tarefas 
                set completa ='1'
                where id =${id}
            `

        conexao.query(sql ,(erro) => {
            if (erro){
                return console.log(erro)
            }

            resposta.redirect('/')

        })
    })

app.post('/descompletar', (requisicao, resposta)=>{
        const id = requisicao.body.id

        console.log(id)

        const sql =`
            UPDATE tarefas
            SET completa ='0'
            WHERE id = ${id}
        `

        conexao.query(sql ,(erro) => {
            if (erro){
                return console.log(erro)
            }

            resposta.redirect('/')

        })
})

app.post('/criar', (requisicao, resposta) =>{
    const descricao =requisicao.body.descricao
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

app.get('/',(requisicao,resposta)=>{

    const sql = 'SELECT * FROM todo_app.tarefas;'

    conexao.query(sql, (erro, dados) =>{
        if(erro){
            console.log(erro)
        }
        

        const tarefas = dados.map((dado) =>{
            return{
                id: dado.id,
                descricao: dado.descricao,
                completa: dado.completa === 0 ? false : true
            }
            


        })
        
        const tarefasAtivas = tarefas.filter((tarefa) =>{
            return tarefa.completa === false && tarefa
        })

        const quantidadeTarefasAtivas = tarefasAtivas.length

         

        resposta.render('home', {tarefas, quantidadeTarefasAtivas})
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