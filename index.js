const express = require("express")
const res = require("express/lib/response")

const app = express()

app.get('/',(requesicao,resposta)=>{
    resposta.send("Olá mundo!")
})

app.listen(3000,() =>{
    console.log("servido rodando na porta 3000")
})