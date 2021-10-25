const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "EduCando",
});

app.use(cors());
app.use(express.json());

app.listen(3001, ()=> {
    console.log("Server Up")
});


app.get('/', (req, res) => {
    let sql = "select * from cliente"

    db.query(sql, (err, result) =>{
        console.log(err);
        console.log(result);
    });
});

//#region  Crianças

app.post('/registrarCrianca', (req, res)=>{
    const { nome_Crianca } = req.body;
    const { dataNasc_crianca } = req.body;
    const { email_Crianca } = req.body;
    const { senha_Crianca } = req.body;

    let sql = "INSERT INTO crianca ( nome_Crianca, dataNasc_crianca, email_Crianca, senha_Crianca) VALUES (?, ?, ?, ?)"


    db.query(sql, [nome_Crianca, dataNasc_crianca, email_Crianca, senha_Crianca], (err, result) =>{
        console.log('Erro: ' + err + "/nResultado:" + result);
        return('Erro: ' + err + "/nResultado:" + result)
    })
    console.log(nome_Res);
});

app.get('/getCriancaById', (req, res)=>{
    const { FK_CodCrianca } = req.body;

    let sql = "select * from crianca where CodCrianca = ?"


    db.query(sql, [FK_CodCrianca], (err, result) =>{
        console.log('Erro: ' + err + "/nResultado:" + result);
        if(err) res.send(err)
        else res.send(result)
    })
    //console.log(nome_Res);
    
});

//#endregion

//#region  Responsaveis

app.post('/registrarAdulto', (req, res)=>{
    const { nome_Res } = req.body;
    const { email_Res } = req.body;
    const { senha_Res } = req.body;
    const { FK_CodCrianca } = req.body;

    let sql = "INSERT INTO responsavel ( nome_Res, email_Res, senha_Res, FK_CodCrianca) VALUES (?, ?, ?, ?)"


    db.query(sql, [nome_Res, email_Res, senha_Res, FK_CodCrianca], (err, result) =>{
        console.log('Erro: ' + err + "/nResultado:" + result);
        res.send(result);
    })
    console.log(nome_Res);
});


//#endregion

